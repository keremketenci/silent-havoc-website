import React from "react";
import fs from "fs/promises";
import path from "path";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "tr";
  const t = await getTranslations({ locale, namespace: "Blog" });
  const url = `/${locale}/blog`;
  const title = t("Index.title");
  const description = t("Index.description");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "tr";
  const base = `/${locale}/blog`;
  const t = await getTranslations({ locale, namespace: "Blog" });

  // Auto-discover blog subpages by scanning the folder structure
  const blogDir = path.join(process.cwd(), "src", "app", "[locale]", "blog");
  const slugs: string[] = [];
  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const pagePath = path.join(blogDir, e.name, "page.tsx");
      try {
        await fs.access(pagePath);
        slugs.push(e.name);
      } catch {}
    }
  } catch {
    // ignore if directory can't be read
  }

  // Simple title from slug (kebab-case -> Title Case)
  const toTitle = (slug: string) =>
    slug
      .split("-")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(" ");

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl text-accent p-4">
        {t("Index.title")}
      </h1>
      <p className="text-center text-muted-foreground mb-6">
        {t("Index.description")}
      </p>
      <ul className="space-y-8">
        {slugs.map((slug) => {
          let label = toTitle(slug);
          let desc: string | null = null;
          try {
            label = t(`Posts.${slug}.title`);
          } catch {}
          try {
            desc = t(`Posts.${slug}.description`);
          } catch {
            desc = null;
          }
          return (
            <li key={slug}>
              <div className="p-4">
                <a
                  className="md:cursor-none cursor-target text-lg font-semibold hover:underline p-2"
                  href={`${base}/${slug}`}
                >
                  {label}
                </a>
                {desc ? (
                  <p className="text-muted-foreground mt-1">
                    {desc}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
