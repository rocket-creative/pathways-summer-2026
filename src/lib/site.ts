// Sitewide constants. The single source of truth for brand identity used by
// metadata and JSON-LD. Phone is stored in copy format (no hyphens) plus a
// tel: friendly form.

export const site = {
  name: "Pathways Within",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pathwayswithin.me",
  phoneDisplay: "(631) 371 3825",
  phoneTel: "+16313713825",
  email: "Welcome@pathwayswithin.com",
  description:
    "Pathways Within is a 360 degree practice on Long Island combining mental health therapy and holistic wellness, with telehealth in New York, New Jersey, North Carolina, and Florida.",
  // The two pathways under the Pathways Within umbrella.
  wisdomDescription:
    "In person therapy across five Long Island offices and telehealth in New York, New Jersey, North Carolina, and Florida.",
  wellness: {
    name: "Pathways Within Wellness",
    url: "https://pathwayswithinwellness.com",
    email: "admin@pathwayswithinwellness.com",
    description:
      "Holistic, whole body care on Long Island: massage, acupuncture, energy work, IV vitamin infusion, body sculpting, and cryotherapy.",
  },
  // Social and directory profiles, left empty until confirmed. Never invented.
  sameAs: [] as string[],
  // The practice's existing HIPAA-compliant intake (the live site uses
  // SimplePractice and IvyPay). No PHI is collected in this app; the benefits
  // CTA routes here or to the phone. Set NEXT_PUBLIC_INTAKE_URL to the real
  // intake link to enable the prefilled "verify your benefits" button.
  intakeUrl: process.env.NEXT_PUBLIC_INTAKE_URL ?? null,
  telehealthStates: [
    "New York",
    "New Jersey",
    "North Carolina",
    "Florida",
  ] as const,
} as const;

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
