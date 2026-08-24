import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import { getDecodedToken, logError } from "@/lib/server/utils";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    const id = Number(idParam);
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const isRead = body.is_read;

    if (typeof isRead !== "boolean") {
      return NextResponse.json(
        { message: "is_read must be a boolean" },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsor.update({
      where: { id },
      data: { is_read: isRead },
    });

    return NextResponse.json({ success: true, sponsor }, { status: 200 });
  } catch (error) {
    console.error("Error updating sponsorship:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
