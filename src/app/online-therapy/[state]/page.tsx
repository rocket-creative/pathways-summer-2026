import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loadLicensedState } from "@/lib/telehealth";
import { robotsFor, telehealthDecision } from "@/lib/indexing";
import { EntityHub } from "@/components/EntityHub";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema, telehealthSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ state: string }> };

// Only licensed states are prerendered. Any other state slug 404s.
export async function generateStaticParams() {
  const states = await prisma.geoState.findMany({
    where: { licensed: true },
    select: { slug: true },
  });
  return states.map((row) => ({ state: row.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { state: slug } = await params;
  const state = await loadLicensedState(slug);
  if (!state) return {};

  const title = `Online therapy in ${state.name}`;
  const description = `Pathways Within offers secure online therapy for residents of ${state.name}. Licensed clinicians, evening availability, and most major insurers.`;
  const path = `/online-therapy/${slug}`;
  const decision = telehealthDecision({
    licensed: state.licensed,
    contentApproved: state.contentApproved,
  });

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function StateHubPage({ params }: PageProps) {
  const { state: slug } = await params;
  const state = await loadLicensedState(slug);
  if (!state) notFound();

  const path = `/online-therapy/${slug}`;
  const [conditions, metros] = await Promise.all([
    prisma.condition.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.metro.findMany({
      where: { stateId: state.id },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          telehealthSchema(state, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Online therapy in ${state.name}`, path },
          ]),
        ]}
      />
      <EntityHub
        eyebrow="Online therapy"
        title={`Online therapy in ${state.name}`}
        imageLabel="Telehealth session"
        intro={
          <p>
            Pathways Within offers secure online therapy for residents of{" "}
            {state.name}. Our clinicians are licensed in {state.name}, with
            evening availability and most major insurers accepted.
          </p>
        }
      >
        {state.contentApproved && state.summary ? (
          <section
            aria-labelledby="about-heading"
            className="mt-section border-t border-rule pt-lg"
            style={{ contentVisibility: "auto" }}
          >
            <h2 id="about-heading" className="text-h2 font-medium">
              Online therapy across {state.name}
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {state.summary.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="conditions-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="conditions-heading" className="text-h2 font-medium">
            What we help with online
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {conditions.map((condition) => (
              <li key={condition.id} className="border-b border-rule">
                <Link
                  href={`/online-therapy/${slug}/${condition.slug}`}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">{condition.name}</span>
                  <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {metros.length > 0 ? (
          <section
            aria-labelledby="metros-heading"
            className="mt-2xl border-t border-rule pt-lg"
          >
            <h2 id="metros-heading" className="text-h2 font-medium">
              Metro areas in {state.name}
            </h2>
            <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
              {metros.map((metro) => (
                <li key={metro.id} className="border-b border-rule">
                  <Link
                    href={`/online-therapy/${slug}/${metro.slug}`}
                    className="group flex items-center justify-between gap-md py-md"
                  >
                    <span className="text-lg">{metro.name}</span>
                    <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </EntityHub>
    </>
  );
}
