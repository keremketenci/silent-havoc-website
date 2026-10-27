import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { blogSlugs, isBlogSlug, type BlogContent } from "@/lib/blog";
import { localizedUrl, ogImage, pageMetadata, siteName, siteUrl } from "@/lib/site";

const datePublished = "2025-10-26";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isBlogSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: "Blog" });
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: t(`Posts.${slug}.title`),
    description: t(`Posts.${slug}.description`),
    type: "article",
  });
}

export default async function BlogPost({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = t(`Posts.${slug}.title`);
  const description = t(`Posts.${slug}.description`);
  const content = t.raw(`Posts.${slug}.content`) as BlogContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    url: localizedUrl(locale, `/blog/${slug}`),
    image: `${siteUrl}${ogImage}`,
    datePublished,
    author: { "@type": "Organization", name: siteName, url: siteUrl },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-center">{title}</h1>
      <p className="text-center text-muted-foreground text-lg md:text-xl mt-2 mb-8">
        {description}
      </p>

      {content?.intro && <p>{content.intro}</p>}
      {content?.sections?.map((s, i) => (
        <section key={i}>
          {s.h2 && <h2 className="mt-6 text-xl font-semibold">{s.h2}</h2>}
          {s.p?.map((p, j) => <p key={j}>{p}</p>)}
          {s.list && (
            <ul>
              {s.list.map((li, k) => (
                <li key={k}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
