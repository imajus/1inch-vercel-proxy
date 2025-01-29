import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  console.log("Intercepting request:", req.url);

  return NextResponse.next(); // Let the request continue to API routes
}

export const config = {
  matcher: "/api/:path*",
};
