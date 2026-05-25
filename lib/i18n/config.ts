import type { Locale } from "@/types";

export const DEFAULT_LOCALE: Locale = "sk";
export const SUPPORTED_LOCALES = ["sk", "en"] as const;
export const LOCALE_COOKIE_NAME = "mvt_locale";

const englishCountryCodes = new Set(["US", "GB", "IE", "CA", "AU", "NZ"]);
const slovakCountryCodes = new Set(["SK", "CZ"]);

export function isSupportedLocale(value: string | undefined): value is Locale {
  return value === "sk" || value === "en";
}

function preferredBrowserLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) {
    return null;
  }

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((item) => item.trim().toLowerCase().split(";")[0])
    .filter(Boolean);

  const firstSupported = preferredLanguages.find((language) => {
    return language === "sk" || language.startsWith("sk-") || language === "cs" || language.startsWith("cs-") || language === "en" || language.startsWith("en-");
  });

  if (!firstSupported) {
    return null;
  }

  return firstSupported.startsWith("en") ? "en" : "sk";
}

export function detectLocale(params: {
  acceptLanguage: string | null;
  countryCode: string | null;
  cookieLocale?: string;
}): Locale {
  if (isSupportedLocale(params.cookieLocale)) {
    return params.cookieLocale;
  }

  const countryCode = params.countryCode?.toUpperCase() ?? null;

  if (countryCode && slovakCountryCodes.has(countryCode)) {
    return "sk";
  }

  if (countryCode && englishCountryCodes.has(countryCode)) {
    return "en";
  }

  return preferredBrowserLocale(params.acceptLanguage) ?? DEFAULT_LOCALE;
}
