import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com";

  // Discover blog slugs by reading the blog folder
  const blogDir = path.join(process.cwd(), "src", "app", "[locale]", "blog");
  let slugs: string[] = [];
  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });
    slugs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
  } catch {
    // ignore if the folder isn't readable in certain build environments
  }

  const locales = routing.locales;

  // Core static routes per locale
  const staticPerLocale = [
    "", // home
    "join-us",
    "contact",
    "rules",
    "team",
    "blog",
  ];

  const items: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static routes
    for (const seg of staticPerLocale) {
      const loc = seg ? `${host}/${locale}/${seg}` : `${host}/${locale}`;
      items.push({
        url: loc,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: seg === "" ? 1 : 0.7,
      });
    }

    // Blog posts
    for (const slug of slugs) {
      items.push({
        url: `${host}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return items;
}
