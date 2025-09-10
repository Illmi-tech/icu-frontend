import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import {getDecodedToken, generateSlug} from "@/lib/server/utils";


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
      .replace(/\s+/g, "-")         // replace spaces with -
      .replace(/[^a-z0-9.-]/g, "")  // remove non-alphanumeric except . and -
      .replace(/\.[^/.]+$/, "");     // remove original extension

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

      // Save the image
      await fs.writeFile(filePath, bufferToSave);
      image_path = `/api/images/scholarships/${fileName}`;
    }

    // Generate a unique slug
    let slug: string;
    let isUnique = false;
    do {
      slug = generateSlug(title || "untitled"); // your function: title + random 3-digit number
      const existing = await prisma.scholarship.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    } while (!isUnique);

    const scholarship = await prisma.scholarship.create({
      data: {
        title,
        content,
        admin_id: adminId,
        image_path,
        slug,
      },
    });

    return NextResponse.json(scholarship, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}



export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { date: "desc" }, // newest first
    });
    return NextResponse.json(scholarships, { status: 200 });
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
