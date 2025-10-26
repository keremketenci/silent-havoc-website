"use client";

import { useState, useEffect } from "react";
import TargetCursor from "@/components/TargetCursor/TargetCursor";

export const CursorWrapper = () => {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 768); // md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render only on md and above

  if (!isMdUp) return null;

  return <TargetCursor spinDuration={4} hideDefaultCursor={true} />;
};
