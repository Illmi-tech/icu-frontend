// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { SignJWT } from "jose"; // <-- use jose

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Create JWT using jose
    const token = await new SignJWT({
      id: admin.id,
      username: admin.username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("720h") // token expires in 1 month
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Store token in HttpOnly cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 1 hour
    });

    return new NextResponse(
      JSON.stringify({ message: "Login successful" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
