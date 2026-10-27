// translations
import { useTranslations } from "next-intl";

// components
import { RulesCard } from "@/components/sections/Rules/RulesCard";

export function Rules() {
  const t = useTranslations("Rules");
  return (
    <div>
      <h1 className="text-4xl font-bold text-center p-4 text-accent">{`${t(
        "title"
      )}`}</h1>

      <RulesCard />
    </div>
  );
}
