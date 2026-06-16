---
name: ek-design-language
description: Eastern Keel editorial visual design language for Pathways Within. Editorial fashion aesthetic, magazine layouts, thin rules, arrows, two typefaces, Tailwind v4 tokens, no AI design tells. Read and follow before any UI, component, page, or styling work.
---

# Eastern Keel design language

The full, authoritative document lives in the project rule at
`.cursor/rules/design-language.mdc`. Read it before any UI work. This skill is
the entry point for tools that load skills; it does not duplicate the content.

## The hard rules (always hold, every turn)

1. No gradients anywhere (no gradient text, no mesh or blob backgrounds).
2. No drop shadows (one subtle floating UI exception: `0 2px 8px rgba(0,0,0,0.06)`).
3. No border radius above 4px (buttons 2px max, inputs 0).
4. No more than two typeface families.
5. No hyphens in copy, ever. No `hyphens: auto`.
6. Nothing decorative. Every element is structural.

## Canonical layout patterns (use by name, never invent generic ones)

- Split Hero 60/40 or 70/30 (`min-h-dvh`, display text left, full bleed photo right)
- Editorial Stack (full width image, headline overlapping its bottom, body below)
- Image Mosaic (asymmetric, one dominant, no equal thumbnails)
- Magazine Spread (two print columns, oversized word or number as structure)
- Feature Grid (vary weight, never uniform tiles)
- Stat / Pull Quote (full width near black section, display scale, thin rule above and below)

## Project specifics

- Tokens live in the `@theme` block of `src/app/globals.css`. Read it first. Do not invent colors.
- Fonts: Raleway (body) and Jubilat (display), loaded via `next/font`. Jubilat ships as static woff2 (no variable file available), an accepted exception.
- Shared primitives: `src/components/ui/` (Arrow, Section, SidebarLabel, Button).
- The accent is a flagged placeholder until the brand confirms one.

If a screenshot of the page could be mistaken for a generic template or an AI
builder default, it has failed. The page reads as a designed editorial object.
