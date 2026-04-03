import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/server/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ message: "No image URL provided" }, { status: 400 });
    }

    // Extract Cloudinary public_id from URL
    // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/blogs/abc123.jpg
    const parts = url.split("/");
    const fileWithExt = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${fileWithExt.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ message: "Failed to delete image" }, { status: 500 });
  }
}
