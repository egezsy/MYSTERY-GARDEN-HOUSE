import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./lib/i18n-config";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (accept) {
    const preferred = accept.split(",")[0].split("-")[0].toLowerCase();
    if ((i18n.locales as readonly string[]).includes(preferred)) {
      return preferred;
    }
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, the admin area and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") // static files (images, sitemap, etc.)
  ) {
    return NextResponse.next();
  }

  const hasLocale = i18n.locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url,
    ),
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
