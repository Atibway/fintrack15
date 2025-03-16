import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  // Protected routes pattern
  const protectedRoutes = [
    "/dashboard",
    "/accounts",
    "/categories",
    "/transactions",
    "/budget",
    "/reports",
    "/settings",
  ]

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`),
  )

  // If it's a protected route and user is not logged in, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

