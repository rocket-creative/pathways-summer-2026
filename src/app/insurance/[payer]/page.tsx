import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { payerHubDecision, robotsFor } from "@/lib/indexing";
import { EntityHub } from "@/components/EntityHub";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { organizationId, site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ payer: string }> };

export async function generateStaticParams() {
  const insurers = await prisma.insurer.findMany({ select: { slug: true } });
  return insurers.map((row) => ({ payer: row.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { payer: slug } = await params;
  const insurer = await prisma.insurer.findUnique({ where: { slug } });
  if (!insurer) return {};

  const title = `Does ${insurer.name} cover therapy in New York?`;
  const description = `${insurer.name} and therapy at Pathways Within on Long Island. ${insurer.outOfNetwork ? "We are out of network with " + insurer.name + "; we can help you use your out of network benefits." : "We are in network with " + insurer.name + "."} Verify your benefits before your first visit.`;
  const path = `/insurance/${slug}`;
  const decision = payerHubDecision({ contentApproved: insurer.contentApproved });

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function PayerHubPage({ params }: PageProps) {
  const { payer: slug } = await params;
  const insurer = await prisma.insurer.findUnique({ where: { slug } });
  if (!insurer) notFound();

  const path = `/insurance/${slug}`;
  const officeTowns = await prisma.town.findMany({
    where: { isOfficeTown: true },
    orderBy: { sortOrder: "asc" },
  });

  const coverageAnswer = insurer.outOfNetwork
    ? `Pathways Within is out of network with ${insurer.name}. Many ${insurer.name} plans include out of network benefits that can reimburse part of the cost of therapy. We provide the documentation you need to submit a claim, and we confirm your benefits before your first visit.`
    : `Pathways Within is in network with ${insurer.name}. We confirm your specific benefits, including any copay or deductible, before your first visit so there are no surprises.`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${site.url}${path}#faq`,
            mainEntity: [
              {
                "@type": "Question",
                name: `Does ${insurer.name} cover therapy at Pathways Within?`,
                acceptedAnswer: { "@type": "Answer", text: coverageAnswer },
              },
            ],
            publisher: { "@id": organizationId },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insurance", path: "/insurance" },
            { name: insurer.name, path },
          ]),
        ]}
      />
      <EntityHub
        eyebrow="Insurance"
        title={`Does ${insurer.name} cover therapy in New York?`}
        imageLabel="Front desk"
        intro={<p>{coverageAnswer}</p>}
        ctaPayer={insurer.name}
      >
        {insurer.contentApproved && insurer.summary ? (
          <section
            aria-labelledby="coverage-heading"
            className="mt-section border-t border-rule pt-lg"
            style={{ contentVisibility: "auto" }}
          >
            <h2 id="coverage-heading" className="text-h2 font-medium">
              Using your {insurer.name} benefits
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {insurer.summary.split("\n\n").map((paragraph, index) => (
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
            Offices accepting {insurer.name}
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {officeTowns.map((town) => (
              <li key={town.id} className="border-b border-rule">
                <Link
                  href={`/insurance/${slug}/${town.slug}`}
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
