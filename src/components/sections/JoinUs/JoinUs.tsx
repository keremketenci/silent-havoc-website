// translations
import { useTranslations } from "next-intl";

// components
import { JoinUsCard } from "@/components/sections/JoinUs/JoinUsCard";
import { JoinUsCarousel } from "@/components/sections/JoinUs/JoinUsCarousel";

// data
import { getJobs } from "@/components/sections/JoinUs/jobs";

export function JoinUs() {
  const t = useTranslations("JoinUs");
  const jobs = getJobs(t);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center p-4 text-accent">{`${t("title")}`}</h1>

      <div className="block xl:hidden">
        <JoinUsCarousel jobs={jobs} />
      </div>

      <div className="hidden xl:block">
        <div className="flex gap-8">
          <JoinUsCard jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
