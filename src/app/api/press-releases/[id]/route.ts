import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import {getDecodedToken, logError} from "@/lib/server/utils";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";

// DELETE /api/press-releases/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
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
    if (pressRelease.image_id) {
      try {
        await cloudinary.uploader.destroy(pressRelease.image_id);
            
      } catch (err) {
          logError(err);
        }
    }

    // Delete embedded images in blog content
        if (pressRelease.content) {
          const imgUrls = Array.from<RegExpMatchArray>(
            pressRelease.content.matchAll(/<img[^>]+src="([^">]+)"/g)
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

    // delete press release from db
    await prisma.press_release.delete({
      where: { id: pressReleaseId },
    });

    return NextResponse.json({ message: "Press release deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting press release:", error);
    logError(error);
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
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    let image_id: string | null = existingPressRelease.image_id;

    if (imageFile) {
          // 🔹 Delete old image from Cloudinary if it exists
          if (existingPressRelease.image_id) {
            try {
              await cloudinary.uploader.destroy(existingPressRelease.image_id);
            } catch (err) {
              logError(err);
            }
          }
    
          // 🔹 Upload new image to Cloudinary
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "press-releases",
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

    const updatedPressRelease = await prisma.press_release.update({
      where: { id: pressReleaseId },
      data: {
        title: title ?? existingPressRelease.title,
        content: content ?? existingPressRelease.content,
        image_path,
        image_id,
      },
    });

    return NextResponse.json(updatedPressRelease, { status: 200 });
  } catch (error) {
    console.error("Error updating press release:", error);
    logError(error);
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
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

