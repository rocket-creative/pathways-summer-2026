import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import {
  guideDecision,
  hubDecision,
  payerHubDecision,
  telehealthDecision,
  townLeafDecision,
} from "@/lib/indexing";
import { therapyServices } from "@/lib/therapyServices";

// Only indexable pages appear in the sitemap. With the clinician roster and
// clinical content empty, this resolves to the real, substantive pages today
// (home, location pages, insurance index) and automatically grows as content
// is approved. Nothing thin or unlicensed is ever listed.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const abs = (path: string) => `${site.url}${path}`;
  const entries: MetadataRoute.Sitemap = [
    { url: abs("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: abs("/therapy"), changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/wellness"), changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/locations"), changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/insurance"), changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/clinicians"), changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: abs("/faq"), changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: abs("/payment-plans"), changeFrequency: "yearly", priority: 0.5 },
    { url: abs("/resources"), changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/careers"), changeFrequency: "yearly", priority: 0.4 },
  ];

  // Named therapy service pages (static brand content, always indexable).
  for (const service of therapyServices) {
    entries.push({
      url: abs(`/services/${service.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const [
    offices,
    conditions,
    modalities,
    populations,
    payers,
    states,
    towns,
    guides,
    wellnessServices,
  ] = await Promise.all([
    prisma.office.findMany(),
    prisma.condition.findMany({
      include: { _count: { select: { clinicians: true } } },
    }),
    prisma.modality.findMany({
      include: { _count: { select: { clinicians: true } } },
    }),
    prisma.population.findMany({
      include: { _count: { select: { clinicians: true } } },
    }),
    prisma.insurer.findMany(),
    prisma.geoState.findMany({ where: { licensed: true } }),
    prisma.town.findMany({ include: { offices: { select: { id: true } } } }),
    prisma.guide.findMany(),
    prisma.wellnessService.findMany(),
  ]);

  // Location detail pages: real NAP, indexable.
  for (const office of offices) {
    entries.push({
      url: abs(`/locations/${office.slug}`),
      lastModified: office.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Wellness services: real content, indexable once approved.
  for (const service of wellnessServices) {
    if (service.contentApproved) {
      entries.push({
        url: abs(`/wellness/${service.slug}`),
        lastModified: service.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Topic hubs (condition and modality share /therapy/[topic]).
  for (const condition of conditions) {
    if (
      hubDecision({
        contentApproved: condition.contentApproved,
        clinicianCount: condition._count.clinicians,
      }).index
    ) {
      entries.push({
        url: abs(`/therapy/${condition.slug}`),
        lastModified: condition.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }
  for (const modality of modalities) {
    if (
      hubDecision({
        contentApproved: modality.contentApproved,
        clinicianCount: modality._count.clinicians,
      }).index
    ) {
      entries.push({
        url: abs(`/therapy/${modality.slug}`),
        lastModified: modality.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Population hubs.
  for (const population of populations) {
    if (
      hubDecision({
        contentApproved: population.contentApproved,
        clinicianCount: population._count.clinicians,
      }).index
    ) {
      entries.push({
        url: abs(`/for/${population.slug}`),
        lastModified: population.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Payer hubs.
  for (const payer of payers) {
    if (payerHubDecision({ contentApproved: payer.contentApproved }).index) {
      entries.push({
        url: abs(`/insurance/${payer.slug}`),
        lastModified: payer.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Telehealth state hubs and state x condition leaves.
  for (const state of states) {
    if (
      telehealthDecision({
        licensed: state.licensed,
        contentApproved: state.contentApproved,
      }).index
    ) {
      entries.push({
        url: abs(`/online-therapy/${state.slug}`),
        lastModified: state.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const condition of conditions) {
      if (
        telehealthDecision({
          licensed: state.licensed,
          contentApproved: condition.contentApproved,
        }).index
      ) {
        entries.push({
          url: abs(`/online-therapy/${state.slug}/${condition.slug}`),
          lastModified: condition.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  // Topic x town and population x town leaves (doorway gate).
  const eligibleTowns = towns.filter(
    (town) => town.localDetail && town.offices.length > 0,
  );
  for (const town of eligibleTowns) {
    const officeIds = town.offices.map((office) => office.id);

    for (const condition of conditions) {
      if (!condition.contentApproved) continue;
      const clinicianCount = await prisma.clinician.count({
        where: {
          offices: { some: { id: { in: officeIds } } },
          conditions: { some: { id: condition.id } },
        },
      });
      if (
        townLeafDecision({
          contentApproved: condition.contentApproved,
          officeInRangeCount: town.offices.length,
          clinicianCount,
          hasLocalDetail: Boolean(town.localDetail),
        }).index
      ) {
        entries.push({
          url: abs(`/therapy/${condition.slug}/${town.slug}`),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  // Guides.
  for (const guide of guides) {
    if (
      guideDecision({
        contentApproved: guide.contentApproved,
        published: Boolean(guide.publishedAt),
      }).index
    ) {
      entries.push({
        url: abs(`/guide/${guide.slug}`),
        lastModified: guide.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
