import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { blogSlugs } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return pageMetadata({
    locale,
    path: "/blog",
    title: t("Index.title"),
    description: t("Index.description"),
  });
}

export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl text-accent p-4">
        {t("Index.title")}
      </h1>
      <p className="text-center text-muted-foreground mb-6">
        {t("Index.description")}
      </p>
      <ul className="space-y-8">
        {blogSlugs.map((slug) => (
          <li key={slug}>
            <div className="p-4">
              <Link
                className="md:cursor-none cursor-target text-lg font-semibold hover:underline p-2"
                href={`/blog/${slug}`}
              >
                {t(`Posts.${slug}.title`)}
              </Link>
              <p className="text-muted-foreground mt-1">
                {t(`Posts.${slug}.description`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
