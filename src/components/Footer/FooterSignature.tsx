"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LabelAsync } from "@/components/ui/label/LabelAsync";
import { useFormatter } from "next-intl";

export default function FooterSignature({
  language,
}: {
  language: "en" | "tr";
}) {
  const t = useTranslations("Footer");
  const formatter = useFormatter();
  const year = formatter.dateTime(new Date(), { year: "numeric" });

  return (
    <div className="text-lg py-8 text-center">
      {language === "en" && (
        <div>
          <p>
            {` ${t("Copyright.copyright")} @ ${year} `}
            <span className="text-xl text-highlight">{`${t(
              "Domain.text"
            )} `}</span>
            {` ${t("Copyright.allRightsReserved")}. `}
          </p>
          <div className="flex flex-row justify-center mt-2">
            <LabelAsync
              text1={`${t("designBy")}`}
              text1Class="text-purple"
              text3={`${t("studio")}`}
              text3Class="text-accent"
              text2={`${t("developedBy")}`}
              text2Class="text-purple"
              text4="Kerem Ketenci"
              text4Class="text-accent"
            />
          </div>
        </div>
      )}

      {language === "tr" && (
        <div>
          <p>
            {` ${t("Copyright.copyright")} @ ${year} `}
            <span className="text-xl text-highlight">{`${t(
              "Domain.text"
            )} `}</span>
            {` ${t("Copyright.allRightsReserved")}. `}
          </p>
          <div className="flex flex-row justify-center mt-2">
            <LabelAsync
              text1={`${t("studio")}`}
              text1Class="text-accent"
              text3={`${t("designBy")}`}
              text3Class="text-purple"
              text2="Kerem Ketenci"
              text2Class="text-accent"
              text4={`${t("developedBy")}`}
              text4Class="text-purple"
            />
          </div>
        </div>
      )}
    </div>
  );
}
