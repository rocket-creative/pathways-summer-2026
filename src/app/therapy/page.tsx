import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { SidebarLabel } from "@/components/ui/SidebarLabel";
import { LinkButton } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { wisdomTherapyHero } from "@/lib/wisdomImages";

export const metadata: Metadata = {
  title: "Therapy on Long Island and online",
  description: site.wisdomDescription,
  alternates: { canonical: "/therapy" },
  openGraph: {
    title: `Therapy on Long Island and online | ${site.name}`,
    description: site.wisdomDescription,
    url: "/therapy",
  },
};

function IndexList({
  items,
}: {
  items: { id: string; name: string; href: string }[];
}) {
  return (
    <ul className="mt-lg border-t border-rule">
      {items.map((item) => (
        <li key={item.id} className="border-b border-rule">
          <Link
            href={item.href}
            className="group flex items-center justify-between gap-md py-md"
          >
            <span className="text-lg">{item.name}</span>
            <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function TherapyHomePage() {
  const [conditions, modalities, populations] = await Promise.all([
    prisma.condition.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.modality.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.population.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Therapy", path: "/therapy" },
        ])}
      />

      <section className="relative grid md:min-h-[80dvh] md:grid-cols-[3fr_2fr]">
        <SidebarLabel className="absolute left-2 top-1/2 hidden -translate-y-1/2 xl:block">
          Wisdom
        </SidebarLabel>
        <div className="flex flex-col justify-center px-md py-2xl md:py-section md:pl-[max(1.5rem,calc((100vw-var(--container-content))/2))] md:pr-xl">
          <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
            Pathway to Wisdom
          </p>
          <h1 className="mt-lg max-w-[13ch] text-display font-medium leading-[0.98]">
            <SplitHeadline
              text="Therapy that meets you where you are."
              delay={150}
            />
          </h1>
          <p className="hero-cta mt-lg max-w-xl text-lg text-text-secondary">
            {site.wisdomDescription} Together we explore your experiences so you
            can feel safe and secure again.
          </p>
          <div className="hero-cta mt-xl flex flex-wrap items-center gap-md">
            <LinkButton href="/locations" variant="solid" arrow>
              Find a location
            </LinkButton>
            <LinkButton href="/insurance" arrow>
              Insurance
            </LinkButton>
            <LinkButton href="/guide" arrow>
              Guides
            </LinkButton>
          </div>
        </div>
        <ImagePlaceholder
          label="Therapy office"
          src={wisdomTherapyHero.src}
          alt={wisdomTherapyHero.alt}
          priority
          sizes="(min-width: 768px) 40vw, 100vw"
          className="hero-image aspect-[4/5] md:aspect-auto md:h-full"
        />
      </section>

      <div className="mx-auto w-full max-w-[var(--container-content)] px-md pb-section">
        <RevealBlock
          as="section"
          aria-labelledby="treatments-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="treatments-heading" className="text-h2 font-medium">
            How we work
          </h2>
          <IndexList
            items={modalities.map((m) => ({
              id: m.id,
              name: m.name,
              href: `/therapy/${m.slug}`,
            }))}
          />
        </RevealBlock>

        <RevealBlock
          as="section"
          aria-labelledby="conditions-heading"
          className="mt-2xl border-t border-rule pt-lg"
        >
          <h2 id="conditions-heading" className="text-h2 font-medium">
            What we help with
          </h2>
          <IndexList
            items={conditions.map((c) => ({
              id: c.id,
              name: c.name,
              href: `/therapy/${c.slug}`,
            }))}
          />
        </RevealBlock>

        <RevealBlock
          as="section"
          aria-labelledby="populations-heading"
          className="mt-2xl border-t border-rule pt-lg"
        >
          <h2 id="populations-heading" className="text-h2 font-medium">
            Who we help
          </h2>
          <IndexList
            items={populations.map((p) => ({
              id: p.id,
              name: p.name,
              href: `/for/${p.slug}`,
            }))}
          />
        </RevealBlock>

        <EntityCta />
      </div>
    </main>
  );
}
