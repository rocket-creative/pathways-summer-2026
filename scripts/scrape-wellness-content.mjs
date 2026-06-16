// One-off scraper: pulls the real editorial copy from the live Pathways Within
// Wellness Squarespace site (pathwayswithinwellness.com) into a faithful source
// corpus under content/live-source/ with a wellness__ prefix. This mirrors
// scrape-live-content.mjs (the therapy site scraper) and is an archival
// extraction, not the production content. It preserves the live copy verbatim
// (including hyphens and dashes) so a separate copy pass can normalise it
// against the Eastern Keel copy rules without losing the source.
//
// Run: node scripts/scrape-wellness-content.mjs

import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://pathwayswithinwellness.com";
const OUT_DIR = new URL("../content/live-source/", import.meta.url);

// Every real (HTTP 200) page on the live wellness site, verified by crawling the
// sitemap, robots.txt, and all nav/menu/in-body links on 2026-06-16. The dead
// procedure links (laser-lipo, emsculpt, cavitation, hydrafacials, prp,
// keralase-hair-restoration, laser-hair-removal, book-now) return 404 and their
// content lives inside the category pages, so they are intentionally omitted.
// pathways-to redirects to /about. cart and search are system pages.
const PAGES = [
  "home",
  "about",
  "location",
  "contact",
  "payment-plans",
  "massages",
  "acupuncture",
  "energy-work",
  "reiki",
  "integrative-energy-therapy",
  "iv-vitamin-infusion-1",
  "cryotherapy-1",
  "body-sculpting",
  "face-treatments",
  "body-treatments",
  "hair",
  "bundles",
  "new-home-page",
  "news",
  "news/a-new-way-podcast-jr6cn",
  "news/telehealth-5yzlw",
];

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201d",
  ldquo: "\u201c",
};

function unescapeHtml(input) {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

function clean(fragment) {
  return unescapeHtml(fragment.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

// Drop the repeated header nav and footer boilerplate so we keep only the page body.
function bodyOnly(htmlDoc) {
  let doc = htmlDoc;
  const footer = doc.search(/<footer\b/);
  if (footer > 0) doc = doc.slice(0, footer);
  const main = doc.search(/<main\b/);
  if (main > 0) doc = doc.slice(main);
  return doc;
}

// Pull ordered headings/paragraphs/list items out of every Squarespace text block.
function extractBlocks(htmlDoc) {
  const lines = [];
  const blockRe = /<div class="sqs-html-content"[^>]*>([\s\S]*?)<\/div>/g;
  let block;
  while ((block = blockRe.exec(htmlDoc)) !== null) {
    const inner = block[1];
    const elRe = /<(h1|h2|h3|h4|p|li)[^>]*>([\s\S]*?)<\/\1>/g;
    let el;
    while ((el = elRe.exec(inner)) !== null) {
      const tag = el[1];
      const text = clean(el[2]);
      if (!text) continue;
      if (tag.startsWith("h")) lines.push(`\n## ${text}`);
      else if (tag === "li") lines.push(`- ${text}`);
      else lines.push(text);
    }
  }
  return lines;
}

// Decode a Squarespace data-* attribute (entity-encoded JSON) without
// double-decoding ampersands.
function decodeAttr(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&");
}

// Roster bios, location cards, and service cards live in UserItemsList blocks
// as JSON inside data-current-context. Pull title + description for each item.
function extractListItems(htmlDoc) {
  const lines = [];
  const attrRe = /data-current-context="([^"]*)"/g;
  let m;
  while ((m = attrRe.exec(htmlDoc)) !== null) {
    let parsed;
    try {
      parsed = JSON.parse(decodeAttr(m[1]));
    } catch {
      continue;
    }
    const items = parsed?.userItems;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const title = clean(String(item.title ?? ""));
      const desc = clean(String(item.description ?? ""));
      if (!title && !desc) continue;
      if (title) lines.push(`\n### ${title}`);
      if (desc) lines.push(desc);
    }
  }
  return lines;
}

// Squarespace page titles live in <meta property="og:title">.
function extractTitle(htmlDoc, slug) {
  const m = htmlDoc.match(/<meta property="og:title" content="([^"]*)"/);
  return m ? unescapeHtml(m[1]) : slug;
}

function extractMetaDescription(htmlDoc) {
  const m = htmlDoc.match(/<meta property="og:description" content="([^"]*)"/);
  return m ? unescapeHtml(m[1]) : "";
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const index = [];

  for (const slug of PAGES) {
    const url = `${ORIGIN}/${slug}`;
    let htmlDoc = "";
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (content-archive)" },
      });
      htmlDoc = await res.text();
    } catch (err) {
      console.error(`FAILED ${slug}: ${err.message}`);
      continue;
    }

    const title = extractTitle(htmlDoc, slug);
    const description = extractMetaDescription(htmlDoc);
    const body = bodyOnly(htmlDoc);
    const textLines = extractBlocks(body);
    const itemLines = extractListItems(body);
    const lines = itemLines.length
      ? [...textLines, "\n## Roster / cards", ...itemLines]
      : textLines;
    const wordCount = lines.join(" ").split(/\s+/).filter(Boolean).length;

    const fileName = `wellness__${slug.replace(/\//g, "__")}.md`;
    const fileBody = [
      "---",
      `source_url: ${url}`,
      `live_title: ${JSON.stringify(title)}`,
      `live_meta_description: ${JSON.stringify(description)}`,
      `scraped_at: ${new Date().toISOString()}`,
      `word_count: ${wordCount}`,
      "note: verbatim live copy, pre copy-rules pass",
      "---",
      "",
      `# ${slug}`,
      "",
      lines.length ? lines.join("\n\n") : "(no editorial text blocks found)",
      "",
    ].join("\n");

    await writeFile(new URL(fileName, OUT_DIR), fileBody, "utf8");
    index.push({ slug, wordCount, blocks: lines.length });
    const flag = lines.length ? "" : "  <-- EMPTY, check manually";
    console.log(`${slug.padEnd(34)} ${String(wordCount).padStart(5)} words${flag}`);
  }

  index.sort((a, b) => b.wordCount - a.wordCount);
  const indexMd = [
    "# Live wellness source corpus index",
    "",
    `Scraped from ${ORIGIN} on ${new Date().toISOString().slice(0, 10)}.`,
    "Verbatim live copy. Run a copy-rules pass before using in production.",
    "",
    "| Page | Words | Text blocks |",
    "| --- | --- | --- |",
    ...index.map((r) => `| ${r.slug} | ${r.wordCount} | ${r.blocks} |`),
    "",
    `Total words: ${index.reduce((s, r) => s + r.wordCount, 0)}`,
    "",
  ].join("\n");
  await writeFile(new URL("WELLNESS-INDEX.md", OUT_DIR), indexMd, "utf8");
  console.log(`\nWrote ${index.length} files to content/live-source/`);
}

run();
