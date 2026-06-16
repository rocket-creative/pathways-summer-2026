// The doorway-page and licensure gates. A page may only be indexed when it has
// real substance. Everything else is rendered but marked noindex,follow and is
// excluded from the sitemap. With the clinician roster and clinical content
// empty, these resolve to noindex by design.

import type { Metadata } from "next";

export type IndexDecision = { index: boolean; reason: string };

const INDEXABLE: IndexDecision = { index: true, reason: "has required substance" };

// Translate a decision into Next.js robots metadata. noindex pages still allow
// follow so equity flows through internal links.
export function robotsFor(decision: IndexDecision): Metadata["robots"] {
  return decision.index
    ? { index: true, follow: true }
    : { index: false, follow: true };
}

// Hub pages (condition, modality, population, payer): Long Island wide.
// Indexable when the topic has approved content and at least one clinician
// offers it.
export function hubDecision(opts: {
  contentApproved: boolean;
  clinicianCount: number;
}): IndexDecision {
  if (!opts.contentApproved) {
    return { index: false, reason: "no approved content yet" };
  }
  if (opts.clinicianCount < 1) {
    return { index: false, reason: "no clinician offers this yet" };
  }
  return INDEXABLE;
}

// Topic x town leaf pages: the doorway-page gate. Needs an in-range office,
// a clinician at that office offering the topic, approved content, and real
// local detail unique to the town.
export function townLeafDecision(opts: {
  contentApproved: boolean;
  officeInRangeCount: number;
  clinicianCount: number;
  hasLocalDetail: boolean;
}): IndexDecision {
  if (opts.officeInRangeCount < 1) {
    return { index: false, reason: "no office in range of this town" };
  }
  if (!opts.hasLocalDetail) {
    return { index: false, reason: "no unique local detail for this town" };
  }
  if (!opts.contentApproved) {
    return { index: false, reason: "no approved content yet" };
  }
  if (opts.clinicianCount < 1) {
    return { index: false, reason: "no clinician at the in-range office offers this yet" };
  }
  return INDEXABLE;
}

// Payer town pages reuse the same doorway gate, but local detail plus an
// in-range office is the minimum. Payer coverage itself is confirmed data.
export function payerTownDecision(opts: {
  officeInRangeCount: number;
  hasLocalDetail: boolean;
}): IndexDecision {
  if (opts.officeInRangeCount < 1) {
    return { index: false, reason: "no office in range of this town" };
  }
  if (!opts.hasLocalDetail) {
    return { index: false, reason: "no unique local detail for this town" };
  }
  return INDEXABLE;
}

// Payer hub pages: indexable once confirmed coverage copy is approved. The
// list of accepted payers is real data, but the answer to "does X cover
// therapy in NY" needs authored, confirmed copy before it indexes.
export function payerHubDecision(opts: {
  contentApproved: boolean;
}): IndexDecision {
  if (!opts.contentApproved) {
    return { index: false, reason: "no confirmed coverage copy yet" };
  }
  return INDEXABLE;
}

// Telehealth pages: the licensure fence. A state page is indexable only when
// the state is licensed and has approved content.
export function telehealthDecision(opts: {
  licensed: boolean;
  contentApproved: boolean;
}): IndexDecision {
  if (!opts.licensed) {
    return { index: false, reason: "not licensed in this state" };
  }
  if (!opts.contentApproved) {
    return { index: false, reason: "no approved content yet" };
  }
  return INDEXABLE;
}

// Guides: indexable when published and content approved.
export function guideDecision(opts: {
  contentApproved: boolean;
  published: boolean;
}): IndexDecision {
  if (!opts.published || !opts.contentApproved) {
    return { index: false, reason: "draft or unapproved" };
  }
  return INDEXABLE;
}
