"use client";

import { createContext, useContext, useState } from "react";

interface JoinUsContextValue {
  subject: string;
  apply: (subject: string) => void;
}

const JoinUsContext = createContext<JoinUsContextValue | null>(null);

// Shares the selected job between the job cards and the application form
export function JoinUsProvider({ children }: { children: React.ReactNode }) {
  const [subject, setSubject] = useState("");

  const apply = (next: string) => {
    setSubject(next);
    document
      .getElementById("JoinUsForm")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <JoinUsContext.Provider value={{ subject, apply }}>
      {children}
    </JoinUsContext.Provider>
  );
}

export function useJoinUs() {
  const ctx = useContext(JoinUsContext);
  if (!ctx) throw new Error("useJoinUs must be used inside <JoinUsProvider>");
  return ctx;
}
