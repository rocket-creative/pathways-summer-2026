// Builders for the provider directory. Takes clinician records (as returned by
// prisma.clinician.findMany with offices/conditions/modalities/populations
// included) and produces a fully serializable roster plus the filter option
// lists with live counts, so the client island holds plain data and no Prisma
// types. Filter options with zero providers are dropped (for example the
// eating-disorders condition, which no clinician currently lists).

import {
  conditionLabels,
  modalityLabels,
  populationLabels,
} from "../../prisma/content/base";
import { officeGeo } from "@/lib/officesGeo";
import { clinicianImage } from "@/lib/clinicianImages";

// The telehealth pseudo location. Every clinician offers telehealth across the
// licensed states, so selecting it matches the whole roster.
export const TELEHEALTH_SLUG = "telehealth";
export const TELEHEALTH_LABEL = "Telehealth (NY, NJ, NC, FL)";

type Tagged = { slug: string; name?: string | null; townName?: string | null };

export type ClinicianWithRelations = {
  slug: string;
  name: string;
  credentials?: string | null;
  title?: string | null;
  offices?: Tagged[] | null;
  conditions?: Tagged[] | null;
  modalities?: Tagged[] | null;
  populations?: Tagged[] | null;
};

export type DirectoryProvider = {
  slug: string;
  name: string;
  credentials: string | null;
  title: string | null;
  image: { src: string; alt: string } | null;
  // Office slugs the clinician serves, plus the telehealth pseudo location, so
  // location filtering is a single "does this list include the choice" check.
  locationSlugs: string[];
  officeTowns: string[];
  conditionSlugs: string[];
  modalitySlugs: string[];
  populationSlugs: string[];
  // Display line for the card: condition then approach labels, merged.
  focus: string[];
};

export type FilterOption = { slug: string; label: string; count: number };

export type DirectoryFilters = {
  locations: FilterOption[];
  specialties: FilterOption[];
  approaches: FilterOption[];
  audiences: FilterOption[];
};

export type DirectoryData = {
  providers: DirectoryProvider[];
  filters: DirectoryFilters;
};

function slugsOf(items: Tagged[] | null | undefined): string[] {
  return (items ?? []).map((item) => item.slug);
}

function namesOf(items: Tagged[] | null | undefined): string[] {
  return (items ?? []).map((item) => item.name ?? item.slug);
}

export function toDirectoryProvider(
  clinician: ClinicianWithRelations,
): DirectoryProvider {
  const officeSlugs = slugsOf(clinician.offices);
  const officeTowns = (clinician.offices ?? []).map(
    (office) => office.townName ?? office.name ?? office.slug,
  );
  return {
    slug: clinician.slug,
    name: clinician.name,
    credentials: clinician.credentials ?? null,
    title: clinician.title ?? null,
    image: clinicianImage(clinician.slug, clinician.name),
    locationSlugs: [...officeSlugs, TELEHEALTH_SLUG],
    officeTowns,
    conditionSlugs: slugsOf(clinician.conditions),
    modalitySlugs: slugsOf(clinician.modalities),
    populationSlugs: slugsOf(clinician.populations),
    focus: [...namesOf(clinician.conditions), ...namesOf(clinician.modalities)],
  };
}

// Count providers matching a slug within one taxonomy dimension.
function optionsFor(
  labels: [string, string][],
  countFor: (slug: string) => number,
): FilterOption[] {
  return labels
    .map(([slug, label]) => ({ slug, label, count: countFor(slug) }))
    .filter((option) => option.count > 0);
}

export function buildDirectoryData(
  clinicians: ClinicianWithRelations[],
): DirectoryData {
  const providers = clinicians.map(toDirectoryProvider);

  const countIn = (
    dimension: (provider: DirectoryProvider) => string[],
    slug: string,
  ) => providers.filter((provider) => dimension(provider).includes(slug)).length;

  // Locations follow the office order, with telehealth last. Telehealth always
  // covers the full roster.
  const locations: FilterOption[] = [
    ...officeGeo
      .map((office) => ({
        slug: office.slug,
        label: office.townName,
        count: countIn((provider) => provider.locationSlugs, office.slug),
      }))
      .filter((option) => option.count > 0),
    {
      slug: TELEHEALTH_SLUG,
      label: TELEHEALTH_LABEL,
      count: providers.length,
    },
  ];

  return {
    providers,
    filters: {
      locations,
      specialties: optionsFor(conditionLabels, (slug) =>
        countIn((provider) => provider.conditionSlugs, slug),
      ),
      approaches: optionsFor(modalityLabels, (slug) =>
        countIn((provider) => provider.modalitySlugs, slug),
      ),
      audiences: optionsFor(populationLabels, (slug) =>
        countIn((provider) => provider.populationSlugs, slug),
      ),
    },
  };
}
