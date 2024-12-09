import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // Redirect to home if not authenticated
  if (!authToken || !userRole) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Admin routes protection
    if (pathname.startsWith("/admin")) {
      if (userRole !== process.env.NEXT_PUBLIC_ROLE_ADMIN) {
        return NextResponse.redirect(new URL("/users/dashboard", request.url));
      }
    }

    // User routes protection
    if (pathname.startsWith("/users")) {
      if (userRole === process.env.NEXT_PUBLIC_ROLE_ADMIN) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
