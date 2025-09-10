import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// DELETE /api/reports/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reportId = parseInt(id, 10);

    if (isNaN(reportId)) {
      return NextResponse.json({ message: "Invalid report ID" }, { status: 400 });
    }

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }

    // Delete image if exists
    if (report.image_path) {
      const imageRelativePath = report.image_path.replace("/api/images/", "");
      const imageFilePath = path.join(process.cwd(), "..", "uploads", imageRelativePath);
      await fs.unlink(imageFilePath).catch(() => {});
    }

    // Delete PDF if exists
    if (report.pdf_path) {
      const pdfRelativePath = report.pdf_path.replace("/api/pdfs/", "");
      const pdfFilePath = path.join(process.cwd(), "..", "uploads", pdfRelativePath);
      await fs.unlink(pdfFilePath).catch(() => {});
    }

    await prisma.report.delete({ where: { id: reportId } });

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json({ message: "Failed to delete report" }, { status: 500 });
  }
}

// PUT /api/reports/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    let pdf_path: string = existingReport.pdf_path;

    const MAX_SIZE = 300 * 1024; // 300 KB

    // Handle image replacement
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      let bufferToSave: Buffer;

      if (buffer.length > MAX_SIZE) {
        let optimizedBuffer = await sharp(buffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();

        let quality = 75;
        while (optimizedBuffer.length > MAX_SIZE && quality > 10) {
          optimizedBuffer = await sharp(buffer)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();
          quality -= 5;
        }

        bufferToSave = optimizedBuffer;
      } else {
        bufferToSave = await sharp(buffer).webp().toBuffer();
      }

      const reportsDir = path.join(process.cwd(), "..", "uploads/reports/images");
      await fs.mkdir(reportsDir, { recursive: true });

      const baseName = imageFile.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "")
        .replace(/\.[^/.]+$/, "");

      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.webp`;
      let filePath = path.join(reportsDir, fileName);

      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.webp`;
        filePath = path.join(reportsDir, fileName);
        counter++;
      }

      // Delete old image if exists
      if (existingReport.image_path) {
        const imageRelativePath = existingReport.image_path.replace("/api/images/", "");
        const oldPath = path.join(process.cwd(), "..", "uploads", imageRelativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/reports/images/${fileName}`;
    }

    // Handle PDF replacement
    if (pdfFile) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      const pdfsDir = path.join(process.cwd(), "..", "uploads/reports/pdfs");
      await fs.mkdir(pdfsDir, { recursive: true });

      const baseName = pdfFile.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "")
        .replace(/\.[^/.]+$/, "");

      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.pdf`;
      let filePath = path.join(pdfsDir, fileName);

      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.pdf`;
        filePath = path.join(pdfsDir, fileName);
        counter++;
      }

      // Delete old PDF
      if (existingReport.pdf_path) {
        const pdfRelativePath = existingReport.pdf_path.replace("/api/pdfs/", "");
        const oldPath = path.join(process.cwd(), "..", "uploads", pdfRelativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      await fs.writeFile(filePath, buffer);
      pdf_path = `/api/pdfs/reports/pdfs/${fileName}`;
    }

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: {
        title: title ?? existingReport.title,
        image_path,
        pdf_path,
      },
    });

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
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
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
