import { NextResponse, NextRequest } from "next/server";
import {getDecodedToken, logError} from "@/lib/server/utils"; 
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";


// DELETE /api/blogs/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
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
    if (blog.image_id) {
      try {
        await cloudinary.uploader.destroy(blog.image_id);
        
      } catch (err) {
        logError(err);
      }
    }

    // Delete embedded images in blog content
    if (blog.content) {
      const imgUrls = Array.from<RegExpMatchArray>(
        blog.content.matchAll(/<img[^>]+src="([^">]+)"/g)
      ).map((m) => m[1]);

      for (const url of imgUrls) {
        try {
          // Convert URL to Cloudinary public_id
          const publicIdMatch = url.match(
            /\/upload\/(?:v\d+\/)?(.+?)\.(?:jpg|jpeg|png|webp)(?:\?.*)?$/
          );
          if (publicIdMatch?.[1]) {
            const publicId = publicIdMatch[1];
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          logError(err);
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
    logError(error);
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
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    let image_id: string | null = existingBlog.image_id;

    if (imageFile) {
      // 🔹 Delete old image from Cloudinary if it exists
      if (existingBlog.image_id) {
        try {
          await cloudinary.uploader.destroy(existingBlog.image_id);
        } catch (err) {
          logError(err);
        }
      }

      // 🔹 Upload new image to Cloudinary
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "blogs",
            format: "webp", // force webp format
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

      image_path = uploadResult.secure_url;
      image_id = uploadResult.public_id;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: title ?? existingBlog.title,
        content: content ?? existingBlog.content,
        image_path,
        image_id,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    logError(error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}


// GET /api/blogs/:id
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
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}