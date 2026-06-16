// Base taxonomy and office data, the single source of truth shared by the
// database seed (prisma/seed.ts) and the static data layer the app reads at
// build time (src/lib/static-db.ts). Editing here updates both.

export type OfficeSeed = {
  slug: string;
  townName: string;
  displayName: string;
  addressLine: string;
  suite: string | null;
  city: string;
  state: string;
  zip: string;
  sortOrder: number;
  napVerified: boolean;
  napNote: string | null;
  county: "Nassau" | "Suffolk";
};

// Five Long Island therapy offices. NAP values are taken from the live site.
// Where the source site disagreed with itself, napVerified is false and the
// conflict is recorded in napNote for client confirmation. Nothing is invented.
export const offices: OfficeSeed[] = [
  {
    slug: "smithtown",
    townName: "Smithtown",
    displayName: "Smithtown Therapy Office",
    addressLine: "496 Smithtown Bypass",
    suite: "Suite 203",
    city: "Smithtown",
    state: "NY",
    zip: "11787",
    sortOrder: 1,
    napVerified: true,
    napNote: null,
    county: "Suffolk",
  },
  {
    slug: "garden-city",
    townName: "Garden City",
    displayName: "Garden City Therapy Office",
    addressLine: "520 Franklin Ave",
    suite: "Suite L1",
    city: "Garden City",
    state: "NY",
    zip: "11520",
    sortOrder: 2,
    napVerified: false,
    napNote:
      "Needs client confirmation: seeded to match the live therapy site (520 Franklin Ave, Suite L1, 11520), but 11520 is geographically Hempstead's ZIP, not Garden City (11530). The sister wellness site lists a different address entirely (647 Franklin Ave, Lower Level, 11530).",
    county: "Nassau",
  },
  {
    slug: "massapequa",
    townName: "Massapequa",
    displayName: "Massapequa Therapy Office",
    addressLine: "4160 Merrick Rd",
    suite: "Suite 5 and Suite 7",
    city: "Massapequa",
    state: "NY",
    zip: "11758",
    sortOrder: 3,
    napVerified: true,
    napNote: null,
    county: "Nassau",
  },
  {
    slug: "port-jefferson",
    townName: "Port Jefferson",
    displayName: "Port Jefferson Therapy Office",
    addressLine: "1227 Main Street",
    suite: "Suite 101",
    city: "Port Jefferson",
    state: "NY",
    zip: "11777",
    sortOrder: 4,
    napVerified: true,
    napNote: null,
    county: "Suffolk",
  },
  {
    slug: "rockville-centre",
    townName: "Rockville Centre",
    displayName: "Rockville Centre Therapy Office",
    addressLine: "53 N Park Ave",
    suite: "Suite 203",
    city: "Rockville Centre",
    state: "NY",
    zip: "11570",
    sortOrder: 5,
    napVerified: true,
    napNote: null,
    county: "Nassau",
  },
];

// Accepted payers, from the FAQ page. outOfNetwork marks those flagged with an
// asterisk on the source site.
export const insurers: { name: string; outOfNetwork: boolean }[] = [
  { name: "Aetna", outOfNetwork: false },
  { name: "Cigna", outOfNetwork: false },
  { name: "Optum", outOfNetwork: false },
  { name: "UHC", outOfNetwork: false },
  { name: "Oxford", outOfNetwork: false },
  { name: "UMR", outOfNetwork: false },
  { name: "Oscar", outOfNetwork: false },
  { name: "1199", outOfNetwork: false },
  { name: "Meritain", outOfNetwork: false },
  { name: "Magnacare", outOfNetwork: true },
  { name: "Humana", outOfNetwork: false },
  { name: "Medicare", outOfNetwork: false },
  { name: "NYSHIP", outOfNetwork: true },
  { name: "Student Resource", outOfNetwork: false },
  { name: "Allied Benefit", outOfNetwork: false },
  { name: "ComPsych", outOfNetwork: false },
  { name: "VA Community Care", outOfNetwork: false },
  { name: "MVP", outOfNetwork: false },
  { name: "Northwell Brighton Health", outOfNetwork: false },
];

// Taxonomy labels. Clinical content is layered on from the content modules.
export const conditionLabels: [string, string][] = [
  ["anxiety", "Anxiety"],
  ["depression", "Depression"],
  ["ptsd", "PTSD"],
  ["complex-ptsd", "Complex PTSD"],
  ["adhd", "ADHD"],
  ["bipolar-disorder", "Bipolar disorder"],
  ["bpd", "Borderline personality disorder"],
  ["ocd", "OCD"],
  ["trauma", "Trauma"],
  ["grief", "Grief"],
  ["substance-use", "Substance use"],
  ["eating-disorders", "Eating disorders"],
  ["panic-and-phobias", "Panic and phobias"],
  ["insomnia", "Insomnia"],
  ["self-harm", "Self harm"],
  ["domestic-violence-recovery", "Domestic violence recovery"],
  ["life-transitions", "Life transitions"],
];

export const modalityLabels: [string, string][] = [
  ["emdr", "EMDR"],
  ["cbt", "CBT"],
  ["dbt", "DBT"],
  ["ifs", "Internal Family Systems"],
  ["somatic-therapy", "Somatic therapy"],
  ["hypnotherapy", "Hypnotherapy"],
  ["gottman-couples", "Gottman couples therapy"],
  ["play-therapy", "Play therapy"],
  ["talk-therapy", "Talk therapy"],
  ["light-therapy", "Light therapy"],
  ["cognitive-processing", "Cognitive processing therapy"],
];

export const populationLabels: [string, string][] = [
  ["children", "Children"],
  ["teens", "Teens"],
  ["adults", "Adults"],
  ["couples", "Couples"],
  ["families", "Families"],
  ["veterans", "Veterans"],
  ["first-responders", "First responders"],
  ["college-students", "College students"],
  ["lgbtqia", "LGBTQIA+"],
  ["professionals", "Professionals"],
];

export const stateLabels: [string, string, string][] = [
  ["new-york", "New York", "NY"],
  ["new-jersey", "New Jersey", "NJ"],
  ["north-carolina", "North Carolina", "NC"],
  ["florida", "Florida", "FL"],
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
