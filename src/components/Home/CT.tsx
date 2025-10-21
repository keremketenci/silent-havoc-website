"use client";

// components
import CircularText from "@/components/CircularText";

export function CT() {
  return (
    <div>
      <CircularText
        text="SILENT*HAVOC*"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class select-none md:cursor-none"
        logoSrc="/icons/silenthavoc/logo2.png"
        logoSize={100}
      />
    </div>
  );
}
