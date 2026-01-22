// translations
import { useTranslations } from "next-intl";

// components
import { TeamMemberCard } from "@/components/Team/TeamMemberCard";
import SocialButtonsWrapper from "@/Wrappers/ButtonSocialsWrapper";
import { Separator } from "@/components/shadcn/ui/separator";

// data
import { teamLeaders } from "@/components/Team/data/teamLeaders";
import { teamMembers } from "@/components/Team/data/teamMembers";

export default function Team() {
  const t = useTranslations();

  // 🔹 Sadece gerçek roller için
  const roleKeyToTranslation = (key: string) => {
    const role = key.split(".").pop();
    return `Team.Roles.${role}`;
  };

  // 🔹 In-game role / nickname için (çeviri YOK)
  const cleanLabel = (key: string) =>
    key.split(".").pop() ?? key;

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
                      sm:col-span-2
                      lg:col-span-1 lg:col-start-2
                      lg:row-start-1
                      lg:-translate-y-4
                    `
                    : `
                      lg:row-start-1
                    `
                }
              `}
            >
              <TeamMemberCard
                title={leader.name}
                description={
                  <div className="flex flex-col items-center text-center">
                    {/* ✅ ÇEVİRİLİ ROL */}
                    <span className="font-medium">
                      {t(roleKeyToTranslation(leader.roleKey))}
                    </span>

                    {/* ✅ IN-GAME ROLE / NICKNAME */}
                    <span className="text-sm">
                      {cleanLabel(leader.inGameRoleKey)}
                    </span>
                  </div>
                }
                contentImage={leader.image}
                footerText={
                  <SocialButtonsWrapper socials={leader.socials} />
                }
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
            description={
              <div className="flex flex-col items-center text-center">
                <span className="font-medium">
                  {t(roleKeyToTranslation(member.roleKey))}
                </span>
                <span className="text-sm">
                  {cleanLabel(member.inGameRoleKey)}
                </span>
              </div>
            }
            contentImage={member.image}
            footerText={
              <SocialButtonsWrapper socials={member.socials} />
            }
          />
        ))}
      </div>
    </div>
  );
}
