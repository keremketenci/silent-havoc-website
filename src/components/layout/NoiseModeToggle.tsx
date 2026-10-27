"use client";

import * as React from "react";
import { Switch } from "@/components/shadcn/ui/switch";
import { Label } from "@/components/shadcn/ui/label";
import {
  setNoisePreference,
  useNoisePreference,
} from "@/hooks/useNoisePreference";

type Props = {
  id?: string;
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
  label?: string;
};

export function NoiseModeToggle({
  id,
  className,
  showLabel = true,
  label = "Noise",
}: Props) {
  const checked = useNoisePreference();

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
          onCheckedChange={setNoisePreference}
          className="cursor-none"
        />
      </div>
    </div>
  );
}

