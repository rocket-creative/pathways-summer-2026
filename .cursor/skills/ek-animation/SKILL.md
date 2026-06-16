---
name: ek-animation
description: Eastern Keel motion and interaction system for Pathways Within. CSS-first easing/duration tokens, layered page-load entrances, scroll reveals, hover/focus states, and granular reduced-motion handling. Read and follow before any motion, transition, or interaction work.
---

# Eastern Keel motion system

The full, authoritative document lives in the project rule at
`.cursor/rules/animation.mdc`. Read it before any motion work. This skill is the
entry point for tools that load skills; it does not duplicate the content.

## The rules that never break

1. No colored drop shadows, ever.
2. No bounce or elastic easing, ever.
3. No scale above 1.0 on entrance (images may start at 1.04 and settle to 1).
4. No rotation except the already-rotated sidebar labels.
5. No loading spinners. Shimmer sweep or the 1px progress line only.
6. No animating layout properties (width, height, margin, padding). Transform and opacity only.
7. No element starting at opacity 0 before JavaScript loads. Pure CSS or SSR-safe initial states only.
8. No custom cursor. The system cursor is the cursor.
9. No animation library (Motion, GSAP) for entrances, hovers, or scroll reveals.

## Tokens (defined in the `@theme` block of `src/app/globals.css`)

- Easing: `ease-out-soft`, `ease-in-soft`, `ease-inout-soft`, `ease-editorial`, `ease-hover`.
- Duration: `duration-instant` (80ms) through `duration-xslow` (1000ms). Never animate one element longer than 1000ms.

## Project primitives and helpers

- `src/hooks/useInView.ts`: Intersection Observer reveal hook.
- `src/components/ui/RevealBlock.tsx`: SSR-safe staggered scroll reveal (visible until hydration confirms motion is safe).
- `src/components/ui/SplitHeadline.tsx`: pure-CSS word-by-word display headline reveal.
- CSS utility classes in `globals.css`: `.animate-word-in`, `.hero-image`, `.hero-sub`, `.hero-cta`, `.rule-draw`, `.image-skeleton`.

## prefers-reduced-motion

Granular, never a blanket kill switch. Static is the default; motion lives inside
`@media (prefers-reduced-motion: no-preference)`. A 0.01ms safety net may ship on
top, never instead of the granular patterns. JS animation paths check the
preference before running.

If a screenshot of the page in motion would feel busy, flashy, or decorative, it
has failed. Motion reveals content, confirms interaction, and guides attention,
nothing more.
