import type { Clinician, Condition, Modality } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// A /therapy/[topic] slug resolves against Condition first, then Modality.
// Slugs are unique across both taxonomies (enforced by the seed).
export type ResolvedTopic =
  | { kind: "condition"; condition: Condition & { clinicians: Clinician[] } }
  | { kind: "modality"; modality: Modality & { clinicians: Clinician[] } };

export async function resolveTopic(
  slug: string,
): Promise<ResolvedTopic | null> {
  const condition = await prisma.condition.findUnique({
    where: { slug },
    include: { clinicians: true },
  });
  if (condition) return { kind: "condition", condition };

  const modality = await prisma.modality.findUnique({
    where: { slug },
    include: { clinicians: true },
  });
  if (modality) return { kind: "modality", modality };

  return null;
}

export function topicName(topic: ResolvedTopic): string {
  return topic.kind === "condition" ? topic.condition.name : topic.modality.name;
}

export function topicSlug(topic: ResolvedTopic): string {
  return topic.kind === "condition" ? topic.condition.slug : topic.modality.slug;
}

export function topicApproved(topic: ResolvedTopic): boolean {
  return topic.kind === "condition"
    ? topic.condition.contentApproved
    : topic.modality.contentApproved;
}

export function topicBody(topic: ResolvedTopic): string | null {
  return topic.kind === "condition" ? topic.condition.body : topic.modality.body;
}

export function topicEyebrow(topic: ResolvedTopic): string {
  return topic.kind === "condition" ? "Condition" : "Treatment";
}

// Count clinicians offering this topic at an office in range of a town. Drives
// the doorway gate for a topic x town page.
export async function clinicianCountForTopicAtOffices(
  topic: ResolvedTopic,
  officeIds: string[],
): Promise<number> {
  if (officeIds.length === 0) return 0;
  const officeFilter = { offices: { some: { id: { in: officeIds } } } };
  if (topic.kind === "condition") {
    return prisma.clinician.count({
      where: { ...officeFilter, conditions: { some: { id: topic.condition.id } } },
    });
  }
  return prisma.clinician.count({
    where: { ...officeFilter, modalities: { some: { id: topic.modality.id } } },
  });
}
