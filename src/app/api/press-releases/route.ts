import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";
import {getDecodedToken, generateSlug, logError} from "@/lib/server/utils";


export async function POST(req: NextRequest) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const adminId = tokenData.id;
    const imageFile = formData.get("image") as File | null;
    //const slug = generateSlug(title || "untitled");

    if (!title || !content || !adminId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let image_path: string | null = null;
    let image_id: string | null = null;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
    
      // Upload to Cloudinary
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "press-releases",                // Cloudinary folder
            format: "webp",                 // force webp
            transformation: [
              { width: 1200, crop: "limit" }, // resize max width 1200px
              { quality: "auto" },            // auto quality
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      });
    
      image_path = uploadResult.secure_url; // Cloudinary URL
      image_id = uploadResult.public_id;   // Cloudinary public ID
    }

    // Generate a unique slug
    let slug: string;
    let isUnique = false;
    do {
      slug = generateSlug(title || "untitled"); // your function: title + random 3-digit number
      const existing = await prisma.press_release.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    } while (!isUnique);

    const pressRelease = await prisma.press_release.create({
      data: {
        title,
        content,
        admin_id: adminId,
        image_path,
        image_id,
        slug,
      },
    });

    return NextResponse.json(pressRelease, { status: 201 });
  } catch (error) {
    console.error("Error creating press release:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}



export async function GET() {
  try {
    const pressReleases = await prisma.press_release.findMany({
      orderBy: { date: "desc" }, // newest first
    });
    return NextResponse.json(pressReleases, { status: 200 });
  } catch (error) {
    console.error("Error fetching press releases:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
