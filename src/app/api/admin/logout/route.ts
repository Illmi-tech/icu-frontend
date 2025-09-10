import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  try {
    // Clear the token cookie
    const cookie = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // HIGHLIGHT: expire immediately
    });

    return new NextResponse(
      JSON.stringify({ message: "Logout successful" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
