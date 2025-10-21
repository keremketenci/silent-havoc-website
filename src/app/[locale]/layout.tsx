import "../globals.css";

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

export const metadata: Metadata = {
  title: "SILENT HAVOC",
  description: "Airsoft Organization",
  icons: {
    icon: "/favicon.svg",
  },
};

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
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased min-h-screen`} // bg-pattern
      >
        <div className="fixed inset-0 -z-99">
          <Noise />
        </div>

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
