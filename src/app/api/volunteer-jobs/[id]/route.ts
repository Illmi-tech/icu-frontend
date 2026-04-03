import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/server/prisma";
import {getDecodedToken, logError} from "@/lib/server/utils"; 
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";

// DELETE /api/volunteer-jobs/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    if (volunteerJob.image_id) {
      try {
        await cloudinary.uploader.destroy(volunteerJob.image_id);
            
      } catch (err) {
        logError(err);
      }
    }

    // Delete embedded images in blog content
    if (volunteerJob.content) {
      const imgUrls = Array.from<RegExpMatchArray>(
        volunteerJob.content.matchAll(/<img[^>]+src="([^">]+)"/g)
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

    // delete volunteer job from db
    await prisma.volunteer_Job.delete({
      where: { id: volunteerJobId },
    });

    return NextResponse.json({ message: "volunteer job deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer job:", error);
    logError(error);
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
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    let image_id: string | null = existingVolunteerJob.image_id;

    if (imageFile) {
          // 🔹 Delete old image from Cloudinary if it exists
          if (existingVolunteerJob.image_id) {
            try {
              await cloudinary.uploader.destroy(existingVolunteerJob.image_id);
            } catch (err) {
              logError(err);
            }
          }
    
          // 🔹 Upload new image to Cloudinary
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "volunteer-jobs",
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

    const updatedVolunteerJob = await prisma.volunteer_Job.update({
      where: { id: volunteerJobId },
      data: {
        title: title ?? existingVolunteerJob.title,
        content: content ?? existingVolunteerJob.content,
        image_path,
        image_id,
      },
    });

    return NextResponse.json(updatedVolunteerJob, { status: 200 });
  } catch (error) {
    console.error("Error updating volunteer job:", error);
    logError(error);
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
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

