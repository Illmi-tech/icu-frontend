import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import cloudinary from "@/lib/server/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { getDecodedToken, generateSlug, logError } from "@/lib/server/utils";

export async function POST(req: NextRequest) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const adminId = tokenData.id;
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (!title || !adminId || !pdfFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let image_path: string | null = null;
    let image_id: string | null = null;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "newsletter-issues/images",
            format: "webp",
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

    let pdf_path: string;
    let pdf_id: string | null = null;
    {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());

      const uploadPdfResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "newsletter-issues/pdfs",
            resource_type: "raw",
            format: "pdf",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      });

      pdf_path = uploadPdfResult.secure_url;
      pdf_id = uploadPdfResult.public_id;
    }

    let slug: string;
    let isUnique = false;
    do {
      slug = generateSlug(title || "untitled");
      const existing = await prisma.newsletterIssue.findUnique({ where: { slug } });
      if (!existing) isUnique = true;
    } while (!isUnique);

    const issue = await prisma.newsletterIssue.create({
      data: {
        title,
        admin_id: adminId,
        image_path,
        image_id,
        pdf_path,
        pdf_id,
        slug,
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter issue:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const issues = await prisma.newsletterIssue.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error("Error fetching newsletter issues:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
