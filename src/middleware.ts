// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function middleware(req: NextRequest) {
  // Protect only /admin/dashboard routes
  if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      // jose expects the secret as a Uint8Array
      const encoder = new TextEncoder();
      await jwtVerify(token, encoder.encode(JWT_SECRET));
      // Token valid
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// Apply middleware to admin dashboard routes
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
