import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// DELETE /api/press-releases/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const pressReleaseId = parseInt(id, 10);

    if (isNaN(pressReleaseId)) {
      return NextResponse.json({ message: "Invalid press release ID" }, { status: 400 });
    }

    // find the press release first
    const pressRelease = await prisma.press_release.findUnique({
      where: { id: pressReleaseId },
    });

    if (!pressRelease) {
      return NextResponse.json({ message: "Press release not found" }, { status: 404 });
    }

    // if image exists, delete it
    if (pressRelease.image_path) {
      const relativePath = pressRelease.image_path.replace("/api/images/", "");
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

    // delete press release from db
    await prisma.press_release.delete({
      where: { id: pressReleaseId },
    });

    return NextResponse.json({ message: "Press release deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting press release:", error);
    return NextResponse.json(
      { message: "Failed to delete press release" },
      { status: 500 }
    );
  }
}



// PUT /api/press-releases/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const pressReleaseId = parseInt(id, 10);
    
    if (isNaN(pressReleaseId)) {
      return NextResponse.json({ message: "Invalid press release ID" }, { status: 400 });
    }

    const existingPressRelease = await prisma.press_release.findUnique({
      where: { id: pressReleaseId },
    });
    if (!existingPressRelease) {
      return NextResponse.json({ message: "Press release not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageFile = formData.get("image") as File | null;

    let image_path: string | null = existingPressRelease.image_path;
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

      const pressReleasesDir = path.join(process.cwd(), "..", "uploads/press-releases");
      await fs.mkdir(pressReleasesDir, { recursive: true });

      // Sanitize filename
      const baseName = imageFile.name
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^a-z0-9.-]/g, "") // remove non-alphanumeric except . and -
        .replace(/\.[^/.]+$/, ""); // remove original extension

      // Prefix timestamp for uniqueness and add .webp
      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.webp`;
      let filePath = path.join(pressReleasesDir, fileName);

      // Ensure uniqueness if file exists
      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.webp`;
        filePath = path.join(pressReleasesDir, fileName);
        counter++;
      }

      // Delete old image if it exists
      if (existingPressRelease.image_path) {
        const relativePath = existingPressRelease.image_path.replace("/api/images/", "");
        const oldPath = path.join(process.cwd(), "..", "uploads", relativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      // Save new image
      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/press-releases/${fileName}`;
    }

    const updatedPressRelease = await prisma.press_release.update({
      where: { id: pressReleaseId },
      data: {
        title: title ?? existingPressRelease.title,
        content: content ?? existingPressRelease.content,
        image_path,
      },
    });

    return NextResponse.json(updatedPressRelease, { status: 200 });
  } catch (error) {
    console.error("Error updating press release:", error);
    return NextResponse.json(
      { message: "Failed to update press release" },
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
    const pressRelease = await prisma.press_release.findUnique({
      where: { slug: id },
    });

    if (!pressRelease) {
      return NextResponse.json({ message: "Press release not found" }, { status: 404 });
    }

    return NextResponse.json(pressRelease, { status: 200 });
  } catch (error) {
    console.error("Error fetching press release:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

