import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { robotsFor } from "@/lib/indexing";
import { JsonLd } from "@/components/JsonLd";
import { EntityTown } from "@/components/EntityTown";
import { breadcrumbSchema, wellnessServiceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { wellnessServiceImages } from "@/lib/wellnessImages";

export const dynamicParams = true;

// The Json columns carry these shapes. They are authored in
// prisma/content/wellness.ts and stored verbatim.
type Section = { heading: string; body: string[] };
type Offering = { name: string; description: string; price?: string };
type Faq = { question: string; answer: string };

type PageProps = { params: Promise<{ service: string }> };

export async function generateStaticParams() {
  const services = await prisma.wellnessService.findMany({
    select: { slug: true },
  });
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await prisma.wellnessService.findUnique({ where: { slug } });
  if (!service) return {};

  const title = `${service.name} on Long Island`;
  const description =
    service.summary ??
    `${service.name} at Pathways Within Wellness on Long Island.`;
  const path = `/wellness/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor({
      index: service.contentApproved,
      reason: service.contentApproved ? "real service copy" : "copy not confirmed",
    }),
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
  };
}

export default async function WellnessServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = await prisma.wellnessService.findUnique({ where: { slug } });
  if (!service) notFound();

  const path = `/wellness/${slug}`;
  const image = wellnessServiceImages[slug];
  const sections = (service.sections as unknown as Section[]) ?? [];
  const offerings = (service.offerings as unknown as Offering[]) ?? [];
  const faqs = (service.faqs as unknown as Faq[]) ?? [];

  return (
    <>
      <JsonLd
        data={[
          wellnessServiceSchema(service, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Wellness", path: "/wellness" },
            { name: service.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name: "Wellness", path: "/wellness" },
          { name: service.name, path },
        ]}
        eyebrow="Pathway to Wellness"
        title={service.name}
        intro={service.intro ?? service.summary ?? undefined}
        imageLabel={service.name}
        imageSrc={image?.src}
        imageAlt={image?.alt}
      >
        {sections.map((section) => (
          <section
            key={section.heading}
            aria-label={section.heading}
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 className="max-w-[24ch] text-h2 font-medium">
              {section.heading}
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        {service.benefits.length > 0 ? (
          <section
            aria-labelledby="benefits-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="benefits-heading" className="text-h2 font-medium">
              Benefits
            </h2>
            <ul className="mt-lg grid gap-x-lg gap-y-sm sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="border-t border-rule py-sm text-text-secondary"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {offerings.length > 0 ? (
          <section
            aria-labelledby="offerings-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="offerings-heading" className="text-h2 font-medium">
              The menu
            </h2>
            <dl className="mt-lg divide-y divide-rule border-t border-rule">
              {offerings.map((offering) => (
                <div key={offering.name} className="py-lg">
                  <dt className="flex items-baseline justify-between gap-md">
                    <span className="text-lg font-medium">{offering.name}</span>
                    {offering.price ? (
                      <span className="shrink-0 text-sm uppercase tracking-[0.08em] text-text-secondary">
                        {offering.price}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="mt-sm max-w-2xl text-text-secondary">
                    {offering.description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section
            aria-labelledby="faq-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="faq-heading" className="text-h2 font-medium">
              Frequently asked questions
            </h2>
            <dl className="mt-lg divide-y divide-rule border-t border-rule">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="grid gap-md py-lg md:grid-cols-[2fr_3fr] md:gap-2xl"
                >
                  <dt className="text-lg font-medium">{item.question}</dt>
                  <dd className="text-text-secondary">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </EntityTown>
    </>
  );
}
