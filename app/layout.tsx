import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/i18n/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Math Visual Trainer",
  description: "Visual arithmetic learning for children with parent analytics."
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang={locale}>
      <body className="antialiased">
        <AuthProvider>
          <LanguageSwitcher currentLocale={locale} labels={dictionary.language} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
