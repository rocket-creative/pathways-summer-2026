// Long Island towns within a realistic drive of an office. localDetail is the
// unique unit of value the doorway gate requires: a real, town specific note
// that ties the place to the office serving it. Each town links to the offices
// in range. Towns with no in-range office never get an indexable leaf.
//
// Drive notes are approximate orientation, not exact times. Confirm specifics
// with the practice before using them in paid local listings.

export type TownContent = {
  slug: string;
  name: string;
  county: "Nassau" | "Suffolk";
  localDetail: string;
  offices: string[];
  isOfficeTown?: boolean;
};

export const townContent: TownContent[] = [
  // Office towns (the five locations), enriched with local detail.
  {
    slug: "smithtown",
    name: "Smithtown",
    county: "Suffolk",
    isOfficeTown: true,
    localDetail:
      "Our Smithtown office sits on the Smithtown Bypass with dedicated parking, a short hop from the businesses and schools along Route 25. It anchors our care for central Suffolk County.",
    offices: ["smithtown"],
  },
  {
    slug: "garden-city",
    name: "Garden City",
    county: "Nassau",
    isOfficeTown: true,
    localDetail:
      "Our Garden City office on Franklin Avenue offers dedicated parking and easy access from the surrounding central Nassau communities. It is a central hub for clients across the county.",
    offices: ["garden-city"],
  },
  {
    slug: "massapequa",
    name: "Massapequa",
    county: "Nassau",
    isOfficeTown: true,
    localDetail:
      "Our Massapequa office on Merrick Road has dedicated parking and serves the South Shore communities of Nassau County, a short drive from Sunrise Highway.",
    offices: ["massapequa"],
  },
  {
    slug: "port-jefferson",
    name: "Port Jefferson",
    county: "Suffolk",
    isOfficeTown: true,
    localDetail:
      "Our Port Jefferson office on Main Street offers dedicated parking near the village and harbor, serving the North Shore of Suffolk County and the surrounding Three Village area.",
    offices: ["port-jefferson"],
  },
  {
    slug: "rockville-centre",
    name: "Rockville Centre",
    county: "Nassau",
    isOfficeTown: true,
    localDetail:
      "Our Rockville Centre office on North Park Avenue has dedicated parking close to the village center and the Long Island Rail Road, serving the South Shore of Nassau County.",
    offices: ["rockville-centre"],
  },

  // Suffolk, in range of Smithtown.
  {
    slug: "hauppauge",
    name: "Hauppauge",
    county: "Suffolk",
    localDetail:
      "Hauppauge clients reach our Smithtown office in minutes by way of the Smithtown Bypass, a convenient option for professionals working in the Hauppauge Industrial Park.",
    offices: ["smithtown"],
  },
  {
    slug: "commack",
    name: "Commack",
    county: "Suffolk",
    localDetail:
      "Commack sits just west of our Smithtown office, a short drive along Jericho Turnpike, with dedicated parking when you arrive.",
    offices: ["smithtown"],
  },
  {
    slug: "nesconset",
    name: "Nesconset",
    county: "Suffolk",
    localDetail:
      "Nesconset borders Smithtown directly, so our Smithtown office is one of the closest practices for residents, with parking on site.",
    offices: ["smithtown"],
  },
  {
    slug: "saint-james",
    name: "Saint James",
    county: "Suffolk",
    localDetail:
      "Saint James clients are a short drive north of our Smithtown office, an easy trip up Lake Avenue with dedicated parking on arrival.",
    offices: ["smithtown"],
  },
  {
    slug: "kings-park",
    name: "Kings Park",
    county: "Suffolk",
    localDetail:
      "Kings Park residents reach our Smithtown office in a short drive along Route 25A, with parking on site.",
    offices: ["smithtown"],
  },

  // Suffolk, in range of Port Jefferson.
  {
    slug: "setauket",
    name: "Setauket",
    county: "Suffolk",
    localDetail:
      "Setauket is part of the Three Village area neighboring Port Jefferson, putting our Main Street office within a short drive, with parking when you arrive.",
    offices: ["port-jefferson"],
  },
  {
    slug: "stony-brook",
    name: "Stony Brook",
    county: "Suffolk",
    localDetail:
      "Stony Brook clients, including students and staff near the university, reach our Port Jefferson office in a short drive along Route 25A.",
    offices: ["port-jefferson"],
  },
  {
    slug: "mount-sinai",
    name: "Mount Sinai",
    county: "Suffolk",
    localDetail:
      "Mount Sinai sits just east of Port Jefferson, so our Main Street office is one of the closest practices, with dedicated parking.",
    offices: ["port-jefferson"],
  },
  {
    slug: "miller-place",
    name: "Miller Place",
    county: "Suffolk",
    localDetail:
      "Miller Place residents reach our Port Jefferson office in a short drive west along Route 25A, with parking on site.",
    offices: ["port-jefferson"],
  },
  {
    slug: "selden",
    name: "Selden",
    county: "Suffolk",
    localDetail:
      "Selden clients reach our Port Jefferson office by a short drive north, a convenient option for residents and Suffolk County Community College students.",
    offices: ["port-jefferson"],
  },

  // Nassau South Shore, in range of Massapequa.
  {
    slug: "massapequa-park",
    name: "Massapequa Park",
    county: "Nassau",
    localDetail:
      "Massapequa Park borders our Massapequa office directly, making it one of the closest practices for residents, with dedicated parking on Merrick Road.",
    offices: ["massapequa"],
  },
  {
    slug: "seaford",
    name: "Seaford",
    county: "Nassau",
    localDetail:
      "Seaford sits just west of our Massapequa office, a short drive along Merrick Road or Sunrise Highway, with parking on site.",
    offices: ["massapequa"],
  },
  {
    slug: "wantagh",
    name: "Wantagh",
    county: "Nassau",
    localDetail:
      "Wantagh clients reach our Massapequa office in a short drive west, a convenient South Shore option with dedicated parking.",
    offices: ["massapequa", "rockville-centre"],
  },
  {
    slug: "amityville",
    name: "Amityville",
    county: "Suffolk",
    localDetail:
      "Amityville sits just east of Massapequa across the Suffolk line, putting our Massapequa office within a short drive along Merrick Road.",
    offices: ["massapequa"],
  },
  {
    slug: "farmingdale",
    name: "Farmingdale",
    county: "Nassau",
    localDetail:
      "Farmingdale residents reach our Massapequa office by a short drive south, a convenient option for the surrounding business community.",
    offices: ["massapequa"],
  },
  {
    slug: "bethpage",
    name: "Bethpage",
    county: "Nassau",
    localDetail:
      "Bethpage clients reach our Massapequa office in a short drive down Hicksville Road, with dedicated parking when you arrive.",
    offices: ["massapequa"],
  },

  // Nassau central, in range of Garden City.
  {
    slug: "mineola",
    name: "Mineola",
    county: "Nassau",
    localDetail:
      "Mineola borders Garden City, so our Franklin Avenue office is one of the closest practices, an easy trip for those near the county offices and Winthrop hospital campus.",
    offices: ["garden-city"],
  },
  {
    slug: "hempstead",
    name: "Hempstead",
    county: "Nassau",
    localDetail:
      "Hempstead sits just south of Garden City, putting our Franklin Avenue office within a short drive, with parking on site.",
    offices: ["garden-city"],
  },
  {
    slug: "westbury",
    name: "Westbury",
    county: "Nassau",
    localDetail:
      "Westbury clients reach our Garden City office in a short drive west, a convenient central Nassau option with dedicated parking.",
    offices: ["garden-city"],
  },
  {
    slug: "new-hyde-park",
    name: "New Hyde Park",
    county: "Nassau",
    localDetail:
      "New Hyde Park residents reach our Garden City office by a short drive, a convenient option for western Nassau and the nearby hospital campuses.",
    offices: ["garden-city"],
  },
  {
    slug: "east-meadow",
    name: "East Meadow",
    county: "Nassau",
    localDetail:
      "East Meadow clients reach our Garden City office in a short drive, a central Nassau community close to Eisenhower Park.",
    offices: ["garden-city"],
  },
  {
    slug: "franklin-square",
    name: "Franklin Square",
    county: "Nassau",
    localDetail:
      "Franklin Square residents reach our Garden City office by a short drive north, with dedicated parking when you arrive.",
    offices: ["garden-city"],
  },

  // Nassau South Shore, in range of Rockville Centre.
  {
    slug: "oceanside",
    name: "Oceanside",
    county: "Nassau",
    localDetail:
      "Oceanside borders Rockville Centre to the south, making our North Park Avenue office one of the closest practices, with parking on site.",
    offices: ["rockville-centre"],
  },
  {
    slug: "lynbrook",
    name: "Lynbrook",
    county: "Nassau",
    localDetail:
      "Lynbrook sits just west of Rockville Centre, a short drive to our North Park Avenue office near the Long Island Rail Road.",
    offices: ["rockville-centre"],
  },
  {
    slug: "baldwin",
    name: "Baldwin",
    county: "Nassau",
    localDetail:
      "Baldwin clients reach our Rockville Centre office in a short drive east along Merrick Road, with dedicated parking.",
    offices: ["rockville-centre"],
  },
  {
    slug: "freeport",
    name: "Freeport",
    county: "Nassau",
    localDetail:
      "Freeport residents reach our Rockville Centre office by a short drive, a convenient South Shore option with parking on site.",
    offices: ["rockville-centre"],
  },
  {
    slug: "merrick",
    name: "Merrick",
    county: "Nassau",
    localDetail:
      "Merrick sits between our Rockville Centre and Massapequa offices, giving South Shore clients two convenient choices, both with dedicated parking.",
    offices: ["rockville-centre", "massapequa"],
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    county: "Nassau",
    localDetail:
      "Long Beach clients reach our Rockville Centre office by a short drive north over the bridge, a convenient option for the barrier island community.",
    offices: ["rockville-centre"],
  },
  {
    slug: "valley-stream",
    name: "Valley Stream",
    county: "Nassau",
    localDetail:
      "Valley Stream residents reach our Rockville Centre office in a short drive east, a convenient western South Shore option with parking on site.",
    offices: ["rockville-centre"],
  },
];
