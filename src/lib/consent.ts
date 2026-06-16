// Shared consent model used by the banner and the analytics loader. No
// analytics or marketing runs until the visitor opts in. Global Privacy
// Control is honored as an opt out of everything beyond what is necessary.

export type Consent = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_KEY = "pw-consent-v1";
export const CONSENT_EVENT = "pw-consent-change";

export const denyAll: Consent = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

export const grantAll: Consent = {
  necessary: true,
  preferences: true,
  analytics: true,
  marketing: true,
};

export function gpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }),
  );
}
