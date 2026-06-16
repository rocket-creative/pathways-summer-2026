// Scans staged .md, .mdx, and .tsx files for Eastern Keel copy rule
// violations. Exits non zero to block the commit.
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

// Files exempt from the copy rules. These are never shipped website copy:
// content/live-source is a verbatim archive of the live site, and the
// repo-root specs, playbooks, and agent guides are internal engineering
// documentation where em dashes and the like are appropriate.
const EXEMPT = [
  /^content\/live-source\//,
  /^AGENTS\.md$/,
  /^CLAUDE\.md$/,
  /^README\.md$/i,
  /^\d{2}_.*\.md$/,
]

const staged = execSync('git diff --cached --name-only --diff-filter=ACM', {
  encoding: 'utf8',
})
  .split('\n')
  .filter((f) => /\.(md|mdx|tsx)$/.test(f))
  .filter((f) => !EXEMPT.some((re) => re.test(f)))

const filler =
  /\b(dive into|leverage|utilize|in order to|it'?s important to note|let'?s explore|seamless|robust|innovative)\b/i
const dash = /[\u2014\u2013]/
const phone = /\b\d{3}-\d{3}-\d{4}\b/

let failed = false
for (const file of staged) {
  let text
  try { text = readFileSync(file, 'utf8') } catch { continue }
  text.split('\n').forEach((line, i) => {
    if (/^\s*(import|export|\/\/|<|className=)/.test(line)) return
    if (dash.test(line)) { report(file, i + 1, 'em or en dash in copy', line); failed = true }
    if (filler.test(line)) { report(file, i + 1, 'AI filler phrase', line); failed = true }
    if (phone.test(line)) { report(file, i + 1, 'hyphenated phone number', line); failed = true }
  })
}
function report(file, line, why, text) { console.error(`BLOCKED ${file}:${line}  ${why}\n   ${text.trim()}`) }
if (failed) { console.error('\nCommit blocked by Eastern Keel copy rules. Fix the lines above.'); process.exit(1) }
