import { setRequestLocale } from "next-intl/server";

import { JoinUsSection } from "@/components/sections/JoinUs/JoinUsSection";
import { translatedPageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/join-us">) {
  return translatedPageMetadata(params, "joinUs", "/join-us");
}

export default async function JoinUsPage({
  params,
}: PageProps<"/[locale]/join-us">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-24 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48">
      <JoinUsSection />
    </div>
  );
}
