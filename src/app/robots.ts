import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://silenthavoc.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/api/*",
          "/_next/static/",
          "/_next/image/",
          "/favicon.ico",
        ],
      },
    ],
    host,
    sitemap: `${host}/sitemap.xml`,
  };
}
