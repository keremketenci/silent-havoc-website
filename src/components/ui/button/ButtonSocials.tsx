"use client";

// translations
import { useTranslations } from "next-intl";

import React from "react";

// styles
import styles from "@/components/ui/button/ButtonSocials.module.css";

// components ui
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "sonner";

// components
import { Icon } from "@/components/Icon";

interface ButtonSocialsProps {
  link: string;
  logoClass?: string;
  icon: string;
  iconClass?: string;
  isActive: boolean;
  alt?: string;
}

export const ButtonSocials: React.FC<ButtonSocialsProps> = ({
  link,
  icon,
  iconClass,
  isActive,
  alt,
}) => {
  const t2 = useTranslations("Toast");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      if (link.includes("@")) {
        toast.success(`${t2("CardTeam.Email.Copy.success")}`);
      } else if (link.includes("#")) {
        toast.info(`${t2("CardTeam.Email.Copy.nolink")}`);
      }
    } catch (err) {
      toast.error(`${t2("CardTeam.Email.Copy.noemail")}`);
    }
  };

  const buttonClassName = `${isActive ? styles["ButtonSocials"] : ""} ${
    styles[`ButtonSocials-${icon}`]
  }`;

  return (
    <Button
      variant="ghost"
      className={`${buttonClassName} cursor-pointer md:cursor-none cursor-target`}
      title={link}
      onClick={() => {
        if (icon === "mail2") {
          handleCopy();
        } else {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <Icon
        name={icon}
        className={`md:cursor-none ${iconClass} ${styles["ButtonSocials-icon"]}`}
        alt={alt}
      />
    </Button>
  );
};
