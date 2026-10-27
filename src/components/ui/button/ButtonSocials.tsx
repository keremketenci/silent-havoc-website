// styles
import styles from "@/components/ui/button/ButtonSocials.module.css";

// components ui
import { buttonVariants } from "@/components/shadcn/ui/button";
import { ButtonSocialsCopy } from "@/components/ui/button/ButtonSocialsCopy";
import { cn } from "@/lib/utils";

// components
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/data/icons";

interface ButtonSocialsProps {
  link: string;
  logoClass?: string;
  icon: IconName;
  iconClass?: string;
  isActive: boolean;
  alt?: string;
}

// Server component: renders a real <a href> so the link is crawlable and works
// without JavaScript. Only the "copy e-mail" variant needs client-side code.
export function ButtonSocials({
  link,
  icon,
  iconClass,
  isActive,
  alt,
}: ButtonSocialsProps) {
  const className = cn(
    buttonVariants({ variant: "ghost" }),
    isActive && styles["ButtonSocials"],
    styles[`ButtonSocials-${icon}`],
    "cursor-pointer md:cursor-none cursor-target"
  );

  const iconElement = (
    <Icon
      name={icon}
      className={`md:cursor-none ${iconClass} ${styles["ButtonSocials-icon"]}`}
      alt={alt}
    />
  );

  if (icon === "mail2") {
    return (
      <ButtonSocialsCopy value={link} className={className}>
        {iconElement}
      </ButtonSocialsCopy>
    );
  }

  // Placeholder entries ("#" or empty) have no profile to link to yet
  if (!link || link === "#") {
    return (
      <span className={className} aria-disabled="true">
        {iconElement}
      </span>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={link}
      aria-label={alt ?? icon}
      className={className}
    >
      {iconElement}
    </a>
  );
}
