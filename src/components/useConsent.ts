"use client";

import { useSyncExternalStore } from "react";
import { type Consent, CONSENT_EVENT, readConsent } from "@/lib/consent";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// Subscribes components to the visitor's consent choice. Returns null until a
// choice is made. useSyncExternalStore handles the server/client snapshot
// difference (consent lives in localStorage) without a hydration mismatch.
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}
