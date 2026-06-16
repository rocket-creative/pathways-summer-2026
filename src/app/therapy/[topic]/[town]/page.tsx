import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  clinicianCountForTopicAtOffices,
  resolveTopic,
  topicApproved,
  topicEyebrow,
  topicName,
} from "@/lib/topic";
import { robotsFor, townLeafDecision } from "@/lib/indexing";
import { EntityTown } from "@/components/EntityTown";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  conditionSchema,
  modalitySchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ topic: string; town: string }> };

// Prerender only the indexable set (topic with approved content and a treating
// clinician, town with an in-range office and real local detail). Everything
// else renders on demand and stays noindex. Today this set is empty by design.
export async function generateStaticParams() {
  const [conditions, modalities, towns] = await Promise.all([
    prisma.condition.findMany({
      where: { contentApproved: true, clinicians: { some: {} } },
      select: { slug: true },
    }),
    prisma.modality.findMany({
      where: { contentApproved: true, clinicians: { some: {} } },
      select: { slug: true },
    }),
    prisma.town.findMany({
      where: { localDetail: { not: null }, offices: { some: {} } },
      select: { slug: true },
    }),
  ]);
  const topics = [...conditions, ...modalities];
  return topics.flatMap((topic) =>
    towns.map((town) => ({ topic: topic.slug, town: town.slug })),
  );
}

async function load(topicSlug: string, townSlug: string) {
  const [topic, town] = await Promise.all([
    resolveTopic(topicSlug),
    prisma.town.findUnique({
      where: { slug: townSlug },
      include: { offices: true },
    }),
  ]);
  if (!topic || !town) return null;

  const officeIds = town.offices.map((office) => office.id);
  const clinicianCount = await clinicianCountForTopicAtOffices(topic, officeIds);
  const decision = townLeafDecision({
    contentApproved: topicApproved(topic),
    officeInRangeCount: town.offices.length,
    clinicianCount,
    hasLocalDetail: Boolean(town.localDetail),
  });
  return { topic, town, decision };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic: topicSlug, town: townSlug } = await params;
  const data = await load(topicSlug, townSlug);
  if (!data) return {};

  const { topic, town, decision } = data;
  const name = topicName(topic);
  const title = `${name} therapy in ${town.name}, NY`;
  const description = `In person ${name.toLowerCase()} therapy in ${town.name}, Long Island, at Pathways Within. Most major New York insurers accepted.`;
  const path = `/therapy/${topicSlug}/${townSlug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function TopicTownPage({ params }: PageProps) {
  const { topic: topicSlug, town: townSlug } = await params;
  const data = await load(topicSlug, townSlug);
  if (!data) notFound();

  const { topic, town } = data;
  const name = topicName(topic);
  const path = `/therapy/${topicSlug}/${townSlug}`;

  const jsonLd =
    topic.kind === "condition"
      ? conditionSchema(topic.condition, `/therapy/${topicSlug}`)
      : modalitySchema(topic.modality, `/therapy/${topicSlug}`);

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name, path: `/therapy/${topicSlug}` },
            { name: town.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name, path: `/therapy/${topicSlug}` },
          { name: town.name, path },
        ]}
        eyebrow={topicEyebrow(topic)}
        title={`${name} therapy in ${town.name}`}
        imageLabel={`${town.name} office`}
        ctaTown={town.name}
        intro={
          <p>
            In person {name.toLowerCase()} therapy at our {town.name} office on
            Long Island, with dedicated parking. Most major New York insurers
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
              {name} therapy in {town.name}
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
