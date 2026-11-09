import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken, logError } from "@/lib/server/utils";
import { createPdfUploadUrl, MAX_PDF_BYTES } from "@/lib/server/supabase-storage";

export async function POST(req: NextRequest) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData)
      return NextResponse.json({ message: "Your session has expired. Please log in again." }, { status: 401 });

    const { fileName, fileType, fileSize } = (await req.json()) as {
      fileName?: string;
      fileType?: string;
      fileSize?: number;
    };

    const isPdf = fileType === "application/pdf" || fileName?.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json({ message: "The report file must be a PDF." }, { status: 400 });
    }
    if (typeof fileSize !== "number" || fileSize <= 0) {
      return NextResponse.json({ message: "The PDF file is empty." }, { status: 400 });
    }
    if (fileSize > MAX_PDF_BYTES) {
      return NextResponse.json(
        { message: `The PDF is too large (${(fileSize / 1024 / 1024).toFixed(1)} MB). The maximum is 50 MB.` },
        { status: 413 }
      );
    }

    const { path, uploadUrl } = await createPdfUploadUrl("reports");
    return NextResponse.json({ path, uploadUrl }, { status: 200 });
  } catch (error) {
    logError(error);
    return NextResponse.json({ message: "Could not prepare the PDF upload. Please try again." }, { status: 500 });
  }
}
