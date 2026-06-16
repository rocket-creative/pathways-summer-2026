// Scans the live-source corpus for Eastern Keel copy-rule violations so a human
// can review every fix. We do not auto-rewrite clinical (YMYL) copy.
//
// Run: node scripts/check-copy-rules.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";

const DIR = new URL("../content/live-source/", import.meta.url);

const FILLER = [
  "dive into",
  "leverage",
  "utilize",
  "seamless",
  "robust",
  "innovative",
  "in order to",
  "it's important to note",
  "let's explore",
  "due to the fact that",
  "i'd be happy to",
];

const CHECKS = [
  {
    id: "em-dash",
    label: "Em dash (banned in copy)",
    re: /\u2014/g,
  },
  {
    id: "en-dash",
    label: "En dash (banned in copy)",
    re: /\u2013/g,
  },
  {
    id: "phone-hyphen",
    label: "Hyphenated phone number (use (631) 371 3825)",
    re: /\(?\d{3}\)?[\s.]?\d{3}-\d{4}/g,
  },
  {
    id: "hyphenated-word",
    label: "Hyphen in body copy (rephrase to avoid)",
    re: /[A-Za-z]+-[A-Za-z]+/g,
  },
  {
    id: "ai-filler",
    label: "AI filler phrase",
    re: new RegExp(`\\b(${FILLER.join("|")})\\b`, "gi"),
  },
];

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function isIgnoredLine(text, index) {
  // Skip the YAML frontmatter and the slug H1 (a URL identifier, not body copy).
  const lines = text.split("\n");
  const ln = lineNumber(text, index);
  const current = lines[ln - 1] ?? "";
  if (/^# \S/.test(current)) return true;
  if (lines[0] !== "---") return false;
  const close = lines.indexOf("---", 1);
  return ln <= close + 1;
}

async function run() {
  const files = (await readdir(DIR))
    .filter(
      (f) =>
        f.endsWith(".md") && f !== "INDEX.md" && f !== "COPY-VIOLATIONS.md"
    )
    .sort();

  const report = ["# Copy-rule violations in live source copy", ""];
  report.push(
    "Every item below is a place where the live copy breaks an Eastern Keel copy rule.",
    "Review and rephrase during the content pass. Hyphenated words usually need a",
    "rewrite (for example: one on one, non judgmental, evidence based). Em dashes",
    "become full stops or restructured sentences. The phone number is (631) 371 3825.",
    ""
  );

  const totals = {};
  for (const file of files) {
    const text = await readFile(new URL(file, DIR), "utf8");
    const hits = [];
    for (const check of CHECKS) {
      check.re.lastIndex = 0;
      let m;
      const seen = new Set();
      while ((m = check.re.exec(text)) !== null) {
        if (isIgnoredLine(text, m.index)) continue;
        const token = m[0];
        const key = `${check.id}:${token.toLowerCase()}`;
        if (seen.has(key)) continue;
        seen.add(key);
        hits.push({ label: check.label, token });
        totals[check.id] = (totals[check.id] ?? 0) + 1;
      }
    }
    if (!hits.length) continue;
    report.push(`## ${file}`, "");
    const byLabel = {};
    for (const h of hits) (byLabel[h.label] ??= []).push(h.token);
    for (const [label, tokens] of Object.entries(byLabel)) {
      const uniq = [...new Set(tokens)].slice(0, 40);
      report.push(`- ${label}: ${uniq.map((t) => `\`${t}\``).join(", ")}`);
    }
    report.push("");
  }

  report.push("## Totals (unique tokens per rule)", "");
  for (const check of CHECKS) {
    report.push(`- ${check.label}: ${totals[check.id] ?? 0}`);
  }
  report.push("");

  await writeFile(new URL("COPY-VIOLATIONS.md", DIR), report.join("\n"), "utf8");
  console.log("Wrote content/live-source/COPY-VIOLATIONS.md");
  console.log(totals);
}

run();
