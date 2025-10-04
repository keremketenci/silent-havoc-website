"use client";

import { ButtonSocials } from "@/components/ui/button/ButtonSocials";

interface Social {
  link: string;
  icon: string;
}

interface SocialButtonsWrapperProps {
  socials: Social[];
}


export default function SocialButtonsWrapper({ socials }: SocialButtonsWrapperProps) {
  return (
    <div>
      {socials.map((s, i) => (
        <ButtonSocials
          key={i}
          link={s.link}
          icon={s.icon}
          iconClass="w-8"
          isActive={false}
        />
      ))}
    </div>
  );
}
