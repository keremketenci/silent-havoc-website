"use client";

import { useState } from "react";

import { JoinUs } from "@/components/JoinUs/JoinUs";
import { JoinUsForm } from "@/components/JoinUs/JoinUsForm";

export default function JoinUsPage() {
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  return (
    <div className="flex flex-col gap-24 px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48">
      <section id="JoinUs">
        <JoinUs onApplyClick={setSelectedJobTitle} />
      </section>

      <section id="JoinUsForm">
        <JoinUsForm prefillSubject={selectedJobTitle} />
      </section>
    </div>
  );
}
