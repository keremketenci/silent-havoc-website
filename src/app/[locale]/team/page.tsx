import { setRequestLocale } from "next-intl/server";

import { Team } from "@/components/sections/Team/Team";
import { translatedPageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/team">) {
  return translatedPageMetadata(params, "team", "/team");
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-20 sm:py-18 md:py-20 2xl:py-16" id="Team">
      <Team />
    </section>
  );
}
