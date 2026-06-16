import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { robotsFor } from "@/lib/indexing";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { breadcrumbSchema } from "@/lib/schema";
import { organizationId, site } from "@/lib/site";
import { clinicianImage } from "@/lib/clinicianImages";

export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

// Prerender only clinicians who have a published bio.
export async function generateStaticParams() {
  const clinicians = await prisma.clinician.findMany({
    where: { bio: { not: null } },
    select: { slug: true },
  });
  return clinicians.map((clinician) => ({ slug: clinician.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const clinician = await prisma.clinician.findUnique({ where: { slug } });
  if (!clinician) return {};

  const credentials = clinician.credentials ? `, ${clinician.credentials}` : "";
  const title = `${clinician.name}${credentials}`;
  const path = `/clinicians/${slug}`;
  return {
    title,
    description:
      clinician.title ?? `${clinician.name}, therapist at ${site.name}.`,
    alternates: { canonical: path },
    robots: robotsFor({
      index: Boolean(clinician.bio),
      reason: clinician.bio ? "published bio" : "no bio yet",
    }),
    openGraph: { title: `${title} | ${site.name}`, url: path },
  };
}

export default async function ClinicianPage({ params }: PageProps) {
  const { slug } = await params;
  const clinician = await prisma.clinician.findUnique({
    where: { slug },
    include: { offices: true, conditions: true, modalities: true, populations: true },
  });
  if (!clinician) notFound();

  const path = `/clinicians/${slug}`;
  const photo = clinicianImage(clinician.slug, clinician.name);
  const specialties = [
    ...clinician.conditions.map((condition) => condition.name),
    ...clinician.modalities.map((modality) => modality.name),
    ...clinician.populations.map((population) => population.name),
  ];

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${site.url}${path}#person`,
            name: clinician.name,
            url: `${site.url}${path}`,
            jobTitle: clinician.title ?? "Therapist",
            ...(photo ? { image: `${site.url}${photo.src}` } : {}),
            worksFor: { "@id": organizationId },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Clinicians", path: "/clinicians" },
            { name: clinician.name, path },
          ]),
        ]}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-sm text-xs uppercase tracking-[0.12em] text-text-secondary"
        >
          <Link href="/clinicians" className="hover:text-accent">
            Clinicians
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span className="text-text">{clinician.name}</span>
        </nav>

        <div className="mt-lg grid gap-2xl md:grid-cols-[2fr_3fr] md:items-start">
          <ImagePlaceholder
            aspect="3/4"
            label={clinician.name}
            src={photo?.src}
            alt={photo?.alt}
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <div>
            <h1 className="text-h1 font-medium leading-[1.03]">
              {clinician.name}
              {clinician.credentials ? `, ${clinician.credentials}` : ""}
            </h1>
            {clinician.title ? (
              <p className="mt-md text-lg text-text-secondary">
                {clinician.title}
              </p>
            ) : null}
            {clinician.bio ? (
              <div className="mt-lg max-w-2xl space-y-md text-text-secondary">
                {clinician.bio.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {specialties.length > 0 ? (
              <section
                aria-labelledby="specialties-heading"
                className="mt-xl border-t border-rule pt-lg"
              >
                <h2
                  id="specialties-heading"
                  className="text-xs uppercase tracking-[0.12em] text-accent"
                >
                  Focus areas
                </h2>
                <ul className="mt-md flex flex-wrap gap-x-lg gap-y-sm">
                  {specialties.map((specialty) => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {clinician.offices.length > 0 ? (
              <p className="mt-lg text-sm text-text-secondary">
                Sees clients at{" "}
                {clinician.offices.map((office) => office.townName).join(", ")}.
              </p>
            ) : null}
          </div>
        </div>

        <EntityCta />
      </article>
    </main>
  );
}
