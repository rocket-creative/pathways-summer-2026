import type { ReactNode } from "react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { RevealBlock } from "@/components/ui/RevealBlock";
import type { BreadcrumbItem } from "@/lib/schema";

// Shared layout for a topic x town leaf page. Editorial Stack: a visible
// breadcrumb, a full width image with the headline overlapping its lower edge,
// then the body, extra sections, and the conversion block. The last breadcrumb
// item is the current page and is not linked.
export function EntityTown({
  breadcrumb,
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
  breadcrumb: BreadcrumbItem[];
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
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-sm text-xs uppercase tracking-[0.12em] text-text-secondary"
        >
          {breadcrumb.map((item, index) =>
            index < breadcrumb.length - 1 ? (
              <span key={item.path} className="flex items-center gap-sm">
                <Link href={item.path} className="hover:text-accent">
                  {item.name}
                </Link>
                <span aria-hidden="true">&rsaquo;</span>
              </span>
            ) : (
              <span key={item.path} className="text-text">
                {item.name}
              </span>
            ),
          )}
        </nav>

        <div className="relative mt-lg">
          <ImagePlaceholder
            aspect="16/9"
            label={imageLabel}
            src={imageSrc}
            alt={imageAlt}
            priority={Boolean(imageSrc)}
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="hero-image"
          />
          <div className="relative -mt-xl ml-0 max-w-[90%] bg-background pr-md pt-md md:-mt-2xl md:max-w-[75%]">
            <p className="hero-sub text-xs uppercase tracking-[0.12em] text-accent">
              {eyebrow}
            </p>
            <h1 className="mt-md text-h1 font-medium leading-[1.03]">
              <SplitHeadline text={title} delay={150} />
            </h1>
          </div>
        </div>

        {intro ? (
          <RevealBlock className="mt-lg max-w-2xl text-lg text-text-secondary">
            {intro}
          </RevealBlock>
        ) : null}

        <RevealBlock delay={80}>{children}</RevealBlock>
        <EntityCta payer={ctaPayer} town={ctaTown} />
      </article>
    </main>
  );
}
