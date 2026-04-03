import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import {getDecodedToken, logError} from "@/lib/server/utils"; 
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";

// DELETE /api/scholarships/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    if (scholarship.image_id) {
      try {
        await cloudinary.uploader.destroy(scholarship.image_id);
            
      } catch (err) {
        logError(err);
      }
    }

    // Delete embedded images in blog content
    if (scholarship.content) {
      const imgUrls = Array.from<RegExpMatchArray>(
        scholarship.content.matchAll(/<img[^>]+src="([^">]+)"/g)
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
    // delete scholarship from db
    await prisma.scholarship.delete({
      where: { id: scholarshipId },
    });

    return NextResponse.json({ message: "Scholarship deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting scholarship:", error);
    logError(error);
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
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    let image_id: string | null = existingScholarship.image_id;


    if (imageFile) {
          // 🔹 Delete old image from Cloudinary if it exists
          if (existingScholarship.image_id) {
            try {
              await cloudinary.uploader.destroy(existingScholarship.image_id);
            } catch (err) {
              logError(err);
            }
          }
    
          // 🔹 Upload new image to Cloudinary
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "scholarships",
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

    const updatedScholarship = await prisma.scholarship.update({
      where: { id: scholarshipId },
      data: {
        title: title ?? existingScholarship.title,
        content: content ?? existingScholarship.content,
        image_path,
        image_id,
      },
    });

    return NextResponse.json(updatedScholarship, { status: 200 });
  } catch (error) {
    console.error("Error updating scholarship:", error);
    logError(error);
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
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

