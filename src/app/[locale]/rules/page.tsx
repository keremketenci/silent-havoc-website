import { setRequestLocale } from "next-intl/server";

import { Rules } from "@/components/sections/Rules/Rules";
import { translatedPageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/rules">) {
  return translatedPageMetadata(params, "rules", "/rules");
}

export default async function RulesPage({ params }: PageProps<"/[locale]/rules">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="min-h-screen" id="Rules">
      <Rules />
    </section>
  );
}
