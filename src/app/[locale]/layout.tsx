import "../globals.css";

import { Analytics } from "@vercel/analytics/next";

// translations
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorWrapper } from "@/components/effects/CursorWrapper";
import { ClickSpark } from "@/components/effects/ClickSpark";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { LogoBackground } from "@/components/layout/LogoBackground";
import { NoiseToggleGate } from "@/components/layout/NoiseToggleGate";
import { LoadingWrapper } from "@/components/layout/LoadingWrapper";

import type { Metadata, Viewport } from "next";
import { alternatesFor, localizedUrl, ogImage, siteName, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
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

  return {
    // Child pages only set their own title, e.g. "Rules | SILENT HAVOC"
    title: { default: title, template: `%s | ${siteName}` },
    description,
    applicationName: siteName,
    icons: { icon: "/favicon.svg" },
    keywords,
    authors: [{ name: "Kerem Ketenci", url: "https://keremketenci.com" }],
    metadataBase: new URL(siteUrl),
    // Home page values; every other page overrides these with its own path
    alternates: alternatesFor(resolvedLocale),
    openGraph: {
      title,
      description,
      url: localizedUrl(resolvedLocale),
      siteName,
      locale: isTR ? "tr_TR" : "en_US",
      type: "website",
      images: [{ url: ogImage }],
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
  // Enables static rendering for every page under this layout
  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="relative antialiased min-h-screen" // bg-pattern
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
              <LogoBackground />
              <LoadingWrapper>{children}</LoadingWrapper>
              <footer className="pt-12">
                <Footer language={locale} />
              </footer>
            </ClickSpark>
          </main>
          <Toaster className="cursor-default" />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
