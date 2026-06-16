import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { EntityTown } from "@/components/EntityTown";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getTherapyService, therapyServices } from "@/lib/therapyServices";
import { site } from "@/lib/site";
import { therapyServiceImages } from "@/lib/wisdomImages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return therapyServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getTherapyService(slug);
  if (!service) return {};

  const title = `${service.name} on Long Island`;
  const path = `/services/${slug}`;
  return {
    title,
    description: service.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: service.summary,
      url: path,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getTherapyService(slug);
  if (!service) notFound();

  const path = `/services/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            path,
            description: service.summary,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Therapy", path: "/therapy" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
        ]}
      />
      <EntityTown
        breadcrumb={[
          { name: "Therapy", path: "/therapy" },
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ]}
        eyebrow="Pathway to Wisdom"
        title={service.name}
        intro={service.summary}
        imageLabel={service.name}
        imageSrc={therapyServiceImages[slug]?.src}
        imageAlt={therapyServiceImages[slug]?.alt}
      >
        {service.body ? (
          <section
            aria-labelledby="about-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="about-heading" className="text-h2 font-medium">
              About {service.name.toLowerCase()}
            </h2>
            <div className="mt-md max-w-2xl space-y-md text-text-secondary">
              {service.body.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        {service.bullets.length > 0 ? (
          <section
            aria-labelledby="includes-heading"
            className="mt-section border-t border-rule pt-lg"
          >
            <h2 id="includes-heading" className="text-h2 font-medium">
              What to expect
            </h2>
            <ul className="mt-lg border-t border-rule">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="border-b border-rule py-md text-text-secondary"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </EntityTown>
    </>
  );
}
