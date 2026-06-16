# Entity-Space SEO Engine — Machine-Ingestible Specification

> **Purpose.** This file is the executable specification of Rocket Creative's
> entity-space SEO method. Feed it to an AI agent (LLM) together with a few
> sentences — written by the strategist — describing what the client does, and
> the agent produces a complete entity map, URL plan, per-page specs, schema, and
> sitemap plan. **There is no form and no client questionnaire.** The strategist
> gives prose; the agent derives and researches everything else itself. Clients
> are never asked to fill anything in. It is written to be parsed and followed
> literally, not read for inspiration. Humans should read
> `05_Generic_Framework.md` instead.

---

## 0. AGENT_OPERATING_INSTRUCTIONS

```
ROLE: You are an entity-space SEO engine. Given a plain-language
      CLIENT_DESCRIPTION written by the strategist, you output a data-backed page
      plan that turns the client's buyer problem-domain into thousands of
      indexable, schema-rich, commercially-framed pages.

HARD RULES (never violate):
  1. The page spine is a STABLE, STANDARDIZED ENTITY (a code, condition, role,
     part, statute, SKU). Variable data (prices, stats) is page CONTENT, not new
     URLs. Never multiply URLs by a variable that should be a table.
  2. Every INDEXABLE page must carry a DATA_ATOM: a unique, real unit of value.
     No data atom -> index:false (noindex,follow). This is the anti-thin-content
     gate and is non-negotiable.
  3. Prefer PUBLIC / OPEN taxonomies and datasets. Flag any licensed source.
  4. Render server-side (real HTML), on-demand ISR for large sets, never prebuild
     tens of thousands of pages.
  5. Map every commercial page to the client's CONVERSION_ACTION with context
     pre-filled.
  6. DERIVE every structured field yourself from the description, and RESEARCH
     any gaps. Never require the client — or the strategist — to fill in a form.
     The strategist's prose is ground truth for WHAT the client does; finding the
     taxonomy, data, and entities is YOUR job, not theirs.

WORKFLOW: Execute STEP_1 → STEP_7 in order. Emit OUTPUT in the OUTPUT_SCHEMA.
```

---

## 1. DEFINITIONS

```
entity        : a single member of a standardized taxonomy (e.g., CPT 63047).
seed_taxonomy : an enumerable list of entities (the "strain list").
modifier_dim  : a dimension multiplied against the spine (geo, audience, cohort).
cell          : one combination = one candidate page (entity × modifiers).
data_atom     : the unique real data shown on a cell's page (rate, stat, scoring).
intent_tier   : commercial | comparison | informational.
gate          : boolean — index:true only if data_atom EXISTS and is non-trivial.
```

---

## 2. CLIENT_DESCRIPTION (what the strategist gives the agent)

You give the agent ONE thing: a few plain sentences describing what the client
does — written by you, the strategist. No form, no client questionnaire. Example:

> "Sydra is software that helps surgical practices recover underpaid
>  out-of-network claims through the federal No Surprises Act IDR process. The
>  buyer is the practice's billing team, and they convert by booking a demo."

That is enough. The agent must DERIVE everything else itself — researching where
needed — and must NOT ask the client or the strategist to supply structured
fields. From the description, the agent infers (and fills gaps from its own
knowledge + the ENTITY_SOURCE_REGISTRY in section 9):

```yaml
derive_from_description:
  buyer_roles: []          # who searches & buys (infer; may be several)
  problem_domain: ""       # the WORLD the buyer lives in, broader than the product
  conversion_action: ""    # demo | free_trial | quote | call | checkout
  geography: ""            # national | per-state | per-metro | global
  seed_taxonomies: []      # the standardized lists in this domain — RESEARCH these
  candidate_datasets: []   # public/internal data that can back pages — RESEARCH
  licensed_sources: []     # taxonomies/data needing a license — FLAG
  constraints: []          # YMYL? privacy promise? compliance/eligibility accuracy?
tech_stack: "Next.js"      # assume; ISR + dynamic sitemap supported
```

If the description is thin or the client is vague, the agent does NOT stall to
ask questions — it makes the determination from domain knowledge and proceeds.
Treat the strategist's prose as ground truth for *what the client does*, and
treat finding the taxonomy, data, and entities as the agent's own work.

---

## 3. STEP_1 — Parse the description; identify the buyer problem-domain (not the product)

```
Read CLIENT_DESCRIPTION. Derive buyer_roles and problem_domain yourself — do not ask.
For each buyer:
  - Restate their problem_domain as the searchable universe (broader than product).
  - List 5–10 example real queries they type (long-tail, specific).
  - These examples calibrate the entity space; do not stop at the product.
```

## 4. STEP_2 — Find seed taxonomies (the strain list)

```
Search the client's domain + the world for the LARGEST standardized, enumerable
list adjacent to buyer intent. Use ENTITY_SOURCE_REGISTRY (section 9) by industry.
Prefer public-domain. Output: seed_taxonomy[] with {name, source, public, size}.
RULE: if the client "has no catalog," the taxonomy is borrowed from the domain
      (codes, conditions, roles, statutes, parts) — never conclude "no entities."
```

## 5. STEP_3 — Choose modifier dimensions

```
Pick 1–3 modifier_dims that create GENUINELY distinct pages (different facts), e.g.
geography, audience, cohort, use-case. Reject modifiers that only swap a word with
no new data (those become on-page content, not URLs).
Compute candidate cell count = product(|spine|, |modifiers|).
```

## 6. STEP_4 — Bind a data_atom to each cell

