import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loadLicensedState, resolveStateSegment } from "@/lib/telehealth";
import { robotsFor, telehealthDecision } from "@/lib/indexing";
import { EntityTown } from "@/components/EntityTown";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  conditionSchema,
  telehealthSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ state: string; segment: string; condition: string }>;
};

// Metro x condition. Metros are empty until real demand is confirmed, so this
// set is empty today and these pages render on demand and stay noindex.
export async function generateStaticParams() {
  const metros = await prisma.metro.findMany({
    where: { state: { licensed: true } },
    select: { slug: true, state: { select: { slug: true } } },
  });
  if (metros.length === 0) return [];
  const conditions = await prisma.condition.findMany({
    where: { contentApproved: true },
    select: { slug: true },
  });
  return metros.flatMap((metro) =>
    conditions.map((condition) => ({
      state: metro.state.slug,
      segment: metro.slug,
      condition: condition.slug,
    })),
  );
}

async function load(
  stateSlug: string,
  segmentSlug: string,
  conditionSlug: string,
) {
  const state = await loadLicensedState(stateSlug);
  if (!state) return null;
  const segment = await resolveStateSegment(state.id, segmentSlug);
  // This route is only valid when the segment is a metro.
  if (!segment || segment.kind !== "metro") return null;
  const condition = await prisma.condition.findUnique({
    where: { slug: conditionSlug },
  });
  if (!condition) return null;
  return { state, metro: segment.metro, condition };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { state: stateSlug, segment, condition } = await params;
  const data = await load(stateSlug, segment, condition);
  if (!data) return {};

  const name = data.condition.name;
  const path = `/online-therapy/${stateSlug}/${segment}/${condition}`;
  return {
    title: `Online ${name.toLowerCase()} therapy in ${data.metro.name}, ${data.state.code}`,
    description: `Secure online ${name.toLowerCase()} therapy for ${data.metro.name} residents at Pathways Within. Licensed in ${data.state.name}.`,
    alternates: { canonical: path },
    robots: robotsFor(
      telehealthDecision({
        licensed: data.state.licensed,
        contentApproved: data.condition.contentApproved,
      }),
    ),
    openGraph: {
      title: `Online ${name.toLowerCase()} therapy in ${data.metro.name}, ${data.state.code} | ${site.name}`,
      url: path,
    },
  };
}

export default async function MetroConditionPage({ params }: PageProps) {
  const { state: stateSlug, segment, condition: conditionSlug } = await params;
  const data = await load(stateSlug, segment, conditionSlug);
  if (!data) notFound();

  const { state, metro, condition } = data;
  const statePath = `/online-therapy/${stateSlug}`;
  const metroPath = `${statePath}/${segment}`;
  const path = `${metroPath}/${conditionSlug}`;

  return (
    <>
      <JsonLd
        data={[
          conditionSchema(condition, path),
          telehealthSchema(state, statePath),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Online therapy in ${state.name}`, path: statePath },
            { name: metro.name, path: metroPath },
            { name: condition.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name: `Online therapy in ${state.name}`, path: statePath },
          { name: metro.name, path: metroPath },
          { name: condition.name, path },
        ]}
        eyebrow="Online therapy"
        title={`Online ${condition.name.toLowerCase()} therapy in ${metro.name}`}
        imageLabel="Telehealth session"
        intro={
          <p>
            Secure online {condition.name.toLowerCase()} therapy for{" "}
            {metro.name} residents. Our clinicians are licensed in {state.name}.
          </p>
        }
      >
        {condition.contentApproved && condition.body ? (
          <section
            aria-labelledby="about-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="about-heading" className="text-h2 font-medium">
              Online {condition.name.toLowerCase()} therapy in {metro.name}
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
