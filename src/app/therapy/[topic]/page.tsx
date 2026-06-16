import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  resolveTopic,
  topicApproved,
  topicBody,
  topicEyebrow,
  topicName,
} from "@/lib/topic";
import { hubDecision, robotsFor } from "@/lib/indexing";
import { EntityHub } from "@/components/EntityHub";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import {
  breadcrumbSchema,
  conditionSchema,
  modalitySchema,
} from "@/lib/schema";
import { site } from "@/lib/site";
import { wisdomTopicImages } from "@/lib/wisdomImages";

export const dynamicParams = true;

type PageProps = { params: Promise<{ topic: string }> };

// Hub pages are bounded (conditions + modalities), so prerender them all.
// Each is still noindex until it has approved content and a clinician.
export async function generateStaticParams() {
  const [conditions, modalities] = await Promise.all([
    prisma.condition.findMany({ select: { slug: true } }),
    prisma.modality.findMany({ select: { slug: true } }),
  ]);
  return [...conditions, ...modalities].map((row) => ({ topic: row.slug }));
}

function clinicianCount(topic: Awaited<ReturnType<typeof resolveTopic>>): number {
  if (!topic) return 0;
  return topic.kind === "condition"
    ? topic.condition.clinicians.length
    : topic.modality.clinicians.length;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = await resolveTopic(slug);
  if (!topic) return {};

  const name = topicName(topic);
  const title = `${name} therapy on Long Island`;
  const description = `Pathways Within offers ${name.toLowerCase()} therapy across our five Long Island offices, with telehealth for New York, New Jersey, North Carolina, and Florida.`;
  const path = `/therapy/${slug}`;
  const decision = hubDecision({
    contentApproved: topicApproved(topic),
    clinicianCount: clinicianCount(topic),
  });

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function TopicHubPage({ params }: PageProps) {
  const { topic: slug } = await params;
  const topic = await resolveTopic(slug);
  if (!topic) notFound();

  const path = `/therapy/${slug}`;
  const name = topicName(topic);
  const body = topicBody(topic);
  const approved = topicApproved(topic);

  const officeTowns = await prisma.town.findMany({
    where: { isOfficeTown: true },
    orderBy: { sortOrder: "asc" },
  });

  const jsonLd =
    topic.kind === "condition"
      ? conditionSchema(topic.condition, path)
      : modalitySchema(topic.modality, path);

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: name, path },
          ]),
        ]}
      />
      <EntityHub
        eyebrow={topicEyebrow(topic)}
        title={`${name} therapy on Long Island`}
        imageLabel={`${name} therapy`}
        imageSrc={wisdomTopicImages[slug]?.src}
        imageAlt={wisdomTopicImages[slug]?.alt}
        intro={
          <p>
            Pathways Within offers {name.toLowerCase()} therapy across five Long
            Island offices. In person care with dedicated parking, and
            telehealth for residents of New York, New Jersey, North Carolina,
            and Florida.
          </p>
        }
      >
        {approved && body ? (
          <section
            aria-labelledby="about-heading"
            className="mt-section border-t border-rule pt-lg"
            style={{ contentVisibility: "auto" }}
          >
            <h2 id="about-heading" className="text-h2 font-medium">
              About {name.toLowerCase()} therapy
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {body.split("\n\n").map((paragraph, index) => (
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
          <ul className="mt-lg border-t border-rule">
            {officeTowns.map((town) => (
              <li key={town.id} className="border-b border-rule">
                <Link
                  href={`/therapy/${slug}/${town.slug}`}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">
                    {name} therapy in {town.name}
                  </span>
                  <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </EntityHub>
    </>
  );
}
