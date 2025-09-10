import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// DELETE /api/volunteer-jobs/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const volunteerJobId = parseInt(id, 10);

    if (isNaN(volunteerJobId)) {
      return NextResponse.json({ message: "Invalid volunteer job ID" }, { status: 400 });
    }

    // find the volunteer job first
    const volunteerJob = await prisma.volunteer_Job.findUnique({
      where: { id: volunteerJobId },
    });

    if (!volunteerJob) {
      return NextResponse.json({ message: "volunteer job not found" }, { status: 404 });
    }

    // if image exists, delete it
    if (volunteerJob.image_path) {
      const relativePath = volunteerJob.image_path.replace("/api/images/", "");
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

    // delete volunteer job from db
    await prisma.volunteer_Job.delete({
      where: { id: volunteerJobId },
    });

    return NextResponse.json({ message: "volunteer job deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting volunteer job:", error);
    return NextResponse.json(
      { message: "Failed to delete volunteer job" },
      { status: 500 }
    );
  }
}



// PUT /api/volunteer-jobs/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const volunteerJobId = parseInt(id, 10);
    
    if (isNaN(volunteerJobId)) {
      return NextResponse.json({ message: "Invalid volunteer job ID" }, { status: 400 });
    }

    const existingVolunteerJob = await prisma.volunteer_Job.findUnique({
      where: { id: volunteerJobId },
    });
    if (!existingVolunteerJob) {
      return NextResponse.json({ message: "volunteer job not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageFile = formData.get("image") as File | null;

    let image_path: string | null = existingVolunteerJob.image_path;
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

      const volunteerJobsDir = path.join(process.cwd(), "..", "uploads/volunteer-jobs");
      await fs.mkdir(volunteerJobsDir, { recursive: true });

      // Sanitize filename
      const baseName = imageFile.name
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^a-z0-9.-]/g, "") // remove non-alphanumeric except . and -
        .replace(/\.[^/.]+$/, ""); // remove original extension

      // Prefix timestamp for uniqueness and add .webp
      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.webp`;
      let filePath = path.join(volunteerJobsDir, fileName);

      // Ensure uniqueness if file exists
      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.webp`;
        filePath = path.join(volunteerJobsDir, fileName);
        counter++;
      }

      // Delete old image if it exists
      if (existingVolunteerJob.image_path) {
        const relativePath = existingVolunteerJob.image_path.replace("/api/images/", "");
        const oldPath = path.join(process.cwd(), "..", "uploads", relativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      // Save new image
      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/volunteer-jobs/${fileName}`;
    }

    const updatedVolunteerJob = await prisma.volunteer_Job.update({
      where: { id: volunteerJobId },
      data: {
        title: title ?? existingVolunteerJob.title,
        content: content ?? existingVolunteerJob.content,
        image_path,
      },
    });

    return NextResponse.json(updatedVolunteerJob, { status: 200 });
  } catch (error) {
    console.error("Error updating volunteer job:", error);
    return NextResponse.json(
      { message: "Failed to update volunteer job" },
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
    const volunteerJob = await prisma.volunteer_Job.findUnique({
      where: { slug: id },
    });

    if (!volunteerJob) {
      return NextResponse.json({ message: "volunteer job not found" }, { status: 404 });
    }

    return NextResponse.json(volunteerJob, { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteer job:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

