import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { guideDecision, robotsFor } from "@/lib/indexing";
import { JsonLd } from "@/components/JsonLd";
import { EntityCta } from "@/components/EntityCta";
import { SidebarLabel } from "@/components/ui/SidebarLabel";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

// Prerender only published, approved guides.
export async function generateStaticParams() {
  const guides = await prisma.guide.findMany({
    where: { contentApproved: true, publishedAt: { not: null } },
    select: { slug: true },
  });
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await prisma.guide.findUnique({ where: { slug } });
  if (!guide) return {};

  const path = `/guide/${slug}`;
  const decision = guideDecision({
    contentApproved: guide.contentApproved,
    published: Boolean(guide.publishedAt),
  });

  return {
    title: guide.title,
    description: guide.question ?? guide.title,
    alternates: { canonical: path },
    robots: robotsFor(decision),
    openGraph: {
      title: `${guide.title} | ${site.name}`,
      description: guide.question ?? guide.title,
      url: path,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await prisma.guide.findUnique({
    where: { slug },
    include: { reviewedBy: true },
  });
  if (!guide) notFound();

  const path = `/guide/${slug}`;

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          articleSchema(guide, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guide" },
            { name: guide.title, path },
          ]),
        ]}
      />
      <article
        className="relative mx-auto w-full max-w-[var(--container-content)] px-md py-section"
        style={{ contentVisibility: "auto" }}
      >
        <SidebarLabel className="pointer-events-none absolute -left-2 top-section hidden xl:block">
          Guide
        </SidebarLabel>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-sm text-xs uppercase tracking-[0.12em] text-text-secondary"
        >
          <Link href="/guide" className="hover:text-accent">
            Guides
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span className="text-text">{guide.title}</span>
        </nav>

        <h1 className="mt-lg max-w-[20ch] text-h1 font-medium leading-[1.03]">
          {guide.title}
        </h1>
        {guide.reviewedBy ? (
          <p className="mt-lg border-t border-rule pt-md text-sm uppercase tracking-[0.08em] text-text-secondary">
            Reviewed by {guide.reviewedBy.name}
            {guide.reviewedBy.credentials
              ? `, ${guide.reviewedBy.credentials}`
              : ""}
          </p>
        ) : null}

        {guide.body ? (
          <div className="mt-lg max-w-2xl space-y-md text-lg text-text-secondary">
            {guide.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <EntityCta />
      </article>
    </main>
  );
}
