"use client";

import { useEffect, useState } from "react";
import {
  type Consent,
  denyAll,
  grantAll,
  gpcEnabled,
  writeConsent,
} from "@/lib/consent";
import { useConsent } from "@/components/useConsent";

// Granular consent banner. Nothing beyond necessary is enabled by default, no
// boxes are pre-checked, and Global Privacy Control is honored automatically.
export function ConsentBanner() {
  const consent = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Honor GPC as a clear opt out signal. Writing to the external consent store
  // (not React state) hides the banner without a cascading render.
  useEffect(() => {
    if (!consent && gpcEnabled()) writeConsent(denyAll);
  }, [consent]);

  if (consent) return null;

  function save(choice: Consent) {
    writeConsent(choice);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-heading"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-background pb-safe-bottom md:bottom-4 md:left-auto md:right-4 md:max-w-[var(--read-md)] md:border md:pb-0"
    >
      <div className="px-md py-md">
        <h2
          id="consent-heading"
          className="text-sm font-medium uppercase tracking-[0.08em]"
        >
          Your privacy
        </h2>
        <p className="mt-sm text-sm text-text-secondary">
          We use only what is necessary to run this site. With your consent we
          also measure how the site is used. You choose what to allow.
        </p>

        {showDetails ? (
          <fieldset className="mt-md space-y-sm text-sm">
            <legend className="sr-only">Consent categories</legend>
            <label className="flex items-center gap-sm text-text-secondary">
              <input type="checkbox" checked readOnly aria-disabled="true" />
              Necessary (always on)
            </label>
            <label className="flex items-center gap-sm">
              <input
                type="checkbox"
                checked={preferences}
                onChange={(event) => setPreferences(event.target.checked)}
              />
              Preferences
            </label>
            <label className="flex items-center gap-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
              Analytics
            </label>
            <label className="flex items-center gap-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
              Marketing
            </label>
          </fieldset>
        ) : null}

        <div className="mt-md flex flex-wrap items-center gap-md text-sm uppercase tracking-[0.08em]">
          <button
            type="button"
            onClick={() => save(grantAll)}
            className="bg-text px-md py-sm text-background hover:[background-color:color-mix(in_oklch,var(--color-text)_90%,black)]"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => save(denyAll)}
            className="border border-text px-md py-sm hover:bg-text hover:text-background"
          >
            Reject non-essential
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() =>
                save({ necessary: true, preferences, analytics, marketing })
              }
              className="hover:text-accent"
            >
              Save choices
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="hover:text-accent"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
