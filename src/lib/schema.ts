import type {
  Condition,
  GeoState,
  Guide,
  Modality,
  Office,
  Population,
  WellnessService,
} from "@prisma/client";
import { organizationId, site, websiteId } from "@/lib/site";

// Typed JSON-LD builders. Every entity links back to the Organization node via
// @id. Only properties reflected in visible content are emitted. No
// SearchAction, no FAQPage for rich results, per house rules.

type JsonLdObject = Record<string, unknown>;

export function organizationSchema(): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/brand/logo.png`,
    description: site.description,
    telephone: site.phoneTel,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneTel,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
  if (site.sameAs.length > 0) {
    schema.sameAs = site.sameAs;
  }
  return schema;
}

export function webSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    publisher: { "@id": organizationId },
  };
}

function streetAddress(office: Office): string {
  return office.suite
    ? `${office.addressLine}, ${office.suite}`
    : office.addressLine;
}

export function officeUrl(slug: string): string {
  return `${site.url}/locations/${slug}`;
}

// Psychologist is a subtype of both LocalBusiness and MedicalBusiness, so it
// carries NAP, telephone, and geo while signalling the clinical category.
export function officeSchema(office: Office): JsonLdObject {
  const url = officeUrl(office.slug);
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "@id": `${url}#business`,
    name: `${site.name} ${office.townName}`,
    url,
    telephone: site.phoneTel,
    parentOrganization: { "@id": organizationId },
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress(office),
      addressLocality: office.city,
      addressRegion: office.state,
      postalCode: office.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${office.townName}, ${office.state}`,
    },
  };
  if (office.latitude != null && office.longitude != null) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: office.latitude,
      longitude: office.longitude,
    };
  }
  return schema;
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

// MedicalCondition for condition pages. Only emits the description when there
// is approved content, so schema never claims more than the visible page.
export function conditionSchema(condition: Condition, path: string): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "@id": `${site.url}${path}#condition`,
    name: condition.name,
    url: `${site.url}${path}`,
  };
  if (condition.icd10) schema.code = { "@type": "MedicalCode", codeValue: condition.icd10, codingSystem: "ICD-10" };
  if (condition.summary) schema.description = condition.summary;
  return schema;
}

// MedicalTherapy for modality pages.
export function modalitySchema(modality: Modality, path: string): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${site.url}${path}#therapy`,
    name: modality.name,
    url: `${site.url}${path}`,
    provider: { "@id": organizationId },
  };
  if (modality.summary) schema.description = modality.summary;
  return schema;
}

// Service for population pages (a therapy service aimed at an audience).
export function populationSchema(population: Population, path: string): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: `Therapy for ${population.name}`,
    serviceType: "Psychotherapy",
    url: `${site.url}${path}`,
    provider: { "@id": organizationId },
    areaServed: { "@type": "AdministrativeArea", name: "Long Island, NY" },
  };
  if (population.summary) schema.description = population.summary;
  return schema;
}

// Service for telehealth state pages, area served fenced to the licensed state.
export function telehealthSchema(state: GeoState, path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#telehealth`,
    name: `Online therapy in ${state.name}`,
    serviceType: "Telehealth psychotherapy",
    url: `${site.url}${path}`,
    provider: { "@id": organizationId },
    areaServed: { "@type": "State", name: state.name },
  };
}

// Generic therapy Service node, linked to the Organization.
export function serviceSchema(opts: {
  name: string;
  path: string;
  description?: string;
  serviceType?: string;
}): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType ?? "Psychotherapy",
    url: `${site.url}${opts.path}`,
    provider: { "@id": organizationId },
    areaServed: { "@type": "AdministrativeArea", name: "Long Island, NY" },
  };
  if (opts.description) schema.description = opts.description;
  return schema;
}

// The Wellness sister practice as a business node.
export function wellnessBusinessSchema(path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${site.url}${path}#wellness`,
    name: site.wellness.name,
    description: site.wellness.description,
    url: `${site.url}${path}`,
    telephone: site.phoneTel,
    parentOrganization: { "@id": organizationId },
    areaServed: { "@type": "AdministrativeArea", name: "Long Island, NY" },
  };
}

// A single Wellness service.
export function wellnessServiceSchema(
  service: WellnessService,
  path: string,
): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: service.name,
    serviceType: service.name,
    url: `${site.url}${path}`,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: site.wellness.name,
      url: site.wellness.url,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Long Island, NY" },
  };
  if (service.summary) schema.description = service.summary;
  return schema;
}

// Article for guide pages.
export function articleSchema(guide: Guide, path: string): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}${path}#article`,
    headline: guide.title,
    url: `${site.url}${path}`,
    publisher: { "@id": organizationId },
  };
  if (guide.publishedAt) schema.datePublished = guide.publishedAt.toISOString();
  schema.dateModified = guide.updatedAt.toISOString();
  return schema;
}
