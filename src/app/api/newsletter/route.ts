// src/app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Normalize email: trim spaces + lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Save or return existing
    const subscriber = await prisma.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
