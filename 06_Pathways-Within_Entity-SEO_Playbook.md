# Pathways Within — Entity-Space SEO Playbook

*Turning a 5-location Long Island therapy practice (plus 4-state telehealth) into a
searchable repository of every condition × modality × population × place a patient
searches.*

Modeled on the ITL catalog rebuild and the entity-space method (`05_Generic_
Framework_Secret-Sauce.md`). Pathways is a **local + regional services business**,
not a product catalog or a national SaaS — so the engine is the same, but the
geography dimension is the whole game, and it has **two different fences.**

---

## 0. The one-paragraph thesis

Patients don't search "Pathways Within." They search *"EMDR therapist near me,"*
*"child therapist in Massapequa that takes Aetna,"* *"trauma counseling Port
Jefferson,"* *"online therapy for anxiety in North Carolina."* Each is an
enumerable entity built from a handful of stackable dimensions — **condition ×
modality × population × place × insurance** — and each deserves its own
server-rendered, locally-grounded page that ends in "verify your benefits / book
an intake." We mint a page for every legitimate combination the practice can
actually serve, and we fence them to where Pathways can legally and physically
deliver care.

---

## 1. The two geo-fences (your question, answered)

You asked whether to geo-fence it. **Yes — but with two separate fences, because
Pathways delivers care two different ways:**

| Delivery mode | What it is | Geo fence | Page geography |
| --- | --- | --- | --- |
| **In-person** | 5 brick-and-mortar offices | **Long Island only** (Nassau + Suffolk) | Towns/hamlets within a realistic drive of an office |
| **Telehealth** | Virtual sessions | **Only states where clinicians are licensed: NY, NJ, NC, FL** | Cities/metros inside those 4 states |

**The hard correction on "every code for every state":** you cannot do every
state. Mental-health licensure is state-by-state, and Pathways is licensed for
telehealth in **four states only (NY, NJ, NC, FL)**. Publishing "therapy in
[state]" pages for the other 46 would be pages they can't legally serve, can't
convert, and that read as doorway spam to Google. **Telehealth pages are fenced to
those four states** — and the page count grows only when the practice adds a
license (a business decision, not an SEO one). Flag this to the client as the
ceiling on the telehealth half.

So the geography dimension is:

```
IN-PERSON  →  ~80–120 Long Island towns within range of the 5 offices
              (Smithtown, Garden City, Massapequa, Port Jefferson, Rockville Centre
               + surrounding Nassau/Suffolk hamlets)
TELEHEALTH →  NY, NJ, NC, FL  +  the major metros inside each (gated to real demand)
```

---

## 2. The entity space (and why "every code" is the wrong spine)

**CPT codes are not the spine here.** A therapy practice bills maybe ~20 CPT codes
(90791 intake, 90832/90834/90837 psychotherapy, 90846/90847 family/couples, 90853
group, 90839 crisis, 96130–96139 testing). Twenty pages isn't a repository, and
patients don't search code numbers. Codes are a *data atom*, not the URL spine.

The real spine is what patients actually type — a stack of clinical and human
dimensions:

