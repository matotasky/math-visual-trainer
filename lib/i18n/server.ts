import { cookies, headers } from "next/headers";
import type { Locale } from "@/types";
import { detectLocale, LOCALE_COOKIE_NAME } from "./config";
import { getDictionary } from "./messages";

export async function getRequestLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  return detectLocale({
    acceptLanguage: headerStore.get("accept-language"),
    countryCode: headerStore.get("x-vercel-ip-country"),
    cookieLocale
  });
}

export async function getRequestDictionary() {
  const locale = await getRequestLocale();

  return getDictionary(locale);
}
