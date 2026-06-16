import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { robotsFor, townLeafDecision } from "@/lib/indexing";
import { EntityTown } from "@/components/EntityTown";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, populationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ population: string; town: string }> };

export async function generateStaticParams() {
  const [populations, towns] = await Promise.all([
    prisma.population.findMany({
      where: { contentApproved: true, clinicians: { some: {} } },
      select: { slug: true },
    }),
    prisma.town.findMany({
      where: { localDetail: { not: null }, offices: { some: {} } },
      select: { slug: true },
    }),
  ]);
  return populations.flatMap((population) =>
    towns.map((town) => ({ population: population.slug, town: town.slug })),
  );
}

async function load(populationSlug: string, townSlug: string) {
  const [population, town] = await Promise.all([
    prisma.population.findUnique({ where: { slug: populationSlug } }),
    prisma.town.findUnique({
      where: { slug: townSlug },
      include: { offices: true },
    }),
  ]);
  if (!population || !town) return null;

  const officeIds = town.offices.map((office) => office.id);
  const clinicianCount =
    officeIds.length === 0
      ? 0
      : await prisma.clinician.count({
          where: {
            offices: { some: { id: { in: officeIds } } },
            populations: { some: { id: population.id } },
          },
        });

  const decision = townLeafDecision({
    contentApproved: population.contentApproved,
    officeInRangeCount: town.offices.length,
    clinicianCount,
    hasLocalDetail: Boolean(town.localDetail),
  });
  return { population, town, decision };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { population: populationSlug, town: townSlug } = await params;
  const data = await load(populationSlug, townSlug);
  if (!data) return {};

  const { population, town, decision } = data;
  const label = population.name.toLowerCase();
  const title = `Therapy for ${label} in ${town.name}, NY`;
  const description = `In person therapy for ${label} in ${town.name}, Long Island, at Pathways Within. Most major New York insurers accepted.`;
  const path = `/for/${populationSlug}/${townSlug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function PopulationTownPage({ params }: PageProps) {
  const { population: populationSlug, town: townSlug } = await params;
  const data = await load(populationSlug, townSlug);
  if (!data) notFound();

  const { population, town } = data;
  const label = population.name.toLowerCase();
  const path = `/for/${populationSlug}/${townSlug}`;

  return (
    <>
      <JsonLd
        data={[
          populationSchema(population, `/for/${populationSlug}`),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `For ${label}`, path: `/for/${populationSlug}` },
            { name: town.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name: `For ${label}`, path: `/for/${populationSlug}` },
          { name: town.name, path },
        ]}
        eyebrow="Who we help"
        title={`Therapy for ${label} in ${town.name}`}
        imageLabel={`${town.name} office`}
        ctaTown={town.name}
        intro={
          <p>
            In person therapy for {label} at our {town.name} office on Long
            Island, with dedicated parking. Most major New York insurers
            accepted.
          </p>
        }
      >
        {town.localDetail ? (
          <section
            aria-labelledby="local-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="local-heading" className="text-h2 font-medium">
              Therapy for {label} in {town.name}
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {town.localDetail.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}
      </EntityTown>
    </>
  );
}
