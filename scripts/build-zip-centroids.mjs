// Build the New York ZIP centroid table used by the provider directory's
// "find a provider near you" search. Source data is the us-zips package (a
// static US ZIP to lat/long map). We keep only New York ZIPs because nearest
// office resolution is in person and the five offices are all on Long Island;
// New Jersey, North Carolina, and Florida ZIPs route to telehealth by prefix
// and never need a centroid. Output is a compact { zip: [lat, lng] } map,
// rounded to four decimals, lazy loaded by the client only when a ZIP is typed.
//
// Run: node scripts/build-zip-centroids.mjs

import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const zips = require("us-zips");

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, "../public/data/ny-zip-centroids.json");

// New York ZIPs: leading three digits 100-149, plus the Holtsville (005) and
// Fishers Island (063) edge cases.
function isNewYorkZip(zip) {
  if (!/^\d{5}$/.test(zip)) return false;
  const n = Number(zip.slice(0, 3));
  if (n >= 100 && n <= 149) return true;
  return zip === "00501" || zip === "00544" || zip === "06390";
}

const round = (value) => Math.round(value * 1e4) / 1e4;

const table = {};
let count = 0;
for (const [zip, point] of Object.entries(zips)) {
  if (!isNewYorkZip(zip)) continue;
  if (typeof point?.latitude !== "number" || typeof point?.longitude !== "number") {
    continue;
  }
  table[zip] = [round(point.latitude), round(point.longitude)];
  count += 1;
}

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(table), "utf8");

console.log(`Wrote ${count} New York ZIP centroids to ${outPath}`);
