"use client";

import { Noise } from "@/components/effects/Noise";
import { useNoisePreference } from "@/hooks/useNoisePreference";

export function NoiseToggleGate() {
  const enabled = useNoisePreference();

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-99">
      <Noise />
    </div>
  );
}
