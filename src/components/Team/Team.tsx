// translations
import { useTranslations } from "next-intl";

// components
import { TeamMemberCard } from "@/components/Team/TeamMemberCard";
import SocialButtonsWrapper from "@/Wrappers/ButtonSocialsWrapper";

// data
import { teamLeaders } from "@/components/Team/data/teamLeaders";
import { teamMembers } from "@/components/Team/data/teamMembers";
import { Separator } from "@/components/shadcn/ui/separator";

export default function Team() {
  const t = useTranslations("Team");

  return (
    <div className="flex flex-col items-center space-y-12">
      {/* === Leaders Row === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 place-items-center">
        {teamLeaders.map((leader, idx) => {
          const isLeader = idx === 0;

          return (
            <div
              key={idx}
              className={`
          flex justify-center
          ${
            isLeader
              ? `
              sm:col-span-2          /* in 2-column layout, leader spans full row */
              lg:col-span-1 lg:col-start-2 /* centered in 3-column layout */
              lg:row-start-1         /* stay on the same row */
              lg:-translate-y-4      /* lift up */
            `
              : `
              lg:row-start-1         /* in 3 columns, keep on the same row */
            `
          }
        `}
            >
              <TeamMemberCard
                title={leader.name}
                description={`${t(leader.roleKey)}`} // & ${t(leader.inGameRoleKey)}
                contentImage={leader.image}
                footerText={<SocialButtonsWrapper socials={leader.socials} />}
              />
            </div>
          );
        })}
      </div>

      <Separator />

      {/* === Members Row === */}
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-4">
        {teamMembers.map((member, idx) => (
          <TeamMemberCard
            key={idx}
            title={member.name}
            description={`${t(member.roleKey)}`} //  & ${t(member.inGameRoleKey)}
            contentImage={member.image}
            footerText={<SocialButtonsWrapper socials={member.socials} />}
          />
        ))}
      </div>
    </div>
  );
}
