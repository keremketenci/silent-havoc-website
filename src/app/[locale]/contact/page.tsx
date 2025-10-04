import { Contact } from "@/components/Contact/Contact";
import { Subscribe } from "@/components/Subscribe/Subscribe";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-y-24 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48">
      <section id="Contact">
        <Contact />
      </section>

      <section id="Subscribe">
        <div>
          <Subscribe />
        </div>
      </section>
    </div>
  );
}
