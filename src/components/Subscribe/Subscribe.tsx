// translations
import { useTranslations } from "next-intl";

// components
import { SubscribeForm } from "@/components/Subscribe/SubscribeForm";

export function Subscribe() {

  return (
    <div className="mx-auto">
      <SubscribeForm />
    </div>
  );
}
