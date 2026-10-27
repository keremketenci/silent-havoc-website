// translations
import { useTranslations } from "next-intl";

// components ui
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import { Separator } from "@/components/shadcn/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactCard() {
  const t = useTranslations("Contact");

  return (
    <div className="flex flex-col gap-8">
      <CardHighlighted
        cardType="Horizontal"
        cardClass={`bg-card text-white border border-slate-800 flex flex-row space-x-2 items-center px-0 py-2 md:p-4`}
        icon={<Mail size={64} />}
        // content={<div>{`${t('Card.Content.Mail.contact')}@${t('Card.Content.Mail.domain')}`}</div>}
        content="silent.havoc.istanbul@gmail.com"
        contentClass="text-2xl break-all"
        description={`${t("Card.Description.mail")}`}
        descriptionClass="text-lg ml-6"
      />

      <CardHighlighted
        cardType="Horizontal"
        cardClass={`bg-card text-white border border-slate-800 flex flex-row space-x-2 items-center px-0 py-2 md:p-4`}
        icon={<Phone size={64} />}
        content={`${t("Card.Content.phone")}`}
        contentClass="text-2xl"
        description={`${t("Card.Description.phone")}`}
        descriptionClass="text-lg ml-6"
      />

      <CardHighlighted
        cardType="Horizontal"
        cardClass={`bg-card text-white border border-slate-800 flex flex-row space-x-2 items-center px-0 py-2 md:p-4`}
        icon={<MapPin size={64} />}
        content={`${t("Card.Content.address")}`}
        contentClass="text-2xl"
        description={`${t("Card.Description.address")}`}
        descriptionClass="text-lg ml-6"
      />

      <Separator className="bg-white" />

      <div className="flex flex-wrap justify-center gap-y-2 sm:gap-x-0">
        <ButtonSocials
          link=""
          icon="instagram"
          iconClass="w-8"
          isActive={true}
        />
        <ButtonSocials
          link=""
          icon="linkedin"
          iconClass="w-6"
          isActive={true}
        />
        <ButtonSocials link="" icon="discord" iconClass="w-8" isActive={true} />
        <ButtonSocials link="" icon="github" iconClass="w-8" isActive={true} />
        <ButtonSocials link="" icon="youtube" iconClass="w-8" isActive={true} />
        <ButtonSocials link="" icon="x" iconClass="w-8" isActive={true} />
      </div>
      <Separator className="bg-white" />
    </div>
  );
}
