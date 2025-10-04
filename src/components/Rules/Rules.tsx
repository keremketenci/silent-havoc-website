// translations
import { useTranslations } from "next-intl";

import React from "react";

// components
import { RulesCard } from "@/components/Rules/RulesCard";

export default function Rules() {
  const t = useTranslations("Rules");
  return (
    <div>
      <p className="text-4xl font-bold text-center p-4 text-accent">{`${t(
        "title"
      )}`}</p>

      <RulesCard />
    </div>
  );
}
