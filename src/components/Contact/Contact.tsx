// translations
import { useTranslations } from "next-intl";

// components
import { ContactCard } from "@/components/Contact/ContactCard";
import { ContactForm } from "@/components/Contact/ContactForm";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <div>
      <p className="text-4xl font-bold text-center p-4 text-accent">{`${t(
        "title"
      )}`}</p>
      {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
                <div className="flex justify-center">
                    <ContactCard />
                </div>
                <ContactForm />
            </div> */}

      <div>
        <ContactForm />
      </div>
    </div>
  );
}
