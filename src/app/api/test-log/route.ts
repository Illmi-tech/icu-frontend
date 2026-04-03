import { NextResponse, NextRequest } from "next/server";
import {getDecodedToken, generateSlug, logError } from "@/lib/server/utils";
import { promises as fs } from "fs";
import sharp from "sharp";
import path from "path";
import prisma from "@/lib/server/prisma";


export async function POST(req: NextRequest) {
  try {
    logError("📥 Entered POST /api/blogs"); 
    const tokenData = await getDecodedToken();
    logError(`Decoded token: ${JSON.stringify(tokenData)}`);
    if (!tokenData) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    logError("❌ Unauthorized - token missing or invalid");
    
    const formData = await req.formData();
    logError("Form data received");
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const authorId = tokenData.id;
    const imageFile = formData.get("image") as File | null;
    //const slug = generateSlug(title || "untitled");
    logError(`Fields - title: ${title}, content length: ${content?.length}, authorId: ${authorId}, hasImage: ${!!imageFile}`);
    if (!title || !content || !authorId) {
      logError("❌ Missing required fields");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let image_path: string | null = null;
    const MAX_SIZE = 300 * 1024; // 300 KB

    if (imageFile) {
      logError(`🖼️ Processing image: ${imageFile.name}, size=${imageFile.size}`);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      logError(`Buffer created: ${buffer.length} bytes`);
      let bufferToSave: Buffer;

      // Compress and/or resize if too large
      if (buffer.length > MAX_SIZE) {
        logError("⚙️ Image too large, compressing..."); 
        let optimizedBuffer = await sharp(buffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        logError(`Optimized size: ${optimizedBuffer.length} bytes`);
        let quality = 75;
        while (optimizedBuffer.length > MAX_SIZE && quality > 10) {
          logError(`Still too large, retrying with quality=${quality}`);
          optimizedBuffer = await sharp(buffer)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();
          quality -= 5;
        }

        bufferToSave = optimizedBuffer;
      } else {
        // Convert small images to WebP without resizing
        logError("✅ Image small enough, converting only");
        bufferToSave = await sharp(buffer).webp().toBuffer();
      }

      const blogsDir = path.join(process.cwd(), "..", "uploads/blogs");
      await fs.mkdir(blogsDir, { recursive: true });
      logError(`📂 Blogs directory ready: ${blogsDir}`);

      // Sanitize filename
      const baseName = imageFile.name
      .toLowerCase()
      .replace(/\s+/g, "-")         // replace spaces with -
      .replace(/[^a-z0-9.-]/g, "")  // remove non-alphanumeric except . and -
      .replace(/\.[^/.]+$/, "");     // remove original extension

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

      // Save the image
      await fs.writeFile(filePath, bufferToSave);
      logError(`💾 Image written: ${filePath}`);
      image_path = `/api/images/blogs/${fileName}`;
    }

    // Generate a unique slug
    logError("🔑 Generating slug..."); 
    let slug: string;
    let isUnique = false;
    do {
      slug = generateSlug(title || "untitled"); // your function: title + random 3-digit number
      const existing = await prisma.blog.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    } while (!isUnique);
    logError(`✅ Slug finalized: ${slug}`);
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        author_id: authorId,
        image_path,
        slug,
      },
    });
    logError(`🎉 Blog inserted with ID: ${blog.id}`);

    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    logError("💥 Fatal error in POST /api/blogs");
    logError(error);
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    logError("📥 Entered GET /api/test-log"); 
    const blogs = await prisma.blog.findMany({
      orderBy: { date: "desc" }, // newest first
    });
    logError(`✅ Retrieved ${blogs.length} blogs`);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: unknown) {
    logError("💥 Fatal error in GET /api/test-log"); // <--- log generic catch
    logError(error);
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}