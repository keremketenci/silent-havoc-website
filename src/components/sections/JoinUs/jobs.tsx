import { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { ApplyButton } from "@/components/sections/JoinUs/ApplyButton";

export interface Job {
  title: string;
  description: ReactNode;
  content: string;
  footer: ReactNode;
}

const createJob = (t: (key: string) => string, titleKey: string): Job => ({
  title: t(titleKey),
  description: (
    <div className="flex items-center">
      <Icon name="clock" className="w-6 mr-1" />
      <span>{t("Job.Time.hybrid")}</span>
    </div>
  ),
  content: `${t("Job.content")}.`,
  footer: (
    <ApplyButton
      text={t("Button.apply")}
      subject={`${t("Form.subject")} ||  ${t("Form.role")}: ${t(titleKey)}`}
    />
  ),
});

export const getJobs = (t: (key: string) => string): Job[] => [
  createJob(t, "Job.Title.member"),
  createJob(t, "Job.Title.member"),
];
