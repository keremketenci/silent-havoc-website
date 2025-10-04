"use client";

// react
import React from "react";

// translations
import { useTranslations } from "next-intl";

// components ui
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shadcn/ui/accordion";

type RuleSection = {
  id: string;
  title: string;
  items: string[];
};

export function RulesCard() {
  const t = useTranslations("Rules");
  const sections = t.raw("Sections") as RuleSection[];
  return (
    <CardHighlighted
      cardType="Vertical"
      cardClass={`bg-card border border-slate-800 p-4`}
      title="Airsoft Kuralları"
      titleClass="text-center"
      description={`${t("Card.Description")}`}
      descriptionClass="text-center"
      content={
        <Accordion type="single" className="mb-4" collapsible>
          {sections.map((sec) => (
            <AccordionItem key={sec.id} value={sec.id}>
              <AccordionTrigger className="text-base font-semibold cursor-target md:cursor-none justify-center">
                {sec.title}
              </AccordionTrigger>
              <AccordionContent className="cursor-target">
                <ul className="list-decimal pl-6 space-y-2">
                  {sec.items.map((it, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {it}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
      contentClass=""
    />
  );
}
