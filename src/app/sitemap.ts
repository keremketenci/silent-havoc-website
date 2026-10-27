import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { blogSlugs } from "@/lib/blog";
import { localizedUrl } from "@/lib/site";

// Core static routes (locale-less)
const staticPaths = ["", "/join-us", "/contact", "/rules", "/team", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    path: string,
    changeFrequency: "weekly" | "monthly",
    priority: number
  ): MetadataRoute.Sitemap =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(l, path)])
        ),
      },
    }));

  return [
    ...staticPaths.flatMap((path) =>
      entry(path, "weekly", path === "" ? 1 : 0.7)
    ),
    ...blogSlugs.flatMap((slug) => entry(`/blog/${slug}`, "monthly", 0.6)),
  ];
}
