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
import { breadcrumbSchema, wellnessBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { wellnessHeroImage, wellnessServiceImages } from "@/lib/wellnessImages";
import { wellnessTeam } from "@/lib/wellnessTeam";

export const metadata: Metadata = {
  title: "Wellness services on Long Island",
  description:
    "Pathways Within Wellness offers holistic, whole body care on Long Island: massage, acupuncture, energy work, IV vitamin infusion, body sculpting, and cryotherapy.",
  alternates: { canonical: "/wellness" },
  openGraph: {
    title: `Wellness services on Long Island | ${site.name}`,
    description: site.wellness.description,
    url: "/wellness",
  },
};

export default async function WellnessIndexPage() {
  const services = await prisma.wellnessService.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const [feature, ...rest] = services;

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          wellnessBusinessSchema("/wellness"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Wellness", path: "/wellness" },
          ]),
        ]}
      />

      <section className="relative grid md:min-h-[80dvh] md:grid-cols-[3fr_2fr]">
        <SidebarLabel className="absolute left-2 top-1/2 hidden -translate-y-1/2 xl:block">
          Wellness
        </SidebarLabel>
        <div className="flex flex-col justify-center px-md py-2xl md:py-section md:pl-[max(1.5rem,calc((100vw-var(--container-content))/2))] md:pr-xl">
          <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
            Pathway to Wellness
          </p>
          <h1 className="mt-lg max-w-[12ch] text-display font-medium leading-[0.98]">
            <SplitHeadline text="Holistic, whole body care." delay={150} />
          </h1>
          <p className="hero-cta mt-lg max-w-xl text-lg text-text-secondary">
            {site.wellness.description} Our wellness services complement the
            therapy work of Pathways Within, caring for the body alongside the
            mind.
          </p>
          <div className="hero-cta mt-xl">
            <LinkButton href="/contact" variant="solid" arrow>
              Book a visit
            </LinkButton>
          </div>
        </div>
        <ImagePlaceholder
          label="Wellness treatment room"
          src={wellnessHeroImage.src}
          alt={wellnessHeroImage.alt}
          priority
          sizes="(min-width: 768px) 40vw, 100vw"
          className="hero-image aspect-[4/5] md:aspect-auto md:h-full"
        />
      </section>

      <div className="mx-auto w-full max-w-[var(--container-content)] px-md pb-section">
        <section
          aria-labelledby="services-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="services-heading" className="text-h2 font-medium">
            Services
          </h2>

          {feature ? (
            <RevealBlock>
              <Link
                href={`/wellness/${feature.slug}`}
                className="group mt-lg block"
              >
                <ImagePlaceholder
                  aspect="16/9"
                  label={feature.name}
                  src={wellnessServiceImages[feature.slug]?.src}
                  alt={wellnessServiceImages[feature.slug]?.alt}
                  sizes="(min-width: 768px) 70vw, 100vw"
                  zoom
                />
                {feature.category ? (
                  <p className="mt-md text-xs uppercase tracking-[0.12em] text-text-secondary">
                    {feature.category}
                  </p>
                ) : null}
                <div className="mt-sm flex items-baseline justify-between gap-md">
                  <h3 className="font-display text-h2 font-medium leading-none group-hover:text-accent">
                    {feature.name}
                  </h3>
                  <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                {feature.summary ? (
                  <p className="mt-sm max-w-2xl text-text-secondary">
                    {feature.summary}
                  </p>
                ) : null}
              </Link>
            </RevealBlock>
          ) : null}

          {rest.length > 0 ? (
            <ul className="mt-2xl grid gap-x-lg gap-y-2xl md:grid-cols-3">
              {rest.map((service, index) => (
                <li key={service.id}>
                  <RevealBlock delay={(index % 3) * 90}>
                    <Link
                      href={`/wellness/${service.slug}`}
                      className="group block"
                    >
                      <ImagePlaceholder
                        aspect="3/4"
                        label={service.name}
                        src={wellnessServiceImages[service.slug]?.src}
                        alt={wellnessServiceImages[service.slug]?.alt}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        zoom
                      />
                      {service.category ? (
                        <p className="mt-md text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                          {service.category}
                        </p>
                      ) : null}
                      <div className="mt-xs flex items-baseline justify-between gap-sm">
                        <h3 className="text-lg font-medium group-hover:text-accent">
                          {service.name}
                        </h3>
                        <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                      </div>
                      {service.summary ? (
                        <p className="mt-sm text-sm text-text-secondary">
                          {service.summary}
                        </p>
                      ) : null}
                    </Link>
                  </RevealBlock>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section
          aria-labelledby="team-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="team-heading" className="text-h2 font-medium">
            Our team
          </h2>
          <p className="mt-md max-w-2xl text-text-secondary">
            The Pathways Within Wellness Collaborative is here to help you build
            a beautiful outside that matches your inside.
          </p>
          <ul className="mt-2xl grid gap-x-lg gap-y-2xl sm:grid-cols-2 lg:grid-cols-4">
            {wellnessTeam.map((member, index) => (
              <li key={member.slug}>
                <RevealBlock delay={(index % 4) * 90}>
                  <ImagePlaceholder
                    aspect="3/4"
                    label={member.name}
                    src={member.image.src}
                    alt={member.image.alt}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <p className="mt-md text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                    {member.role}
                  </p>
                  <h3 className="mt-xs text-lg font-medium">{member.name}</h3>
                  {member.credentials ? (
                    <p className="mt-xs text-sm text-text-secondary">
                      {member.credentials}
                    </p>
                  ) : null}
                  <div className="mt-sm space-y-sm text-sm text-text-secondary">
                    {member.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </RevealBlock>
              </li>
            ))}
          </ul>
        </section>

        <EntityCta />
      </div>
    </main>
  );
}
