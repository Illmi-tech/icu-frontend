// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

function isMaintenanceMode(): boolean {
  return process.env.MAINTENANCE_MODE === "true";
}

function isStaticAsset(pathname: string): boolean {
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return true;
  }

  return /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js|map)$/i.test(
    pathname
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Mimics Chrome's DNS / unreachable interstitial (not a real NXDOMAIN). */
function chromeUnreachableHtml(host: string): string {
  const safeHost = escapeHtml(host);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${safeHost}</title>
<style>
  html, body { margin: 0; padding: 0; height: 100%; }
  body {
    font-family: "Segoe UI", Tahoma, sans-serif;
    font-size: 75%;
    background: #fff;
    color: #333;
  }
  #main-frame-error {
    margin: 0 auto;
    max-width: 600px;
    padding: 72px 20px 40px;
  }
  .icon {
    width: 72px;
    height: 72px;
    margin-bottom: 20px;
    background: #e8eaed;
    border-radius: 50%;
    position: relative;
  }
  .icon::before {
    content: "";
    position: absolute;
    inset: 18px;
    border: 4px solid #9aa0a6;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .icon::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 18px;
    background: #9aa0a6;
    left: 50%;
    top: 22px;
    margin-left: -2px;
    border-radius: 2px;
  }
  h1 {
    color: #333;
    font-size: 1.6em;
    font-weight: 400;
    margin: 0 0 16px;
    line-height: 1.25;
  }
  .error-code {
    color: #666;
    font-size: 0.95em;
    margin: 20px 0 0;
  }
  .suggestions {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    color: #666;
    line-height: 1.6;
  }
  .suggestions li {
    margin: 0 0 6px;
    padding-left: 1.1em;
    position: relative;
  }
  .suggestions li::before {
    content: "•";
    position: absolute;
    left: 0;
  }
  #reload-button {
    margin-top: 28px;
    background: #1a73e8;
    border: 0;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    min-width: 72px;
    padding: 8px 16px;
  }
  #reload-button:hover { background: #1765cc; }
  @media (prefers-color-scheme: dark) {
    body { background: #202124; color: #e8eaed; }
    h1 { color: #e8eaed; }
    .error-code, .suggestions { color: #9aa0a6; }
    .icon { background: #3c4043; }
    .icon::before { border-color: #9aa0a6; }
    .icon::after { background: #9aa0a6; }
  }
</style>
</head>
<body>
  <div id="main-frame-error">
    <div class="icon" aria-hidden="true"></div>
    <h1>This site can’t be reached</h1>
    <p style="margin:0;color:#666;line-height:1.5">
      <strong style="font-weight:500">${safeHost}</strong>’s DNS address could not be found. Diagnosing the problem.
    </p>
    <ul class="suggestions">
      <li>Checking the connection</li>
      <li>Checking the proxy and the firewall</li>
      <li>Running Windows Network Diagnostics</li>
    </ul>
    <p class="error-code">DNS_PROBE_FINISHED_NXDOMAIN</p>
    <button id="reload-button" onclick="location.reload()">Reload</button>
  </div>
</body>
</html>`;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Global maintenance mode — checked first
  if (isMaintenanceMode() && !isStaticAsset(pathname)) {
    // No JSON body that reveals an API exists
    if (pathname.startsWith("/api/")) {
      return new NextResponse(null, {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const host = req.headers.get("host") || req.nextUrl.host || "this site";
    return new NextResponse(chromeUnreachableHtml(host), {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  // Protect only /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
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

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals that should never hit middleware.
     * Static file extensions are also skipped here; middleware also guards them.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
