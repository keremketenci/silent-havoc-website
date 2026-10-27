import { JoinUs } from "@/components/sections/JoinUs/JoinUs";
import { JoinUsForm } from "@/components/sections/JoinUs/JoinUsForm";
import { JoinUsProvider } from "@/components/sections/JoinUs/JoinUsContext";

export function JoinUsSection() {
  return (
    <JoinUsProvider>
      <section id="JoinUs">
        <JoinUs />
      </section>

      <section id="JoinUsForm">
        <JoinUsForm />
      </section>
    </JoinUsProvider>
  );
}
