"use client";

import { useState, useEffect } from "react";
import { TargetCursor } from "@/components/effects/TargetCursor";

// md breakpoint and a real mouse (not touch-only devices)
const QUERY = "(min-width: 768px) and (pointer: fine)";

export const CursorWrapper = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setEnabled(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return <TargetCursor spinDuration={4} hideDefaultCursor={true} />;
};
