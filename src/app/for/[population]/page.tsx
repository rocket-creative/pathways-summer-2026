import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hubDecision, robotsFor } from "@/lib/indexing";
import { EntityHub } from "@/components/EntityHub";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema, populationSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { wisdomPopulationImages } from "@/lib/wisdomImages";

export const dynamicParams = true;

type PageProps = { params: Promise<{ population: string }> };

export async function generateStaticParams() {
  const populations = await prisma.population.findMany({ select: { slug: true } });
  return populations.map((row) => ({ population: row.slug }));
}

async function loadPopulation(slug: string) {
  return prisma.population.findUnique({
    where: { slug },
    include: { clinicians: true },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { population: slug } = await params;
  const population = await loadPopulation(slug);
  if (!population) return {};

  const title = `Therapy for ${population.name.toLowerCase()} on Long Island`;
  const description = `Pathways Within offers therapy for ${population.name.toLowerCase()} across five Long Island offices, with telehealth in New York, New Jersey, North Carolina, and Florida.`;
  const path = `/for/${slug}`;
  const decision = hubDecision({
    contentApproved: population.contentApproved,
    clinicianCount: population.clinicians.length,
  });

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function PopulationHubPage({ params }: PageProps) {
  const { population: slug } = await params;
  const population = await loadPopulation(slug);
  if (!population) notFound();

  const path = `/for/${slug}`;
  const label = population.name.toLowerCase();

  const officeTowns = await prisma.town.findMany({
    where: { isOfficeTown: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <JsonLd
        data={[
          populationSchema(population, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `For ${label}`, path },
          ]),
        ]}
      />
      <EntityHub
        eyebrow="Who we help"
        title={`Therapy for ${label} on Long Island`}
        imageLabel={`Therapy for ${label}`}
        imageSrc={wisdomPopulationImages[slug]?.src}
        imageAlt={wisdomPopulationImages[slug]?.alt}
        intro={
          <p>
            Pathways Within offers therapy for {label} across five Long Island
            offices, with dedicated parking. Telehealth is available for
            residents of New York, New Jersey, North Carolina, and Florida.
          </p>
        }
      >
        {population.contentApproved && population.body ? (
          <section
            aria-labelledby="about-heading"
            className="mt-section border-t border-rule pt-lg"
            style={{ contentVisibility: "auto" }}
          >
            <h2 id="about-heading" className="text-h2 font-medium">
              About therapy for {label}
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {population.body.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="towns-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="towns-heading" className="text-h2 font-medium">
            Where we offer this
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {officeTowns.map((town) => (
              <li key={town.id} className="border-b border-rule">
                <Link
                  href={`/for/${slug}/${town.slug}`}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">{town.name}</span>
                  <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </EntityHub>
    </>
  );
}
