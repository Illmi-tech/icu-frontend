import { NextResponse, NextRequest } from "next/server";
import {getDecodedToken, logError} from "@/lib/server/utils";
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";

// DELETE /api/careers/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const {id} = await params;
    const careerId = parseInt(id, 10);

    if (isNaN(careerId)) {
      return NextResponse.json({ message: "Invalid career ID" }, { status: 400 });
    }

    // find the career first
    const career = await prisma.career.findUnique({
      where: { id: careerId },
    });

    if (!career) {
      return NextResponse.json({ message: "Career not found" }, { status: 404 });
    }

    // if image exists, delete it
    if (career.image_id) {
      try {
        await cloudinary.uploader.destroy(career.image_id);
        
      } catch (err) {
        logError(err);
      }
    }

    // Delete embedded images in blog content
    if (career.content) {
      const imgUrls = Array.from<RegExpMatchArray>(
        career.content.matchAll(/<img[^>]+src="([^">]+)"/g)
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

    // delete career from db
    await prisma.career.delete({
      where: { id: careerId },
    });

    return NextResponse.json({ message: "Career deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting career:", error);
    return NextResponse.json(
      { message: "Failed to delete career" },
      { status: 500 }
    );
  }
}



// PUT /api/careers/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const {id} = await params;
    const careerId = parseInt(id, 10);
    
    if (isNaN(careerId)) {
      return NextResponse.json({ message: "Invalid career ID" }, { status: 400 });
    }

    const existingCareer = await prisma.career.findUnique({
      where: { id: careerId },
    });
    if (!existingCareer) {
      return NextResponse.json({ message: "Career not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const imageFile = formData.get("image") as File | null;

    let image_path: string | null = existingCareer.image_path;
    let image_id: string | null = existingCareer.image_id;

    if (imageFile) {
      // 🔹 Delete old image from Cloudinary if it exists
      if (existingCareer.image_id) {
        try {
          await cloudinary.uploader.destroy(existingCareer.image_id);
            
        } catch (err) {
          console.error("Error deleting old Cloudinary image:", err);
        }
      }
    
      // 🔹 Upload new image to Cloudinary
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "careers",
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

    const updatedCareer = await prisma.career.update({
      where: { id: careerId },
      data: {
        title: title ?? existingCareer.title,
        content: content ?? existingCareer.content,
        image_path,
        image_id,
      },
    });

    return NextResponse.json(updatedCareer, { status: 200 });
  } catch (error) {
    console.error("Error updating career:", error);
    logError(error);
    return NextResponse.json(
      { message: "Failed to update career" },
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
    const career = await prisma.career.findUnique({
      where: { slug: id },
    });

    if (!career) {
      return NextResponse.json({ message: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error("Error fetching career:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

