import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loadLicensedState, resolveStateSegment } from "@/lib/telehealth";
import { robotsFor, telehealthDecision } from "@/lib/indexing";
import { EntityTown } from "@/components/EntityTown";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import {
  breadcrumbSchema,
  conditionSchema,
  telehealthSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ state: string; segment: string }> };

// Prerender indexable state x condition combinations only (licensed state with
// an approved condition). Metros gate to real demand and are added later.
export async function generateStaticParams() {
  const [states, conditions] = await Promise.all([
    prisma.geoState.findMany({
      where: { licensed: true },
      select: { slug: true },
    }),
    prisma.condition.findMany({
      where: { contentApproved: true },
      select: { slug: true },
    }),
  ]);
  return states.flatMap((state) =>
    conditions.map((condition) => ({
      state: state.slug,
      segment: condition.slug,
    })),
  );
}

async function load(stateSlug: string, segmentSlug: string) {
  const state = await loadLicensedState(stateSlug);
  if (!state) return null;
  const segment = await resolveStateSegment(state.id, segmentSlug);
  if (!segment) return null;
  return { state, segment };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { state: stateSlug, segment: segmentSlug } = await params;
  const data = await load(stateSlug, segmentSlug);
  if (!data) return {};

  const { state, segment } = data;
  const path = `/online-therapy/${stateSlug}/${segmentSlug}`;

  if (segment.kind === "condition") {
    const name = segment.condition.name;
    return {
      title: `Online ${name.toLowerCase()} therapy in ${state.name}`,
      description: `Secure online ${name.toLowerCase()} therapy for ${state.name} residents at Pathways Within. Licensed clinicians, most major insurers.`,
      alternates: { canonical: path },
      robots: robotsFor(
        telehealthDecision({
          licensed: state.licensed,
          contentApproved: segment.condition.contentApproved,
        }),
      ),
      openGraph: {
        title: `Online ${name.toLowerCase()} therapy in ${state.name} | ${site.name}`,
        url: path,
      },
    };
  }

  return {
    title: `Online therapy in ${segment.metro.name}, ${state.code}`,
    description: `Secure online therapy for ${segment.metro.name} residents at Pathways Within. Licensed in ${state.name}.`,
    alternates: { canonical: path },
    robots: robotsFor(
      telehealthDecision({ licensed: state.licensed, contentApproved: false }),
    ),
    openGraph: {
      title: `Online therapy in ${segment.metro.name}, ${state.code} | ${site.name}`,
      url: path,
    },
  };
}

export default async function StateSegmentPage({ params }: PageProps) {
  const { state: stateSlug, segment: segmentSlug } = await params;
  const data = await load(stateSlug, segmentSlug);
  if (!data) notFound();

  const { state, segment } = data;
  const statePath = `/online-therapy/${stateSlug}`;
  const path = `${statePath}/${segmentSlug}`;

  if (segment.kind === "condition") {
    const condition = segment.condition;
    return (
      <>
        <JsonLd
          data={[
            conditionSchema(condition, path),
            telehealthSchema(state, statePath),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: `Online therapy in ${state.name}`, path: statePath },
              { name: condition.name, path },
            ]),
          ]}
        />
        <EntityTown
          breadcrumb={[
            { name: `Online therapy in ${state.name}`, path: statePath },
            { name: condition.name, path },
          ]}
          eyebrow="Online therapy"
          title={`Online ${condition.name.toLowerCase()} therapy in ${state.name}`}
          imageLabel="Telehealth session"
          intro={
            <p>
              Secure online {condition.name.toLowerCase()} therapy for{" "}
              {state.name} residents. Our clinicians are licensed in{" "}
              {state.name}, with evening availability and most major insurers
              accepted.
            </p>
          }
        >
          {condition.contentApproved && condition.body ? (
            <section
              aria-labelledby="about-heading"
              className="mt-section border-t border-rule pt-lg"
            >
              <h2 id="about-heading" className="text-h2 font-medium">
                Online {condition.name.toLowerCase()} therapy in {state.name}
              </h2>
              <div className="mt-md max-w-2xl space-y-md text-text-secondary">
                {condition.body.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}
        </EntityTown>
      </>
    );
  }

  const metro = segment.metro;
  const conditions = await prisma.condition.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <JsonLd
        data={[
          telehealthSchema(state, statePath),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Online therapy in ${state.name}`, path: statePath },
            { name: metro.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name: `Online therapy in ${state.name}`, path: statePath },
          { name: metro.name, path },
        ]}
        eyebrow="Online therapy"
        title={`Online therapy in ${metro.name}`}
        imageLabel="Telehealth session"
        intro={
          <p>
            Secure online therapy for {metro.name} residents. Our clinicians are
            licensed in {state.name}.
          </p>
        }
      >
        <section
          aria-labelledby="conditions-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="conditions-heading" className="text-h2 font-medium">
            What we help with in {metro.name}
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {conditions.map((condition) => (
              <li key={condition.id} className="border-b border-rule">
                <Link
                  href={`${path}/${condition.slug}`}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">{condition.name}</span>
                  <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </EntityTown>
    </>
  );
}
