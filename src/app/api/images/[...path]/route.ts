import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
    const { path: pathParts } = await context.params;
  const filePath = path.join(process.cwd(), "uploads", ...pathParts);

  try {
    const file = await fs.readFile(filePath);

    // Basic MIME type detection
    const ext = path.extname(filePath).toLowerCase();
    const mime =
      ext === ".webp"
        ? "image/webp"
        : ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "application/octet-stream";

    return new NextResponse(new Uint8Array(file), {
      headers: { "Content-Type": mime },
    });
  } catch {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
