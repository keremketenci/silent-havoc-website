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

// export const metadata: Metadata = {
//   title: "SILENT HAVOC",
//   description: "Airsoft Organization",
//   icons: {
//     icon: "/favicon.svg",
//   },
// };

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    const fallbackTitle = process.env.SITE_TITLE_EN || "SILENT HAVOC";
    const fallbackDescription = process.env.SITE_DESCRIPTION_EN || "Airsoft Organization";
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      icons: { icon: "/favicon.svg" },
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com"),
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com";
  if (locale === "tr") {
    const title = process.env.SITE_TITLE_TR || "SILENT HAVOC";
    const description = process.env.SITE_DESCRIPTION_TR || "Hava Tüfekleri Organizasyonu";
    return {
      title,
      description,
      icons: { icon: "/favicon.svg" },
      keywords: ["airsoft", "organizasyon", "silent havoc"],
      authors: [{ name: "Kerem Ketenci", url: "https://keremketenci.com" }],
      metadataBase: new URL(siteUrl),
    };
  } else {
    const title = process.env.SITE_TITLE_EN || "SILENT HAVOC";
    const description = process.env.SITE_DESCRIPTION_EN || "Airsoft Organization";
    return {
      title,
      description,
      icons: { icon: "/favicon.svg" },
      keywords: ["airsoft", "organization", "silent havoc"],
      authors: [{ name: "Kerem Ketenci", url: "https://keremketenci.com" }],
      metadataBase: new URL(siteUrl),
    };
  }
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
