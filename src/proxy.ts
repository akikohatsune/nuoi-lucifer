import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_ROUTES = ["/hml", "/login", "/list"];
const PUBLIC_FILE_REGEX = /\.[^/]+$/;

function isAllowedRoute(pathname: string) {
  return ALLOWED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  if (isAllowedRoute(pathname)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/hml";
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
