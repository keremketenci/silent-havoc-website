import "./globals.css";

import type { Metadata } from "next";
import { FuzzyText } from "@/components/effects/FuzzyText";

export const metadata: Metadata = {
  title: "404 | SILENT HAVOC",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body className="m-0 p-0 bg-black text-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-black">
          <FuzzyText baseIntensity={0.2} hoverIntensity={1.0} enableHover={true}>
            404
          </FuzzyText>
        </div>
      </body>
    </html>
  );
}
