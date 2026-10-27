"use client";

import { ButtonSlideX } from "@/components/ui/button/ButtonSlideX";
import { useJoinUs } from "@/components/sections/JoinUs/JoinUsContext";

interface ApplyButtonProps {
  text: string;
  subject: string;
}

export function ApplyButton({ text, subject }: ApplyButtonProps) {
  const { apply } = useJoinUs();
  return <ButtonSlideX text={text} onClick={() => apply(subject)} />;
}
