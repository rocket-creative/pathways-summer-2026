import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { CallLink } from "@/components/CallLink";
import { LinkButton, buttonClass } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SidebarLabel } from "@/components/ui/SidebarLabel";
import { Arrow } from "@/components/ui/Arrow";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { site } from "@/lib/site";
import { wisdomHomeHero, wisdomPhotos } from "@/lib/wisdomImages";
import { wellnessServiceImages } from "@/lib/wellnessImages";

export const metadata: Metadata = {
  title: "A 360 degree approach to healing on Long Island",
  description: site.description,
  alternates: { canonical: "/" },
};

const reasons = [
  {
    head: "Complete care",
    body: "Inner healing and whole body wellness held inside one practice, so nothing about your care is fragmented.",
  },
  {
    head: "Expert practitioners",
    body: "Licensed therapists and holistic providers who collaborate on a plan that fits the whole of you.",
  },
  {
    head: "Tailored treatment",
    body: "Care designed around your history, your goals, and the pace that feels right for you.",
  },
  {
    head: "A holistic experience",
    body: "Mind, body, and spirit treated together, so you leave feeling more like yourself.",
  },
];

const pathways = [
  {
    index: "01",
    word: "Wisdom",
    href: "/therapy",
    label: "Pathway to Wisdom",
    summary:
      "Mental health and therapy. Individual, couples, family, child, and teen work, EMDR, IFS, DBT, CBT, somatic therapy, and support for veterans and first responders.",
    image: "Therapy, quiet consulting room",
    imageSrc: wisdomPhotos.session.src,
    imageAlt: wisdomPhotos.session.alt,
  },
  {
    index: "02",
    word: "Wellness",
    href: "/wellness",
    label: "Pathway to Wellness",
    summary:
      "Holistic, whole body care. Massage, acupuncture, energy work, IV vitamin infusion, body sculpting, and cryotherapy in a calm, restorative space.",
    image: "Wellness, treatment suite",
    imageSrc: wellnessServiceImages.acupuncture?.src,
    imageAlt: wellnessServiceImages.acupuncture?.alt,
  },
];

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <section className="relative grid min-h-dvh md:grid-cols-[3fr_2fr]">
        <SidebarLabel className="absolute left-2 top-1/2 hidden -translate-y-1/2 xl:block">
          Pathways Within
        </SidebarLabel>
        <div className="flex flex-col justify-center px-md py-2xl md:py-section md:pl-[max(1.5rem,calc((100vw-var(--container-content))/2))] md:pr-xl">
          <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
            Long Island, New York
          </p>
          <h1 className="mt-lg max-w-[14ch] text-display font-medium leading-[0.98]">
            <SplitHeadline text="A 360 degree approach to healing." delay={150} />
          </h1>
          <p className="hero-cta mt-lg max-w-md text-lg text-text-secondary">
            Your mind, body, and spirit, in harmony. We blend clinical therapy
            and holistic wellness to support emotional healing and physical
            renewal.
          </p>
          <div className="hero-cta mt-xl flex flex-wrap items-center gap-md">
            <LinkButton href="/therapy" variant="solid" arrow>
              Explore therapy
            </LinkButton>
            <LinkButton href="/wellness" arrow>
              Explore wellness
            </LinkButton>
            <CallLink source="home_hero" className={buttonClass("ghost")} />
          </div>
        </div>
        <ImagePlaceholder
          label="Hero, calm interior"
          src={wisdomHomeHero.src}
          alt={wisdomHomeHero.alt}
          priority
          sizes="(min-width: 768px) 40vw, 100vw"
          className="hero-image aspect-[4/5] md:aspect-auto md:h-full"
        />
      </section>

      <Section
        ariaLabelledby="paths-heading"
        ruleTop
        label="Choose your path"
        className="py-section"
      >
        <h2 id="paths-heading" className="sr-only">
          Choose your path
        </h2>
        <div className="grid gap-2xl md:grid-cols-2">
          {pathways.map((path, index) => (
            <RevealBlock key={path.href} delay={index * 120}>
              <Link href={path.href} className="cta-arrow group block">
                <div className="flex items-baseline gap-md">
                  <span className="font-display text-h2 leading-none text-text-secondary">
                    {path.index}
                  </span>
                  <span className="h-px flex-1 translate-y-[-0.4em] bg-rule" />
                </div>
                <h3 className="type-scroll-fade mt-md font-display text-display font-medium leading-[0.95] group-hover:text-accent">
                  {path.word}
                </h3>
                <div className="mt-lg">
                  <ImagePlaceholder
                    aspect="16/9"
                    label={path.image}
                    src={path.imageSrc}
                    alt={path.imageAlt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    zoom
                  />
                </div>
                <p className="mt-md max-w-xl text-text-secondary">
                  {path.summary}
                </p>
                <span className="mt-md inline-flex items-center gap-sm text-sm uppercase tracking-[0.08em] group-hover:text-accent">
                  {path.label} <Arrow />
                </span>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </Section>

      <section
        aria-labelledby="quote-heading"
        className="border-y border-rule bg-inverse py-2xl text-background"
      >
        <div className="mx-auto w-full max-w-[var(--container-content)] px-md">
          <h2 id="quote-heading" className="sr-only">
            From the people we care for
          </h2>
          <RevealBlock>
            <blockquote className="max-w-4xl font-display text-h1 font-light leading-[1.1]">
              &ldquo;I found my way back to myself.&rdquo;
            </blockquote>
            <p className="mt-lg text-xs uppercase tracking-[0.12em] text-background/60">
              A client of Pathways Within
            </p>
          </RevealBlock>
        </div>
      </section>

      <Section
        ariaLabelledby="why-heading"
        label="Why us"
        className="py-section"
      >
        <h2 id="why-heading" className="max-w-[18ch] text-h2 font-medium">
          One practice, built for the whole of you
        </h2>
        <div className="mt-2xl grid gap-x-2xl gap-y-xl md:grid-cols-2">
          {reasons.map((reason, index) => (
            <RevealBlock
              key={reason.head}
              delay={(index % 2) * 100}
              className="border-t border-rule pt-md"
            >
              <h3 className="text-lg font-medium">{reason.head}</h3>
              <p className="mt-sm text-text-secondary">{reason.body}</p>
            </RevealBlock>
          ))}
        </div>
      </Section>
    </main>
  );
}
