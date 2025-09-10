import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// DELETE /api/blogs/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    // find the blog first
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // if image exists, delete it
    if (blog.image_path) {
      const relativePath = blog.image_path.replace("/api/images/", "");
      const filePath = path.join(process.cwd(), "uploads", relativePath);
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

    // delete blog from db
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}



// PUT /api/blogs/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const blogId = parseInt(id, 10);
    
    if (isNaN(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageFile = formData.get("image") as File | null;

    let image_path: string | null = existingBlog.image_path;
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

      const blogsDir = path.join(process.cwd(), "uploads/blogs");
      await fs.mkdir(blogsDir, { recursive: true });

      // Sanitize filename
      const baseName = imageFile.name
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^a-z0-9.-]/g, "") // remove non-alphanumeric except . and -
        .replace(/\.[^/.]+$/, ""); // remove original extension

      // Prefix timestamp for uniqueness and add .webp
      const timestamp = Date.now();
      let fileName = `${timestamp}-${baseName}.webp`;
      let filePath = path.join(blogsDir, fileName);

      // Ensure uniqueness if file exists
      let counter = 1;
      while (await fs.stat(filePath).catch(() => false)) {
        fileName = `${timestamp}-${baseName}-${counter}.webp`;
        filePath = path.join(blogsDir, fileName);
        counter++;
      }

      // Delete old image if it exists
      if (existingBlog.image_path) {
        const relativePath = existingBlog.image_path.replace("/api/images/", "");
        const oldPath = path.join(process.cwd(), "uploads", relativePath);
        await fs.unlink(oldPath).catch(() => {});
      }

      // Save new image
      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/blogs/${fileName}`;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: title ?? existingBlog.title,
        content: content ?? existingBlog.content,
        image_path,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const blog = await prisma.blog.findUnique({
      where: { slug: id },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}