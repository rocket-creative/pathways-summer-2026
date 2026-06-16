import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { EntityCta } from "@/components/EntityCta";
import { ProviderDirectory } from "@/components/ProviderDirectory";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { buildDirectoryData } from "@/lib/providerDirectory";

export const metadata: Metadata = {
  title: "Provider directory",
  description:
    "Find a licensed Pathways Within therapist by location, specialty, and the people they work with. In person on Long Island and online across NY, NJ, NC, and FL.",
  alternates: { canonical: "/clinicians" },
  openGraph: {
    title: `Provider directory | ${site.name}`,
    description:
      "Find a licensed Pathways Within therapist by location and specialty.",
    url: "/clinicians",
  },
};

export default async function CliniciansIndexPage() {
  const clinicians = await prisma.clinician.findMany({
    orderBy: { name: "asc" },
    include: {
      offices: true,
      conditions: true,
      modalities: true,
      populations: true,
    },
  });

  const directory = buildDirectoryData(clinicians);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pathways Within provider directory",
    itemListElement: directory.providers.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/clinicians/${provider.slug}`,
      name: provider.name,
    })),
  };

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Therapy", path: "/therapy" },
            { name: "Provider directory", path: "/clinicians" },
          ]),
          itemList,
        ]}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Provider directory
        </p>
        <h1 className="mt-lg max-w-[15ch] text-h1 font-medium leading-[1.05]">
          Find your therapist
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          Browse our licensed team by location, specialty, and the people they
          work with. Every therapist sees clients in person on Long Island and
          online across New York, New Jersey, North Carolina, and Florida.
        </p>

        <ProviderDirectory data={directory} />

        <EntityCta />
      </article>
    </main>
  );
}
