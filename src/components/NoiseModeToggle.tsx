"use client";

import * as React from "react";
import { Switch } from "@/components/shadcn/ui/switch";
import { Label } from "@/components/shadcn/ui/label";
import { setNoisePreference } from "@/components/NoiseToggleGate";

type Props = {
  id?: string;
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
  label?: string;
};

const STORAGE_KEY = "pref-noise-enabled";
const EVENT_KEY = "pref:noise";

export function NoiseModeToggle({
  id,
  className,
  size = "md",
  showLabel = true,
  label = "Noise",
}: Props) {
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    // Initial state from storage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        setChecked(true);
        localStorage.setItem(STORAGE_KEY, "true");
      } else {
        setChecked(raw === "true");
      }
    } catch {
      setChecked(true);
    }

    // Listen to custom event and storage changes
    const onCustom = (e: Event) => {
      if (e instanceof CustomEvent) {
        const val = e.detail?.enabled;
        if (typeof val === "boolean") setChecked(val);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setChecked(e.newValue !== "false");
    };
    window.addEventListener(EVENT_KEY, onCustom as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_KEY, onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <div className={className}>
      <div className="flex flex-row items-center gap-2">
        {showLabel && (
          <Label htmlFor={id} className="md:cursor-none text-xs text-muted-foreground">
            {label}
          </Label>
        )}
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={(next) => {
            setChecked(next);
            setNoisePreference(next);
          }}
          className="cursor-none"
        />
      </div>
    </div>
  );
}

export default NoiseModeToggle;
