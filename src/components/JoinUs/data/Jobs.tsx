import { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { ButtonWrapper } from "@/Wrappers/ButtonWrapper";
import { useNavigateToSection } from "@/app/hooks/useNavigateToSection";

export interface Job {
  title: string;
  description: ReactNode;
  content: string;
  footer: ReactNode;
}

export const getJobs = (
  t: (key: string) => string,
  onApplyClick: (title: string) => void,
  navigateToSection: (path: string) => void
): Job[] => [
  {
    title: t("Job.Title.member"),
    description: (
      <div className="flex items-center">
        <Icon name="clock" className="w-6 mr-1" />
        <span>{t("Job.Time.hybrid")}</span>
      </div>
    ),
    content: `${t("Job.content")}.`,
    footer: (
      <ButtonWrapper
        variant="slideX"
        title={t("Job.Title.member")}
        text={t("Button.apply")}
        onClick={() => {
          onApplyClick(
            t("Form.subject") +
              " || " +
              " " +
              t("Form.role") +
              ": " +
              t("Job.Title.member")
          );
          navigateToSection("/join-us#JoinUsForm");
        }}
      />
    ),
  },
  {
    title: t("Job.Title.member"),
    description: (
      <div className="flex items-center">
        <Icon name="clock" className="w-6 mr-1" />
        <span>{t("Job.Time.hybrid")}</span>
      </div>
    ),
    content: `${t("Job.content")}.`,
    footer: (
      <ButtonWrapper
        variant="slideX"
        title={t("Job.Title.member")}
        text={t("Button.apply")}
        onClick={() => {
          onApplyClick(
            t("Form.subject") +
              " || " +
              " " +
              t("Form.role") +
              ": " +
              t("Job.Title.member")
          );
          navigateToSection("/join-us#JoinUsForm");
        }}
      />
    ),
  },
];
