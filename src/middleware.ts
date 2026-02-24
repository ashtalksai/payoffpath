import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/debts") ||
    req.nextUrl.pathname.startsWith("/transactions") ||
    req.nextUrl.pathname.startsWith("/budgets") ||
    req.nextUrl.pathname.startsWith("/reports") ||
    req.nextUrl.pathname.startsWith("/settings");
  const isOnAuth = req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isOnAuth && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/debts/:path*",
    "/transactions/:path*",
    "/budgets/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
