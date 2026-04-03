import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";
import {getDecodedToken, logError} from "@/lib/server/utils";

// DELETE /api/reports/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const reportId = parseInt(id, 10);

    if (isNaN(reportId)) {
      return NextResponse.json({ message: "Invalid report ID" }, { status: 400 });
    }

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    // Delete image and PDF in parallel if they exist
    await Promise.all([
      report.image_id
        ? cloudinary.uploader.destroy(report.image_id).catch(logError)
        : null,
      report.pdf_id
        ? cloudinary.uploader.destroy(report.pdf_id, { resource_type: "raw" }).catch(logError)
        : null,
    ]);

    await prisma.report.delete({ where: { id: reportId } });

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    logError(error);
    return NextResponse.json({ message: "Failed to delete report" }, { status: 500 });
  }
}

// PUT /api/reports/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const reportId = parseInt(id, 10);

    if (isNaN(reportId)) {
      return NextResponse.json({ message: "Invalid report ID" }, { status: 400 });
    }

    const existingReport = await prisma.report.findUnique({ where: { id: reportId } });
    if (!existingReport) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    let image_path: string | null = existingReport.image_path;
    let image_id: string | null = existingReport.image_id;
    let pdf_path: string = existingReport.pdf_path;
    let pdf_id: string | null = existingReport.pdf_id;


    // Handle image replacement
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      if(image_id){
        await cloudinary.uploader.destroy(image_id).catch(logError);
      }

      // Upload new image to Cloudinary
      const uploadImageResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "reports/images",                // Cloudinary folder
            format: "webp",                 // force webp
            transformation: [
              { width: 1200, crop: "limit" }, // resize max width 1200px
              { quality: "auto" },            // auto quality
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        )
        stream.end(buffer);
      });
      image_path = uploadImageResult.secure_url; // Cloudinary URL
      image_id = uploadImageResult.public_id;   // Cloudinary public ID
    }

    // Handle PDF replacement
    if (pdfFile) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());

      //delete old pdf if exists
      if(pdf_id){
        await cloudinary.uploader.destroy(pdf_id, { resource_type: "raw" }).catch(logError);
      }

      const uploadPdfResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "reports/pdfs",
            resource_type: "raw",
            format: "pdf",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      });

      pdf_path = uploadPdfResult.secure_url;
      pdf_id = uploadPdfResult.public_id;
    }

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: {
        title: title ?? existingReport.title,
        image_path,
        image_id,
        pdf_path,
        pdf_id,
      },
    });

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    logError(error);
    return NextResponse.json({ message: "Failed to update report" }, { status: 500 });
  }
}

// GET /api/reports/:id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const report = await prisma.report.findUnique({
      where: { slug: id },
    });

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error("Error fetching report:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
