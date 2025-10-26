import "../globals.css";

import { Analytics } from "@vercel/analytics/next";

// translations
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// components
import { Navbar } from "@/components/Navbar/navbar";
import { Footer } from "@/components/Footer/Footer";
import { CursorWrapper } from "@/components/TargetCursor/CursorWrapper";
import ClickSpark from "@/components/ClickSpark";
import { Toaster } from "@/components/shadcn/ui/sonner";
import LogoBackground from "@/components/LogoBackground";
import Noise from "@/components/Noise";
import { NoiseToggleGate } from "@/components/NoiseToggleGate";
import LoadingWrapper from "@/components/Loading/LoadingWrapper";

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const isValidLocale = hasLocale(routing.locales, locale);
  const resolvedLocale = isValidLocale ? locale : "en";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com";
  const isTR = resolvedLocale === "tr";

  const title = isTR
    ? process.env.SITE_TITLE_TR ||
      "SILENT HAVOC | Airsoft Takımı ve Organizasyonu"
    : process.env.SITE_TITLE_EN ||
      "SILENT HAVOC | Airsoft Team and Organization";

  const description = isTR
    ? process.env.SITE_DESCRIPTION_TR ||
      "Türkiye’nin en iyi airsoft alanlarını ve profesyonel takımlarını keşfedin. Adrenalin, strateji ve ekip ruhunu bir arada yaşayın!"
    : process.env.SITE_DESCRIPTION_EN ||
      "Discover Turkey’s top airsoft fields and professional teams. Experience adrenaline, strategy, and team spirit together!";

  const keywords = isTR
    ? [
        "airsoft",
        "airsoft takımı",
        "airsoft organizasyon",
        "airsoft etkinlik",
        "airsoft oyunları",
        "airsoft kuralları",
        "airsoft taktikleri",
        "airsoft strateji",
        "airsoft ekipman",
        "airsoft tüfek",
        "airsoft tabanca",
        "milsim",
        "CQB",
        "istanbul airsoft",
        "airsoft Türkiye",
        "silent havoc",
      ]
    : [
        "airsoft",
        "airsoft team",
        "airsoft organization",
        "airsoft events",
        "airsoft games",
        "airsoft rules",
        "airsoft tactics",
        "airsoft strategy",
        "airsoft gear",
        "airsoft rifles",
        "airsoft pistols",
        "milsim",
        "CQB",
        "airsoft Istanbul",
        "airsoft Turkey",
        "silent havoc",
      ];

  const ogLocale = isTR ? "tr_TR" : "en_US";

  return {
    title,
    description,
    icons: { icon: "/favicon.svg" },
    keywords,
    authors: [{ name: "Kerem Ketenci", url: "https://keremketenci.com" }],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${resolvedLocale}/`,
      languages: {
        en: `${siteUrl}/en/`,
        tr: `${siteUrl}/tr/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${resolvedLocale}/`,
      siteName: "SILENT HAVOC",
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased min-h-screen`} // bg-pattern
      >
        <NoiseToggleGate />

        <NextIntlClientProvider>
          <header className="fixed top-0 left-0 w-full shadow-md bg-background p-2 z-99 border-b border-slate-800">
            <ClickSpark
              sparkColor="#fff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <Navbar />
            </ClickSpark>
          </header>
          <main className="pt-16 container mx-auto">
            <CursorWrapper />
            <ClickSpark
              sparkColor="#fff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <div>
                <LogoBackground />
              </div>
              <LoadingWrapper>{children}</LoadingWrapper>
              <Analytics />
              <div className="pt-12">
                <Footer language={locale as "en" | "tr"} />
              </div>
            </ClickSpark>
          </main>
          <Toaster className="cursor-default" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
