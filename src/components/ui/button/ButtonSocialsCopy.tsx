"use client";

// translations
import { useTranslations } from "next-intl";

// components ui
import { toast } from "sonner";

interface ButtonSocialsCopyProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

// Copies an e-mail address to the clipboard instead of opening a link
export function ButtonSocialsCopy({
  value,
  className,
  children,
}: ButtonSocialsCopyProps) {
  const t2 = useTranslations("Toast");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      if (value.includes("@")) {
        toast.success(`${t2("CardTeam.Email.Copy.success")}`);
      } else if (value.includes("#")) {
        toast.info(`${t2("CardTeam.Email.Copy.nolink")}`);
      }
    } catch {
      toast.error(`${t2("CardTeam.Email.Copy.noemail")}`);
    }
  };

  return (
    <button type="button" className={className} title={value} onClick={handleCopy}>
      {children}
    </button>
  );
}
