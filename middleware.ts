import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "signup"];

export const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      route === nextUrl.pathname || nextUrl.pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some((route) => route === nextUrl.pathname);

  const session = await auth();

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes],
};
