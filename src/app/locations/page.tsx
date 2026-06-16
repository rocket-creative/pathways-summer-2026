import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cityLine, streetLine } from "@/lib/office";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { AnchorButton } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Therapy Offices Across Long Island",
  description:
    "Pathways Within has five therapy offices across Nassau and Suffolk, with dedicated parking at each, plus telehealth for New York, New Jersey, North Carolina, and Florida.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Therapy Offices Across Long Island | Pathways Within",
    description:
      "Five Long Island therapy offices in Nassau and Suffolk, plus telehealth across four states.",
    url: "/locations",
  },
};

export default async function LocationsPage() {
  const offices = await prisma.office.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const [feature, ...rest] = offices;

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <section className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
          Locations
        </p>
        <h1 className="mt-lg max-w-[15ch] text-h1 font-medium leading-[1.05]">
          <SplitHeadline
            text="Five therapy offices across Long Island."
            delay={150}
          />
        </h1>
        <p className="hero-cta mt-lg max-w-xl text-lg text-text-secondary">
          You can find us in Nassau and Suffolk. Each office has dedicated
          parking. We also offer telehealth for residents of New York, New
          Jersey, North Carolina, and Florida.
        </p>

        {feature ? (
          <RevealBlock>
            <Link
              href={`/locations/${feature.slug}`}
              className="group mt-section block border-t border-rule pt-lg"
            >
              <ImagePlaceholder
                aspect="16/9"
                label={`${feature.townName} office`}
                zoom
              />
              <div className="mt-md flex flex-wrap items-baseline justify-between gap-md">
                <h2 className="font-display text-h2 font-medium leading-none group-hover:text-accent">
                  {feature.townName}
                </h2>
                <span className="inline-flex items-center gap-sm text-text-secondary">
                  {streetLine(feature)}, {cityLine(feature)} <Arrow />
                </span>
              </div>
            </Link>
          </RevealBlock>
        ) : null}

        <div className="mt-2xl grid gap-x-lg gap-y-2xl md:grid-cols-2 md:[&>*:nth-child(even)_a]:translate-y-12">
          {rest.map((office, index) => (
            <RevealBlock key={office.id} delay={(index % 2) * 90}>
              <Link
                href={`/locations/${office.slug}`}
                className="group block"
              >
                <ImagePlaceholder
                  aspect={index % 2 === 0 ? "4/5" : "3/4"}
                  label={`${office.townName} office`}
                  zoom
                />
                <div className="mt-md flex items-baseline justify-between gap-sm">
                  <h2 className="text-h2 font-medium leading-none group-hover:text-accent">
                    {office.townName}
                  </h2>
                  <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <p className="mt-sm text-text-secondary">
                  {streetLine(office)}
                  <br />
                  {cityLine(office)}
                </p>
              </Link>
            </RevealBlock>
          ))}
        </div>

        <div className="mt-section border-t border-rule pt-lg">
          <AnchorButton href={`tel:${site.phoneTel}`} arrow>
            Call {site.phoneDisplay}
          </AnchorButton>
        </div>
      </section>
    </main>
  );
}
