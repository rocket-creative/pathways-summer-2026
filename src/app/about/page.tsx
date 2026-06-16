import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { LinkButton } from "@/components/ui/Button";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { wisdomAboutHero } from "@/lib/wisdomImages";

export const metadata: Metadata = {
  title: "About Pathways Within",
  description:
    "Pathways Within provides personalized care for mind, body, and spirit on Long Island, combining clinical therapy and holistic wellness in a 360 degree approach.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Pathways Within | ${site.name}`,
    description:
      "Personalized care for mind, body, and spirit on Long Island.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-xl">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          About us
        </p>
        <div className="relative mt-lg">
          <ImagePlaceholder
            aspect="16/9"
            label="Our space"
            src={wisdomAboutHero.src}
            alt={wisdomAboutHero.alt}
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <div className="relative -mt-xl ml-0 max-w-[90%] bg-background pr-md pt-md md:-mt-2xl md:max-w-[70%]">
            <h1 className="text-display font-medium leading-[0.98]">
              Care for the whole person.
            </h1>
          </div>
        </div>
        <p className="mt-lg max-w-2xl text-lg text-text-secondary">
          Our mission is to provide personalized care to tend to your mind,
          body, and spirit so that you can be your best self, inside and out. We
          believe in the interconnectedness of body, spirit, mind, and earth.
        </p>
      </article>

      <section
        aria-labelledby="mission-heading"
        className="border-y border-rule bg-inverse py-2xl text-background"
      >
        <div className="mx-auto w-full max-w-[var(--container-content)] px-md">
          <h2 id="mission-heading" className="sr-only">
            Our mission
          </h2>
          <blockquote className="max-w-4xl font-display text-h1 font-light leading-[1.1]">
            Peace, balance, and clarity begin within.
          </blockquote>
          <p className="mt-lg max-w-2xl text-background/70">
            Pathways Within is for those who wish for peace, balance, and
            clarity, and choose to start within. The journey begins here.
          </p>
        </div>
      </section>

      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <section aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="text-h2 font-medium">
            A 360 degree approach
          </h2>
          <div className="mt-lg grid gap-x-2xl gap-y-md text-text-secondary md:grid-cols-2">
            <p>
              True well being is about more than mental health or physical
              appearance. It is about caring for yourself as a whole person. Our
              approach blends clinical therapy and holistic wellness to support
              emotional healing, physical renewal, and overall well being.
            </p>
            <p>
              Pathways Within is for those who wish for peace, balance, and
              clarity, and choose to start within. The journey begins here.
            </p>
          </div>
          <div className="mt-xl flex flex-wrap items-center gap-md">
            <LinkButton href="/therapy" arrow>
              Pathway to Wisdom
            </LinkButton>
            <LinkButton href="/wellness" arrow>
              Pathway to Wellness
            </LinkButton>
          </div>
        </section>

        <EntityCta />
      </article>
    </main>
  );
}
