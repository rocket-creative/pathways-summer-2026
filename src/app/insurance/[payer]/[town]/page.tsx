import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { payerTownDecision, robotsFor } from "@/lib/indexing";
import { EntityTown } from "@/components/EntityTown";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ payer: string; town: string }> };

export async function generateStaticParams() {
  const [insurers, towns] = await Promise.all([
    prisma.insurer.findMany({
      where: { contentApproved: true },
      select: { slug: true },
    }),
    prisma.town.findMany({
      where: { localDetail: { not: null }, offices: { some: {} } },
      select: { slug: true },
    }),
  ]);
  return insurers.flatMap((insurer) =>
    towns.map((town) => ({ payer: insurer.slug, town: town.slug })),
  );
}

async function load(payerSlug: string, townSlug: string) {
  const [insurer, town] = await Promise.all([
    prisma.insurer.findUnique({ where: { slug: payerSlug } }),
    prisma.town.findUnique({
      where: { slug: townSlug },
      include: { offices: true },
    }),
  ]);
  if (!insurer || !town) return null;

  const decision = payerTownDecision({
    officeInRangeCount: town.offices.length,
    hasLocalDetail: Boolean(town.localDetail),
  });
  return { insurer, town, decision };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { payer: payerSlug, town: townSlug } = await params;
  const data = await load(payerSlug, townSlug);
  if (!data) return {};

  const { insurer, town, decision } = data;
  const title = `Therapy that takes ${insurer.name} in ${town.name}, NY`;
  const description = `${insurer.name} therapy at the Pathways Within ${town.name} office on Long Island. Verify your benefits before your first visit.`;
  const path = `/insurance/${payerSlug}/${townSlug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function PayerTownPage({ params }: PageProps) {
  const { payer: payerSlug, town: townSlug } = await params;
  const data = await load(payerSlug, townSlug);
  if (!data) notFound();

  const { insurer, town } = data;
  const path = `/insurance/${payerSlug}/${townSlug}`;

  const intro = insurer.outOfNetwork
    ? `Our ${town.name} office can help you use your out of network ${insurer.name} benefits for therapy. We confirm your benefits before your first visit.`
    : `Our ${town.name} office is in network with ${insurer.name}. We confirm your benefits before your first visit.`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: insurer.name, path: `/insurance/${payerSlug}` },
          { name: town.name, path },
        ])}
      />
      <EntityTown
        breadcrumb={[
          { name: "Insurance", path: "/insurance" },
          { name: insurer.name, path: `/insurance/${payerSlug}` },
          { name: town.name, path },
        ]}
        eyebrow="Insurance"
        title={`Therapy that takes ${insurer.name} in ${town.name}`}
        imageLabel={`${town.name} office`}
        intro={<p>{intro}</p>}
        ctaPayer={insurer.name}
        ctaTown={town.name}
      >
        {town.localDetail ? (
          <section
            aria-labelledby="local-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="local-heading" className="text-h2 font-medium">
              {insurer.name} therapy in {town.name}
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