| Dimension | Source / size | Examples (from Pathways' own site) |
| --- | --- | --- |
| **Condition** (the diagnosis/problem) | ICD-10 F-codes + plain-language terms; ~50 meaningful | anxiety, depression, PTSD, complex PTSD, ADHD, bipolar, BPD, OCD, trauma, grief, addiction/substance use, eating disorders, panic/phobias, insomnia, self-harm, domestic-violence recovery, life transitions |
| **Modality** (how they treat) | Pathways' named methods; ~12 | EMDR, CBT, DBT, IFS, somatic, hypnotherapy, Gottman/couples, play therapy, talk therapy, light therapy, cognitive processing |
| **Population** (who) | ~10 | child, teen, adult, couple, family, veteran, first responder, college student, LGBTQIA+, professionals |
| **Place** (the two fences) | ~80–120 LI towns + 4 states/metros | Massapequa, Smithtown, Garden City, Port Jefferson, Rockville Centre, Nassau, Suffolk; NY/NJ/NC/FL metros |
| **Insurance** (high intent!) | The ~19 accepted payers | Aetna, Cigna, Optum, UHC, Oxford, UMR, Oscar, 1199, Meritain, Humana, Medicare, MVP, ComPsych, VA Community Care, Northwell Brighton, etc. |

**Insurance is a sleeper dimension for therapy.** "[Condition] therapist that
takes [payer] near me" and "does [payer] cover therapy in NY" are extremely
high-intent, low-competition queries, and Pathways already lists its accepted
payers. Stack it.

### The multiplication (candidate cells)

```
IN-PERSON
  condition (50) × town (100)              = 5,000
  modality (12)  × town (100)              = 1,200
  population (10) × town (100)             = 1,000
  payer (19)     × town (100)              = 1,900   (gate hard)
  payer (19)     × condition (50)          =   950
  condition (50) × modality (12)  [hubs]   =   600
  condition (50) × population (10) [hubs]  =   500
TELEHEALTH (fenced to NY/NJ/NC/FL)
  condition (50) × state (4)               =   200
  condition (50) × metro (~60)             = 3,000   (gate to real metros)
  modality (12)  × state (4)               =    48
  ----------------------------------------------------
  candidate cells                          ≈ 14,500+
```

The candidate space clears 14,500. **What you actually index is smaller** — see
the gating discipline in §7 — but the ambition is reachable *if* you push town/
metro granularity and stack the payer dimension, all with real local substance.

---

## 3. The data atoms (what keeps each page off the doorway-spam list)

For a local health practice this is do-or-die: "anxiety therapist in [Town A]" and
"anxiety therapist in [Town B]" that differ only by town name are textbook doorway
pages and get penalized. Every indexable page needs a **real, unique unit of
value**:

| Data atom | Makes which page real |
| --- | --- |
| **ICD-10 condition info + plain-language clinical content** (public domain) | Condition pages (what it is, symptoms, how it's treated) |
| **Real local presence** — the actual office serving that town, drive time, parking, named clinicians who work there, local landmarks | In-person town pages (the unique substance) |
| **Clinician specialties** (from the site's roster — each lists conditions/modalities/populations) | condition/modality/population pages — real named providers |
| **Modality detail** (EMDR phases, Gottman method, play therapy) | modality pages |
| **Insurance/benefits info** (what each payer covers, in-network status, verification process) | payer pages |
| **Telehealth licensure + state rules** | telehealth state pages |

Rule: if a `condition × town` cell has nothing locally true to say (no office in
range, no clinician serving it), it does **not** get an indexable page.

---

## 4. URL architecture

```
# In-person (fenced to Long Island)
/therapy/{condition}                              condition hub (Long Island)
/therapy/{condition}/{town}                        condition × town (in-person)
/therapy/{modality}                                modality hub (e.g., /therapy/emdr)
/therapy/{modality}/{town}                         modality × town
/for/{population}                                  population hub (teens, veterans…)
/for/{population}/{town}                            population × town
/locations/{town}                                  office/area landing page
/insurance/{payer}                                 payer hub (does X cover therapy)
/insurance/{payer}/{town}                           payer × town

# Telehealth (fenced to NY, NJ, NC, FL)
/online-therapy/{state}                            state hub
/online-therapy/{state}/{condition}                state × condition
/online-therapy/{state}/{metro}                    state × metro
/online-therapy/{state}/{metro}/{condition}        metro × condition

# Informational / authority
/guide/{question-slug}                             "what is EMDR", "signs of PTSD"
```

Rendering: on-demand ISR; **real server-rendered HTML** (crawlers must see the
content without JS); 301 any legacy URLs onto these clean paths; one canonical per
page with a single trailing-slash convention.

---

## 5. Page templates

**In-person `condition × town`** — "Anxiety Therapy in Massapequa, NY":
1. The condition in plain language (symptoms, how therapy helps) — ICD-10-backed.
2. **Local block (the data atom):** which office serves Massapequa, address, drive
   time, parking, the named clinicians there who treat anxiety.
3. Modalities offered for it (EMDR/CBT/DBT) with links to modality pages.
4. Insurance: "In-network with Aetna, Cigna, UHC…" + verify-benefits CTA.
5. CTA: **Verify your benefits / Book an intake / Call (631) 371-3825** — tracked.
6. FAQ (cost, insurance, what to expect) → FAQ rich result.

**Telehealth `state × condition`** — "Online Anxiety Therapy in North Carolina":
1. The condition + how telehealth therapy works.
2. **Licensure statement (data atom):** Pathways clinicians licensed in NC; how
   virtual sessions run (HIPAA-compliant platform).
3. Which clinicians serve NC telehealth; modalities available virtually.
4. Insurance accepted for NC residents.
5. CTA: verify benefits / book virtual intake.

---

## 6. Metadata, schema & the local levers

`generateMetadata` factory (commercial, place-first title; long-tail description;
absolute canonical, OG, Twitter). JSON-LD:

| Schema | Applied on |
| --- | --- |
| **MedicalBusiness / Psychologist + LocalBusiness** (one per physical office, with NAP, geo, hours) | Each `/locations/{town}` + office pages |
| MedicalCondition | Condition pages |
| MedicalTherapy / Service | Modality pages |
| FAQPage | Pages with FAQ blocks |
| BreadcrumbList | Every non-home page |
| Organization + WebSite | Sitewide |

**Local levers beyond the page engine (don't skip these):**

- **Google Business Profile for all 5 offices** — separate, fully-optimized,
  category-correct, with reviews. For "near me" / map-pack queries, GBP often
  outweighs the page. The page engine and GBP reinforce each other.
- **NAP consistency** (Name/Address/Phone identical everywhere, incl. citations).
  *Note: the source site has inconsistent suite/ZIP details for Garden City
  (Suite L1 vs L61; ZIP 11520 vs 11530) — fix before scaling citations, or the
  inconsistency will undercut local ranking.*
- **Reviews** per location — the strongest local trust signal.

---

## 7. The discipline: licensure gate + doorway-page gate

Two non-negotiable gates, both stricter than for the SaaS clients:

1. **Licensure gate (telehealth).** Index `online-therapy/{state}` pages **only
   for NY, NJ, NC, FL.** No page for a state Pathways isn't licensed in. This is
   legal/ethical, not just SEO.
2. **Doorway-page gate (local).** Index a `condition × town` page **only when
   there's real local substance** — an office in range, named clinicians, true
   local detail. A page that only swaps the town name is the #1 way a
   multi-location practice gets penalized. No local data atom → `noindex, follow`.

Plus standard YMYL/E-E-A-T (health content): author every clinical page to a named
licensed clinician (Pathways has a strong roster), cite sources, and keep crisis
resources visible (the site already shows 911 / Veterans Crisis Line — keep 988 on
condition pages too).

---

## 8. Sitemap, crawl, AI surface

- Dynamic `sitemap.ts` from the page database; priority tiers: booking/contact +
  the 5 location pages 1.0; condition + modality + telehealth-state pages 0.9;
  town/metro derivatives 0.85; payer pages 0.84; guides 0.7.
- robots: allow `/therapy/`, `/online-therapy/`, `/for/`, `/insurance/`,
  `/locations/`; disallow query-string facets; link the sitemap.
- Allow AI crawlers + publish `llms.txt`. "Best EMDR therapist on Long Island,"
  "does Aetna cover therapy in NY," "online therapy NC for PTSD" are increasingly
  asked of AI assistants — a locally-grounded, authoritative corpus wins those
  citations.

---

## 9. Conversion path

```
condition/town/insurance page → "Verify your benefits" (prefilled w/ payer + location)
                              → intake form  OR  call (631) 371-3825
                              → submit → GTM conversion event (+ call tracking)
```

Insurance verification is the natural low-friction first step for therapy (the
site already leads with "once we've confirmed your benefits…"). Pre-fill the payer
and location from the page the patient arrived on. Add **call tracking** — a large
share of local-health conversions are phone calls, and untracked calls make the
whole funnel look weaker than it is.

---

## 10. Build sequence (phased)

1. **Foundation:** 5 fully-optimized location pages + GBP for each + NAP cleanup +
   LocalBusiness schema. (Fastest local wins; do before scaling pages.)
2. **Hero conditions × hero towns:** top ~15 conditions × the 5 office towns +
   their immediate neighbors (~20 towns) = ~300 pages with real local substance.
3. **Modality + population hubs** (EMDR, trauma, couples, teens, veterans) — these
   match Pathways' actual differentiators and existing service pages.
4. **Insurance pages** (the ~19 payers) × hero towns — high intent, low competition.
5. **Telehealth:** state hubs for NY/NJ/NC/FL + condition × state + real metros.
6. **Scale town/metro granularity** across Nassau/Suffolk as Search Console shows
   which areas draw impressions; prune dead cells.

---

## 11. Projected surface (honest)

| Phase | Indexable pages |
| --- | --- |
| Foundation (locations + GBP) | ~10 + 5 GBPs |
| Hero conditions × hero towns + hubs | ~400 |
| + insurance + populations + modalities | ~1,500 |
| Full LI town granularity + 4-state telehealth metros (gated) | ~5,000–14,500 |

The 14,500 ceiling is reachable, but only by pushing town/metro granularity and
stacking the payer dimension **with real local substance on every page.** Realistic
near-term target is several thousand high-quality local pages — already dominant
for a Long Island therapy practice — then grow toward the ceiling as the data and
local proof support it. Don't inflate to 14,500 with thin town-swap pages; that's
the one move that gets the whole domain penalized.

---

## 12. Pathways-specific gotchas

- **Licensure is the hard ceiling on telehealth.** 4 states only. More states =
  more clinician licenses = a business decision. Never publish pages for
  unlicensed states.
- **Doorway pages are the #1 local risk.** Real local substance per town or
  `noindex`. This matters more than anything else in this playbook.
- **NAP/citation consistency** — fix the Garden City suite/ZIP discrepancy and
  lock one canonical address per office everywhere.
- **YMYL + crisis safety** — named clinician authorship, citations, 988/crisis
  resources on sensitive pages.
- **Don't cannibalize with the sister "Wellness" medspa site** — keep therapy
  (pathwayswithin.me) and wellness clearly separated by domain/section and intent;
  cross-link, don't blur. (The medspa is its own entity space — massage,
  acupuncture, IV therapy × town — and a separate future build.)
- **Codes are data, not URLs** — surface CPT/insurance coverage as on-page info,
  not as a page per code.

---

*Anchored in Pathways Within's own site (5 LI locations; telehealth in NY, NJ, NC,
FL; the listed accepted payers; clinician roster and named modalities). Validate
ICD-10/CPT specifics, payer coverage, and clinician state licensure against current
records before publishing.*
