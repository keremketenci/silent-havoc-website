import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/site";

// Builds page metadata from the `Metadata.<key>` translations
export async function translatedPageMetadata(
  params: Promise<{ locale: string }>,
  key: "team" | "joinUs" | "contact" | "rules",
  path: string
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `Metadata.${key}` });
  return pageMetadata({
    locale,
    path,
    title: t("title"),
    description: t("description"),
  });
}
