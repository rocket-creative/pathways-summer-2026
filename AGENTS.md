<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Eastern Keel build rules

Mirror of `.cursor/rules/00-core.mdc` for tools that read AGENTS.md. Cursor itself uses the `.cursor/rules/*.mdc` files, which carry the full documents and the activation modes. This file is the always on summary only.

Stack: Next.js 16.2 App Router, TypeScript strict (never `any`), Tailwind v4 with the theme in an @theme block in globals.css, Supabase with RLS, Prisma, Vercel. Server render every route. Add `'use client'` only when a component needs interactivity.

Six permanent design rules: no gradients anywhere; no drop shadows (one subtle floating UI exception); no border radius above 4px; no more than two typeface families; system cursor only; nothing decorative, every element is structural.

No AI design tells, ever: no gradients of any kind, no gradient text, no glassmorphism, no mesh or blob backgrounds, no bento card grids, no generic three column icon rows, no glow, no centered hero, no emoji, no unrestyled component library skin. Output is left aligned, asymmetric, photography led, editorial. If a screenshot could pass for a template or AI builder default, it failed.

Copy rules, enforced at commit: no hyphens in body copy, no em or en dashes in copy, no hyphenated phone numbers, no AI filler.

Process: plan before any new page or refactor. Audit and implementation in separate sessions. Build before reporting done.

# Project: Pathways Within

Entity space local SEO build for a Long Island therapy practice. Five in person offices (Smithtown, Garden City, Massapequa, Port Jefferson, Rockville Centre) plus telehealth licensed in NY, NJ, NC, FL only. The full strategy lives in `06_Pathways-Within_Entity-SEO_Playbook.md`. Read it before building pages.

YMYL health content. Two hard gates, both non negotiable:

1. Licensure gate: publish `online-therapy/{state}` pages only for NY, NJ, NC, FL. Never a state Pathways is not licensed in.
2. Doorway page gate: a `condition x town` page is indexable only when it has real local substance (an office in range, named clinicians, true local detail). No local data atom means `noindex, follow`.

Every clinical page is authored to a named licensed clinician, cites sources, and keeps crisis resources visible (988, 911, Veterans Crisis Line). Phone in copy: (631) 371 3825, never hyphenated. The build is one cohesive 360 degree app: a Pathway to Wisdom (therapy, pathwayswithin.me) and a Pathway to Wellness (the sister medspa, pathwayswithinwellness.com) under one umbrella, cross linked, with a shared home at /.
