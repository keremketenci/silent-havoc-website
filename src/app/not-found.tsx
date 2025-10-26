"use client";

import { useEffect } from "react";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  useEffect(() => {
    // Set Body and HTML styles to black
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;

    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";

    return () => {
      // Restore original styles when leaving the page
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "black",
      }}
    >
      <FuzzyText baseIntensity={0.2} hoverIntensity={1.0} enableHover={true}>
        404
      </FuzzyText>
    </div>
  );
}
