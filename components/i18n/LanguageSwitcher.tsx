"use client";

import type { Locale } from "@/types";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  labels: {
    label: string;
    slovak: string;
    english: string;
  };
};

const localeLabels: Record<Locale, string> = {
  sk: "SK",
  en: "EN"
};

export function LanguageSwitcher({ currentLocale, labels }: LanguageSwitcherProps) {
  function selectLocale(locale: Locale) {
    const nextPath = `${window.location.pathname}${window.location.search}`;
    const localeUrl = new URL("/api/locale", window.location.origin);
    localeUrl.searchParams.set("locale", locale);
    localeUrl.searchParams.set("next", nextPath);
    window.location.assign(localeUrl.toString());
  }

  return (
    <div
      aria-label={labels.label}
      className="fixed right-3 top-3 z-50 inline-flex rounded-md border border-slate-200 bg-white p-1 shadow-sm"
      role="group"
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          aria-label={locale === "sk" ? labels.slovak : labels.english}
          className={cn(
            "grid h-9 min-w-10 place-items-center rounded text-xs font-bold text-slate-600 transition",
            currentLocale === locale && "bg-slate-950 text-white"
          )}
          type="button"
          onClick={() => selectLocale(locale)}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
