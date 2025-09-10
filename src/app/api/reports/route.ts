import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { getDecodedToken, generateSlug } from "@/lib/server/utils";

export async function POST(req: NextRequest) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const adminId = tokenData.id;
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (!title || !adminId || !pdfFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let image_path: string | null = null;
    const MAX_SIZE = 300 * 1024; // 300 KB

    // Handle image upload if provided
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

      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/reports/images/${fileName}`;
    }

    // Handle PDF upload (required)
    let pdf_path: string;
    {
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

      await fs.writeFile(filePath, buffer);
      pdf_path = `/api/pdfs/reports/pdfs/${fileName}`;
    }

    // Generate a unique slug
    let slug: string;
    let isUnique = false;
    do {
      slug = generateSlug(title || "untitled");
      const existing = await prisma.report.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    } while (!isUnique);

    const report = await prisma.report.create({
      data: {
        title,
        admin_id: adminId,
        image_path,
        pdf_path,
        slug,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
