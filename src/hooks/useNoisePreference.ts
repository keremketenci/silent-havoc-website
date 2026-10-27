"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "pref-noise-enabled";
const EVENT_KEY = "pref:noise";

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(EVENT_KEY, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_KEY, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  try {
    // default: enabled
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch {
    return true;
  }
}

const getServerSnapshot = () => true;

// Noise on/off preference, persisted in localStorage and synced across tabs/components
export function useNoisePreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setNoisePreference(next: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? "true" : "false");
  } catch {}
  window.dispatchEvent(new Event(EVENT_KEY));
}
