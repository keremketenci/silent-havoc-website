import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "tr";
  const t = await getTranslations({ locale, namespace: "Blog" });
  const url = `/${locale}/blog/airsoft-rifles-guide`;
  const rawTitle = t("Posts.airsoft-rifles-guide.title");
  const description = t("Posts.airsoft-rifles-guide.description");
  const title = `${rawTitle} — Silent Havoc`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function AirsoftRiflesGuide({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params?.locale || "tr",
    namespace: "Blog",
  });
  type Section = { h2?: string; p?: string[]; list?: string[] };
  type Content = { intro?: string; sections?: Section[] };
  const content = (t.raw(`Posts.airsoft-rifles-guide.content`) as unknown) as Content;
     return (
       <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t("Posts.airsoft-rifles-guide.title"),
            description: t("Posts.airsoft-rifles-guide.description"),
            author: { "@type": "Organization", name: "Silent Havoc" },
            datePublished: "2025-10-26",
          }),
        }}
      />
         <h1 className="text-4xl md:text-5xl font-bold text-center">{t("Posts.airsoft-rifles-guide.title")}</h1>
         <p className="text-center text-muted-foreground text-lg md:text-xl mt-2 mb-8">{t("Posts.airsoft-rifles-guide.description")}</p>
      {content?.intro && <p>{content.intro}</p>}
      {Array.isArray(content?.sections) &&
        content.sections.map((s, i) => (
          <section key={i}>
            {s.h2 && <h2 className="mt-6 text-xl font-semibold">{s.h2}</h2>}
            {Array.isArray(s.p) &&
              s.p.map((p: string, j: number) => <p key={j}>{p}</p>)}
            {Array.isArray(s.list) && (
              <ul>
                {s.list.map((li: string, k: number) => (
                  <li key={k}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </article>
  );
}
