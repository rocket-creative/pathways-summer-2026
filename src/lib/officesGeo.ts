// Geography for the provider directory "find a provider near you" search.
// Office coordinates are the five Long Island therapy offices. ZIP resolution
// maps a typed ZIP to the nearest office (in person) or to telehealth when the
// ZIP is in a licensed state but out of driving range, and refuses ZIPs outside
// the four states the practice is licensed in (NY, NJ, NC, FL).

export type OfficeGeo = {
  slug: string;
  townName: string;
  lat: number;
  lng: number;
};

// Approximate coordinates for each office address. Precise enough to choose the
// nearest of five well separated offices; not used for mapping or directions.
export const officeGeo: OfficeGeo[] = [
  { slug: "smithtown", townName: "Smithtown", lat: 40.859, lng: -73.199 },
  { slug: "garden-city", townName: "Garden City", lat: 40.7268, lng: -73.637 },
  { slug: "massapequa", townName: "Massapequa", lat: 40.67, lng: -73.473 },
  { slug: "port-jefferson", townName: "Port Jefferson", lat: 40.945, lng: -73.066 },
  { slug: "rockville-centre", townName: "Rockville Centre", lat: 40.667, lng: -73.638 },
];

export type LicensedState = "NY" | "NJ" | "NC" | "FL";

export const licensedStateNames: Record<LicensedState, string> = {
  NY: "New York",
  NJ: "New Jersey",
  NC: "North Carolina",
  FL: "Florida",
};

// Great circle distance in miles between two coordinates.
export function haversineMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return earthRadiusMiles * 2 * Math.asin(Math.sqrt(a));
}

export type NearestOffice = {
  slug: string;
  townName: string;
  distanceMiles: number;
};

export function nearestOffice(lat: number, lng: number): NearestOffice {
  let best: NearestOffice | null = null;
  for (const office of officeGeo) {
    const distanceMiles = haversineMiles(lat, lng, office.lat, office.lng);
    if (!best || distanceMiles < best.distanceMiles) {
      best = { slug: office.slug, townName: office.townName, distanceMiles };
    }
  }
  // officeGeo is never empty, so best is always set.
  return best as NearestOffice;
}

// Resolve a ZIP to one of the four licensed states by prefix, or null when the
// ZIP is outside the licensed footprint. Ranges are the standard USPS leading
// three digit allocations for each state.
export function stateForZip(zip: string): LicensedState | null {
  const clean = zip.trim();
  if (!/^\d{5}$/.test(clean)) return null;
  const n = Number(clean.slice(0, 3));

  // New York: 100-149, plus the Holtsville (005) and Fishers Island (063) edge
  // cases that fall outside the main block.
  if (n >= 100 && n <= 149) return "NY";
  if (clean === "00501" || clean === "00544" || clean === "06390") return "NY";

  // New Jersey: 070-089.
  if (n >= 70 && n <= 89) return "NJ";

  // North Carolina: 270-289.
  if (n >= 270 && n <= 289) return "NC";

  // Florida: 320-349.
  if (n >= 320 && n <= 349) return "FL";

  return null;
}
