import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { Arrow } from "@/components/ui/Arrow";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { therapyServices } from "@/lib/therapyServices";
import { site } from "@/lib/site";
import { therapyServiceImages } from "@/lib/wisdomImages";

export const metadata: Metadata = {
  title: "Therapy services on Long Island",
  description:
    "Individual, couples, family, child, and teen therapy, trauma care, weight loss surgery support, and support for veterans and first responders at Pathways Within.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Therapy services on Long Island | ${site.name}`,
    description:
      "Individual, couples, family, child, teen, and trauma therapy at Pathways Within.",
    url: "/services",
  },
};

export default function ServicesIndexPage() {
  const [feature, ...rest] = therapyServices;

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Therapy", path: "/therapy" },
          { name: "Services", path: "/services" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
          Pathway to Wisdom
        </p>
        <h1 className="mt-lg max-w-[16ch] text-h1 font-medium leading-[1.05]">
          <SplitHeadline text="Therapy services" delay={150} />
        </h1>
        <p className="hero-cta mt-lg max-w-xl text-lg text-text-secondary">
          We tailor therapy to your wants and needs. The journey within should
          be as personal and individual as you are.
        </p>

        {feature ? (
          <RevealBlock>
            <Link
              href={`/services/${feature.slug}`}
              className="group mt-section block border-t border-rule pt-lg"
            >
              <div className="grid gap-lg md:grid-cols-[2fr_1fr] md:items-end">
                <ImagePlaceholder
                  aspect="16/9"
                  label={feature.name}
                  src={therapyServiceImages[feature.slug]?.src}
                  alt={therapyServiceImages[feature.slug]?.alt}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  zoom
                />
                <div>
                  <h2 className="font-display text-h2 font-medium leading-none group-hover:text-accent">
                    {feature.name}
                  </h2>
                  <p className="mt-md text-text-secondary">{feature.summary}</p>
                  <span className="mt-md inline-flex items-center gap-sm text-sm uppercase tracking-[0.08em] group-hover:text-accent">
                    Read more <Arrow />
                  </span>
                </div>
              </div>
            </Link>
          </RevealBlock>
        ) : null}

        <ul className="mt-2xl grid gap-x-lg gap-y-2xl md:grid-cols-2">
          {rest.map((service, index) => (
            <li
              key={service.slug}
              className={index % 3 === 2 ? "md:col-span-2" : ""}
            >
              <RevealBlock delay={(index % 2) * 90}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <ImagePlaceholder
                    aspect={index % 3 === 2 ? "16/9" : "3/4"}
                    label={service.name}
                    src={therapyServiceImages[service.slug]?.src}
                    alt={therapyServiceImages[service.slug]?.alt}
                    sizes={index % 3 === 2 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    zoom
                  />
                  <div className="mt-md flex items-baseline justify-between gap-sm">
                    <h2 className="text-lg font-medium group-hover:text-accent">
                      {service.name}
                    </h2>
                    <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  <p className="mt-sm text-sm text-text-secondary">
                    {service.summary}
                  </p>
                </Link>
              </RevealBlock>
            </li>
          ))}
        </ul>

        <EntityCta />
      </article>
    </main>
  );
}
