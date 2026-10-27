// translations
import { useTranslations } from "next-intl";

// components
import { ContactForm } from "@/components/sections/Contact/ContactForm";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <div>
      <h1 className="text-4xl font-bold text-center p-4 text-accent">{`${t(
        "title"
      )}`}</h1>
      {/* import { ContactCard } from "@/components/sections/Contact/ContactCard";
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
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
