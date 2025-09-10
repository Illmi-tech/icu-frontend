import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// DELETE /api/scholarships/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const scholarshipId = parseInt(id, 10);

    if (isNaN(scholarshipId)) {
      return NextResponse.json({ message: "Invalid scholarship ID" }, { status: 400 });
    }

    // find the scholarship first
    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });

    if (!scholarship) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 });
    }

    // if image exists, delete it
    if (scholarship.image_path) {
      const relativePath = scholarship.image_path.replace("/api/images/", "");
      const filePath = path.join(process.cwd(), "..", "uploads", relativePath);
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err: any) {
        if (err.code === "ENOENT") {
          console.warn(`File not found, skipping delete: ${filePath}`);
        } else {
          console.error("Error deleting file:", err);
        }
      }
    }

    // delete scholarship from db
    await prisma.scholarship.delete({
      where: { id: scholarshipId },
    });

    return NextResponse.json({ message: "Scholarship deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting scholarship:", error);
    return NextResponse.json(
      { message: "Failed to delete scholarship" },
      { status: 500 }
    );
  }
}



// PUT /api/scholarships/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const scholarshipId = parseInt(id, 10);
    
    if (isNaN(scholarshipId)) {
      return NextResponse.json({ message: "Invalid scholarship ID" }, { status: 400 });
    }

    const existingScholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });
    if (!existingScholarship) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageFile = formData.get("image") as File | null;

    let image_path: string | null = existingScholarship.image_path;
    const MAX_SIZE = 300 * 1024; // 300 KB

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      let bufferToSave: Buffer;

      // Compress and/or resize if too large
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
        // Convert small images to WebP without resizing
        bufferToSave = await sharp(buffer).webp().toBuffer();
      }

      const scholarshipsDir = path.join(process.cwd(), "..", "uploads/scholarships");
      await fs.mkdir(scholarshipsDir, { recursive: true });

      // Sanitize filename
      const baseName = imageFile.name
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^a-z0-9.-]/g, "") // remove non-alphanumeric except . and -
        .replace(/\.[^/.]+$/, ""); // remove original extension

      // Prefix timestamp for uniqueness and add .webp
      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.webp`;
      let filePath = path.join(scholarshipsDir, fileName);

      // Ensure uniqueness if file exists
      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.webp`;
        filePath = path.join(scholarshipsDir, fileName);
        counter++;
      }

      // Delete old image if it exists
      if (existingScholarship.image_path) {
        const relativePath = existingScholarship.image_path.replace("/api/images/", "");
        const oldPath = path.join(process.cwd(), "..", "uploads", relativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      // Save new image
      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/scholarships/${fileName}`;
    }

    const updatedScholarship = await prisma.scholarship.update({
      where: { id: scholarshipId },
      data: {
        title: title ?? existingScholarship.title,
        content: content ?? existingScholarship.content,
        image_path,
      },
    });

    return NextResponse.json(updatedScholarship, { status: 200 });
  } catch (error) {
    console.error("Error updating scholarship:", error);
    return NextResponse.json(
      { message: "Failed to update scholarship" },
      { status: 500 }
    );
  }
}



export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const scholarship = await prisma.scholarship.findUnique({
      where: { slug: id },
    });

    if (!scholarship) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 });
    }

    return NextResponse.json(scholarship, { status: 200 });
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

