"use client";

import React, { useEffect, useState } from "react";
import Noise from "@/components/Noise";

const STORAGE_KEY = "pref-noise-enabled";
const EVENT_KEY = "pref:noise";

export function NoiseToggleGate() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Initial load from storage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        // default: enabled
        setEnabled(true);
        localStorage.setItem(STORAGE_KEY, "true");
      } else {
        setEnabled(raw === "true");
      }
    } catch {
      // If storage not available, keep default true
      setEnabled(true);
    }

    const onCustom = (e: Event) => {
      if (e instanceof CustomEvent) {
        const val = e.detail?.enabled;
        if (typeof val === "boolean") setEnabled(val);
      } else {
        // Fallback re-read from storage
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          setEnabled(raw !== "false");
        } catch {}
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setEnabled(e.newValue !== "false");
      }
    };

    window.addEventListener(EVENT_KEY, onCustom as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_KEY, onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-99">
      <Noise />
    </div>
  );
}

export function setNoisePreference(next: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? "true" : "false");
  } catch {}
  try {
    const ev = new CustomEvent(EVENT_KEY, { detail: { enabled: next } });
    window.dispatchEvent(ev);
  } catch {}
}
