// Crop the transparent padding around the brand logo so the badge fills its
// frame and reads large in the header. Trims based on the transparent border,
// then re-adds a small transparent margin so the outer ring is not clipped.
// The original is recoverable from git history.
//
// Run: node scripts/crop-logo.mjs

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const file = resolve(here, "../public/images/brand/logo.png");

const input = await sharp(file).toBuffer();

const before = await sharp(input).metadata();

// Trim the transparent border (alpha based, small threshold for soft edges).
const trimmed = await sharp(input).trim({ threshold: 10 }).toBuffer();
const trimmedMeta = await sharp(trimmed).metadata();

// Re-add a 3% transparent margin so the ring keeps a little breathing room and
// antialiased edges are not cut.
const pad = Math.round(Math.max(trimmedMeta.width, trimmedMeta.height) * 0.03);
await sharp(trimmed)
  .extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(file);

const after = await sharp(file).metadata();
console.log(
  `before ${before.width}x${before.height} -> trimmed ${trimmedMeta.width}x${trimmedMeta.height} -> final ${after.width}x${after.height}`,
);