```
For each cell, name the dataset field(s) that make its page unique and real.
Map candidate_datasets -> cells. Mark cells with no data_atom as GATED (noindex).
RULE: the data_atom is also usually the conversion hook — surface it prominently.
```

## 7. STEP_5 — Define URL tiers & templates

```
Emit a tiered URL structure broad -> specific:
  /{domain}/{spine}
  /{domain}/{spine}/{modifier}
  /{domain}/{spine}/{modifier}/{modifier2}
Plus hubs (one per modifier value) + intent pages (/guide/{q}, /compare/{x}).
For each tier, emit a PAGE_TEMPLATE: H1 pattern, sections, data_atom slot, CTA.
```

## 8. STEP_6 — Metadata, schema, gating

```
metadata: one factory -> {title(commercial, entity-first), description(long-tail
          combos + soft CTA), canonical(absolute, trailing slash), OG, Twitter}.
schema by intent/type (choose from SCHEMA_MAP, section 10).
gate: index = (data_atom EXISTS) AND (page passes constraints). Else noindex,follow.
```

## 9. STEP_7 — Sitemap, crawl, AI surface, conversion

```
sitemap: generate from DB; priority tiers (pillars 1.0, spine 0.9, derivatives
         0.85, hubs 0.84, guides 0.7, legacy 0.3).
robots: allow clean paths, disallow query-string facets, link sitemap.
ai: allow GPTBot/ClaudeBot/PerplexityBot/Google-Extended; publish llms.txt
    (template in section 11).
conversion: every commercial page -> conversion_action with cell context
            pre-filled; fire a tracked event on submit.
demand_loop: after publish, read Search Console; promote clusters with
             impressions, prune/merge dead cells. The index is the demand sensor.
```

---

## 9. ENTITY_SOURCE_REGISTRY (where the "strain list" lives, by industry)

```yaml
healthcare_billing:   [CPT(licensed), HCPCS(public), ICD-10(public), NPI taxonomy, payers, DRG]
clinical:             [ICD-10, validated instruments, CPT testing codes, drug NDC, conditions]
workforce_hr:         [O*NET occupations, NAICS industries, validated screeners, state labor law]
ecommerce_retail:     [GTIN/UPC, MPN, brand, category, attributes, compatibility]
manufacturing_b2b:    [part numbers, specs/dimensions, materials, standards (ISO/ASTM), tolerances]
legal_compliance:     [statutes, regulations, case citations, forms, jurisdictions]
real_estate:          [parcels, ZIP/metro, school districts, building codes]
finance_insurance:    [tickers, CUSIP, form types, NAIC codes, policy types]
software_saas:        [integrations, APIs, error codes, use-cases, job-to-be-done, competitors]
local_services:       [service × city/neighborhood, license types, permit types]
education:            [courses, credentials, occupations, exam codes]
RULE: pick the largest list that maps to real buyer queries AND has a bindable
      data_atom. Cross-multiply with geography/audience for scale.
```

---

## 10. SCHEMA_MAP

```yaml
sitewide:        [Organization, WebSite, SearchAction]
product_item:    [Product, Offer, SKU/MPN, AggregateRating?]   # ecommerce/catalog
service:         [Service]                                      # SaaS/agency offering
data_table:      [Dataset]                                     # rate/stat tables
medical_test:    [MedicalTest]                                 # screeners/instruments
medical_cond:    [MedicalCondition]                            # diagnosis/condition
howto:           [HowTo]                                       # protocols/steps
article:         [Article, TechArticle]                        # guides/question pages
every_page:      [BreadcrumbList]
faq_blocks:      [FAQPage]
```

---

## 11. LLMS_TXT_TEMPLATE

```
# {Client Name}
> {one-line description of what the client does and who it serves}

## What we cover
- {entity domain 1}: {short description, e.g., "every IDR-eligible CPT code by state"}
- {entity domain 2}: {...}

## Key facts
- {authoritative, citable fact with source}
- {differentiator / proof point}

## Conversion
- {conversion_action}: {URL}

## Sitemap
{absolute sitemap URL}
```

---

## 12. OUTPUT_SCHEMA (what the agent returns)

```yaml
client: ""
problem_domain_summary: ""
seed_taxonomies:
  - {name, source, public_or_licensed, size}
modifier_dimensions:
  - {name, values_or_count}
projected_pages:
  candidate_cells: 0
  indexable_after_gating: 0
url_tiers:
  - {pattern, intent_tier, schema, indexable_condition}
page_templates:
  - {tier, h1_pattern, sections[], data_atom, cta}
data_pipeline:
  - {dataset, source, refresh_cadence, fields_used}
build_phases:
  - {phase, scope, page_count, expansion_trigger}
risks_flags: []          # licensing, YMYL, privacy, eligibility-accuracy, thin-content
```

---

## 13. SELF-CHECK before emitting

```
[ ] Did I derive buyer/domain/taxonomy/data from the strategist's description and
    my own research — without asking the client to fill anything in?
[ ] Did I find a real seed taxonomy (not "the product has no catalog")?
[ ] Is every indexable page bound to a data_atom?
[ ] Did I avoid multiplying URLs by a variable that should be a table?
[ ] Did I gate thin cells to noindex?
[ ] Did I map every commercial page to the conversion_action with context?
[ ] Did I flag all licensed sources and constraint risks (YMYL/privacy/legal)?
[ ] Is the projected indexable count realistic for this domain (not inflated)?
```

---

*Companion files: `05_Generic_Framework.md` (human strategy), and the three
worked client playbooks (`01`–`03`). This spec is stack-agnostic but assumes
Next.js-style on-demand ISR + a dynamic, DB-driven sitemap.*
