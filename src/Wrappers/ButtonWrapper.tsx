"use client";

import { ButtonSlideX } from "@/components/ui/button/ButtonSlideX";

import React from "react";

interface ButtonWrapperProps {
  variant?: "slideX" | "default";
  text: string;
  title?: string;
  scrollToId?: string;
  onClick?: () => void;
}

export function ButtonWrapper({
  variant,
  text,
  title,
  scrollToId,
  onClick,
  ...rest
}: ButtonWrapperProps) {
  switch (variant) {
    case "slideX":
      return <ButtonSlideX onClick={onClick} text={text} {...rest} />;
    default:
      return (
        <button onClick={onClick} {...rest}>
          {text}
        </button>
      );
  }
}
