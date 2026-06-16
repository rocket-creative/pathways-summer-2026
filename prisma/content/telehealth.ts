// Telehealth state content and metros. The licensure fence is absolute: only
// New York, New Jersey, North Carolina, and Florida, the states Pathways Within
// clinicians are licensed in. Metros are gated to real population centers inside
// each licensed state. Never add a state the practice is not licensed in.

export type StateContent = {
  slug: string;
  summary: string;
  contentApproved: boolean;
  metros: { slug: string; name: string }[];
};

export const stateContent: StateContent[] = [
  {
    slug: "new-york",
    summary:
      "Pathways Within clinicians are licensed in New York and offer secure video therapy to residents across the state, alongside our five Long Island offices. Sessions run on a private, encrypted platform, and we confirm your benefits before you begin.",
    contentApproved: true,
    metros: [
      { slug: "new-york-city", name: "New York City" },
      { slug: "long-island", name: "Long Island" },
      { slug: "buffalo", name: "Buffalo" },
      { slug: "rochester", name: "Rochester" },
      { slug: "albany", name: "Albany" },
      { slug: "syracuse", name: "Syracuse" },
    ],
  },
  {
    slug: "new-jersey",
    summary:
      "Pathways Within clinicians are licensed in New Jersey and provide secure video therapy to residents across the state. Sessions run on a private, encrypted platform, and we confirm your benefits before your first appointment.",
    contentApproved: true,
    metros: [
      { slug: "newark", name: "Newark" },
      { slug: "jersey-city", name: "Jersey City" },
      { slug: "trenton", name: "Trenton" },
      { slug: "princeton", name: "Princeton" },
    ],
  },
  {
    slug: "north-carolina",
    summary:
      "Pathways Within clinicians are licensed in North Carolina and offer secure video therapy to residents across the state. Sessions run on a private, encrypted platform, and we confirm your benefits before you begin care.",
    contentApproved: true,
    metros: [
      { slug: "charlotte", name: "Charlotte" },
      { slug: "raleigh", name: "Raleigh" },
      { slug: "durham", name: "Durham" },
      { slug: "greensboro", name: "Greensboro" },
      { slug: "asheville", name: "Asheville" },
    ],
  },
  {
    slug: "florida",
    summary:
      "Pathways Within clinicians are licensed in Florida and provide secure video therapy to residents across the state. Sessions run on a private, encrypted platform, and we confirm your benefits before your first session.",
    contentApproved: true,
    metros: [
      { slug: "miami", name: "Miami" },
      { slug: "orlando", name: "Orlando" },
      { slug: "tampa", name: "Tampa" },
      { slug: "jacksonville", name: "Jacksonville" },
      { slug: "fort-lauderdale", name: "Fort Lauderdale" },
    ],
  },
];
