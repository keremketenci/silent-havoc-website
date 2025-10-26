import React from "react";
import Image from "next/image";

// components ui
import { LoaderGlitch } from "@/components/ui/loader/LoaderGlitch";

interface LoadingProps {
  text: string;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/50`}
    >
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white/90 dark:bg-black/75">
        {/* <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" /> */}
        <Image
          src="/icons/silenthavoc/logo-colored.png"
          alt="Logo"
          width="400"
          height="400"
          className="pointer-events-none select-none"
        />
        <LoaderGlitch text={text} />
      </div>
    </div>
  );
};
