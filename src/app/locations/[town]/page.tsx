import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { cityLine, mapsUrl, streetLine } from "@/lib/office";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema, officeSchema } from "@/lib/schema";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ town: string }> };

export async function generateStaticParams() {
  const offices = await prisma.office.findMany({ select: { slug: true } });
  return offices.map((office) => ({ town: office.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { town } = await params;
  const office = await prisma.office.findUnique({ where: { slug: town } });
  if (!office) return {};

  const title = `Therapy in ${office.townName}, ${office.state}`;
  const description = `In person therapy at the Pathways Within ${office.townName} office on Long Island, with dedicated parking. In network with major New York insurers, and telehealth is available.`;

  return {
    title,
    description,
    alternates: { canonical: `/locations/${office.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `/locations/${office.slug}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { town } = await params;
  const office = await prisma.office.findUnique({
    where: { slug: town },
    include: { clinicians: true },
  });
  if (!office) notFound();

  const insurers = await prisma.insurer.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const inNetwork = insurers.filter((insurer) => !insurer.outOfNetwork);
  const outOfNetwork = insurers.filter((insurer) => insurer.outOfNetwork);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          officeSchema(office),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: office.townName, path: `/locations/${office.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-sm text-xs uppercase tracking-[0.12em] text-text-secondary"
        >
          <Link href="/locations" className="hover:text-accent">
            Locations
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span className="text-text">{office.townName}</span>
        </nav>

        <div className="mt-lg grid gap-2xl md:grid-cols-[3fr_2fr] md:items-end">
          <div>
            <h1 className="max-w-[14ch] text-display font-medium leading-[0.98]">
              Therapy in {office.townName}.
            </h1>
            <p className="mt-lg max-w-xl text-lg text-text-secondary">
              Our {office.townName} office offers in person therapy for
              individuals, couples, and families, with dedicated parking.
              Telehealth is available for residents of New York, New Jersey,
              North Carolina, and Florida.
            </p>
          </div>
          <ImagePlaceholder aspect="4/5" label={`${office.townName} office`} />
        </div>

        <div className="mt-section grid gap-2xl md:grid-cols-[2fr_1fr]">
          <div>
            <section aria-labelledby="visit-heading" className="border-t border-rule pt-md">
              <h2 id="visit-heading" className="text-h2 font-medium">
                Visit this office
              </h2>
              <address className="mt-md not-italic text-lg text-text-secondary">
                {streetLine(office)}
                <br />
                {cityLine(office)}
              </address>
              {office.hasParking ? (
                <p className="mt-sm text-text-secondary">
                  Dedicated parking is available on site.
                </p>
              ) : null}
              <div className="mt-lg flex flex-wrap gap-lg text-sm uppercase tracking-[0.08em]">
                <a
                  href={mapsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-sm hover:text-accent"
                >
                  Get directions <Arrow />
                </a>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center gap-sm hover:text-accent"
                >
                  Call {site.phoneDisplay} <Arrow />
                </a>
              </div>
            </section>

            {office.clinicians.length > 0 ? (
              <section aria-labelledby="clinicians-heading" className="mt-2xl border-t border-rule pt-md">
                <h2 id="clinicians-heading" className="text-h2 font-medium">
                  Clinicians at this office
                </h2>
                <ul className="mt-md border-t border-rule">
                  {office.clinicians.map((clinician) => (
                    <li
                      key={clinician.id}
                      className="border-b border-rule py-sm"
                    >
                      {clinician.name}
                      {clinician.credentials ? `, ${clinician.credentials}` : ""}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside aria-labelledby="insurance-heading" className="border-t border-rule pt-md">
            <h2 id="insurance-heading" className="text-h2 font-medium">
              Insurance
            </h2>
            <p className="mt-md text-text-secondary">
              We are in network with most major New York insurers. Once we
              confirm your benefits, we build a plan that respects them.
            </p>
            <ul className="mt-md border-t border-rule text-sm">
              {inNetwork.map((insurer) => (
                <li key={insurer.id} className="border-b border-rule py-sm">
                  {insurer.name}
                </li>
              ))}
            </ul>
            {outOfNetwork.length > 0 ? (
              <p className="mt-md text-xs uppercase tracking-[0.08em] text-text-secondary">
                Out of network: {outOfNetwork.map((i) => i.name).join(", ")}
              </p>
            ) : null}
          </aside>
        </div>

        <EntityCta town={office.slug} />
      </article>
    </main>
  );
}
