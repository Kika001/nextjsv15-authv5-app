import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Public pages that do NOT require login
  const publicPages = ["/", "/login", "/register"];

  // If route is public, allow access
  if (publicPages.includes(pathname)) {
    if (token && (pathname === "/login" || pathname === "/register")) {
      // Logged-in user trying to access auth page → redirect to their dashboard
      const url = token.role === "admin" ? "/dashboard" : "/profile";
      return NextResponse.redirect(new URL(url, req.url));
    }
    return NextResponse.next();
  }

  // Redirect user to their specific dashboard if they are on the root page
  if (token && pathname === "/") {
    const url = token.role === "admin" ? "/dashboard" : "/profile";
    return NextResponse.redirect(new URL(url, req.url));
  }

  // Otherwise, route is protected
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
