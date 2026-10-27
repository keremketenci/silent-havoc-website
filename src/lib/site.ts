import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com"
).replace(/\/$/, "");

export const siteName = "SILENT HAVOC";

export const contactEmail =
  process.env.CONTACT_EMAIL || "silent.havoc.istanbul@gmail.com";

export const ogImage = "/icons/silenthavoc/logo-colored.png";

// Absolute URL of a page for the given locale. `path` is locale-less ("" or "/team").
export function localizedUrl(locale: string, path = "") {
  return `${siteUrl}/${locale}${path}`;
}

// canonical + hreflang alternates for a locale-less path
export function alternatesFor(locale: string, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);

  return { canonical: localizedUrl(locale, path), languages };
}

interface PageMetadataOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type,
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
