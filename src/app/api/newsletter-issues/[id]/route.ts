import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { getDecodedToken, logError } from "@/lib/server/utils";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const issueId = parseInt(id, 10);

    if (isNaN(issueId)) {
      return NextResponse.json({ message: "Invalid newsletter issue ID" }, { status: 400 });
    }

    const issue = await prisma.newsletterIssue.findUnique({ where: { id: issueId } });
    if (!issue) {
      return NextResponse.json({ message: "Newsletter issue not found" }, { status: 404 });
    }

    await Promise.all([
      issue.image_id
        ? cloudinary.uploader.destroy(issue.image_id).catch(logError)
        : null,
      issue.pdf_id
        ? cloudinary.uploader.destroy(issue.pdf_id, { resource_type: "raw" }).catch(logError)
        : null,
    ]);

    await prisma.newsletterIssue.delete({ where: { id: issueId } });

    return NextResponse.json({ message: "Newsletter issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter issue:", error);
    logError(error);
    return NextResponse.json({ message: "Failed to delete newsletter issue" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const issueId = parseInt(id, 10);

    if (isNaN(issueId)) {
      return NextResponse.json({ message: "Invalid newsletter issue ID" }, { status: 400 });
    }

    const existing = await prisma.newsletterIssue.findUnique({ where: { id: issueId } });
    if (!existing) {
      return NextResponse.json({ message: "Newsletter issue not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    let image_path: string | null = existing.image_path;
    let image_id: string | null = existing.image_id;
    let pdf_path: string = existing.pdf_path;
    let pdf_id: string | null = existing.pdf_id;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      if (image_id) {
        await cloudinary.uploader.destroy(image_id).catch(logError);
      }

      const uploadImageResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "newsletter-issues/images",
            format: "webp",
            transformation: [
              { width: 1200, crop: "limit" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      });
      image_path = uploadImageResult.secure_url;
      image_id = uploadImageResult.public_id;
    }

    if (pdfFile) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());

      if (pdf_id) {
        await cloudinary.uploader.destroy(pdf_id, { resource_type: "raw" }).catch(logError);
      }

      const uploadPdfResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "newsletter-issues/pdfs",
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

    const updated = await prisma.newsletterIssue.update({
      where: { id: issueId },
      data: {
        title: title ?? existing.title,
        image_path,
        image_id,
        pdf_path,
        pdf_id,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating newsletter issue:", error);
    logError(error);
    return NextResponse.json({ message: "Failed to update newsletter issue" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const issue = await prisma.newsletterIssue.findUnique({
      where: { slug: id },
    });

    if (!issue) {
      return NextResponse.json({ message: "Newsletter issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error("Error fetching newsletter issue:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
