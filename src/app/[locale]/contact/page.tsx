import { setRequestLocale } from "next-intl/server";

import { Contact } from "@/components/sections/Contact/Contact";
import { Subscribe } from "@/components/sections/Subscribe/Subscribe";
import { translatedPageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return translatedPageMetadata(params, "contact", "/contact");
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-y-24 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48">
      <section id="Contact">
        <Contact />
      </section>

      <section id="Subscribe">
        <div>
          <Subscribe />
        </div>
      </section>
    </div>
  );
}
