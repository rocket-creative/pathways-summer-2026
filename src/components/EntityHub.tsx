import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";

// Shared layout for a Long Island wide hub page (condition, modality,
// population, payer). Split Hero 60/40: display headline on the left aligned to
// the content column, full bleed photo on the right. Extra sections render in a
// content-width wrapper, then the conversion block.
export function EntityHub({
  eyebrow,
  title,
  intro,
  imageLabel,
  imageSrc,
  imageAlt,
  children,
  ctaPayer,
  ctaTown,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  ctaPayer?: string;
  ctaTown?: string;
}) {
  return (
    <main id="main" className="flex-1">
      <section className="grid md:min-h-[80dvh] md:grid-cols-[3fr_2fr]">
        <div className="flex flex-col justify-center px-md py-2xl md:py-section md:pl-[max(1.5rem,calc((100vw-var(--container-content))/2))] md:pr-xl">
          <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-lg max-w-[15ch] text-h1 font-medium leading-[1.03]">
            <SplitHeadline text={title} delay={150} />
          </h1>
          {intro ? (
            <div className="hero-cta mt-lg max-w-xl text-text-secondary">
              {intro}
            </div>
          ) : null}
        </div>
        <ImagePlaceholder
          label={imageLabel}
          src={imageSrc}
          alt={imageAlt}
          priority={Boolean(imageSrc)}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="hero-image aspect-[4/5] md:aspect-auto md:h-full"
        />
      </section>
      <div className="mx-auto w-full max-w-[var(--container-content)] px-md pb-section">
        <RevealBlock>{children}</RevealBlock>
        <EntityCta payer={ctaPayer} town={ctaTown} />
      </div>
    </main>
  );
}
