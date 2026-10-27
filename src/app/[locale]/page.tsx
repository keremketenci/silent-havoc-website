import { setRequestLocale } from "next-intl/server";

import { Home } from "@/components/sections/Home/Home";
import { ogImage, siteName, siteUrl } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: siteName,
    sport: "Airsoft",
    url: siteUrl,
    logo: `${siteUrl}${ogImage}`,
    location: { "@type": "Place", name: "Istanbul, Türkiye" },
    sameAs: ["https://www.instagram.com/silent_havoc_istanbul"],
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
        }}
      />
      {/* Home Section */}
      <section id="Home">
        <Home />
      </section>
    </section>
  );
}
