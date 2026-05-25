import { NextResponse, type NextRequest } from "next/server";
import { isSupportedLocale, LOCALE_COOKIE_NAME } from "@/lib/i18n/config";

function getSafeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/landing";
  }

  return value;
}

export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? undefined;
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const redirectUrl = new URL(nextPath, request.url);
  const response = NextResponse.redirect(redirectUrl);

  if (isSupportedLocale(locale)) {
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax"
    });
  }

  return response;
}
