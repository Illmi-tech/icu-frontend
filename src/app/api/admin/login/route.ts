// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your prisma client
import bcrypt from "bcryptjs"; // if passwords are hashed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // If password is hashed
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Success — (for now, just return success; later you can add JWT / session)
    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
