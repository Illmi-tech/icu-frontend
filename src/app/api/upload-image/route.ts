// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/server/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const folder = (formData.get("folder") as string) || "blogs";

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload directly using upload_stream and end()
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          format: "webp",
          transformation: [
            { width: 1200, crop: "limit" },
            { quality: "auto" },
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer); // ✅ important!
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
