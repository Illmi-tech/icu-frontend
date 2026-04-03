import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logError, logInfo } from "@/lib/server/utils";

export async function middleware(req: NextRequest) {
  try {
    // Debugging logs
    console.log("➡️ Middleware hit:", req.method, req.nextUrl.pathname);
    logInfo(`➡️ Middleware hit: ${req.method} ${req.nextUrl.pathname}`);

    return NextResponse.next();
  } catch (err) {
    logError(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export const config = {
  matcher: ["/api/:path*"], // applies to all API routes
};

// export async function middleware(req: NextRequest) {
//   try {
//     return NextResponse.next();
//   } catch (err) {
//     logError(err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export const config = {
//   matcher: ["/api/:path*"], // applies to all API routes
// };