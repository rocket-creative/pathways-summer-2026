import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Therapy guides",
  description:
    "Plain language answers about therapy, conditions, and treatment from the clinicians at Pathways Within.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: `Therapy guides | ${site.name}`,
    description: "Plain language answers about therapy from Pathways Within.",
    url: "/guide",
  },
};

export default async function GuideIndexPage() {
  const guides = await prisma.guide.findMany({
    where: { contentApproved: true, publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Guides
        </p>
        <h1 className="mt-lg max-w-[14ch] text-display font-medium leading-[0.98]">
          Therapy guides
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          Plain language answers about therapy, conditions, and treatment,
          written and reviewed by our clinicians.
        </p>

        {guides.length > 0 ? (
          <ul className="mt-section border-t border-rule">
            {guides.map((guide) => (
              <li key={guide.id} className="border-b border-rule">
                <Link
                  href={`/guide/${guide.slug}`}
                  className="group flex items-center justify-between gap-md py-lg"
                >
                  <span className="font-display text-h2 font-medium leading-none group-hover:text-accent">
                    {guide.title}
                  </span>
                  <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-section border-t border-rule pt-lg text-text-secondary">
            New guides are on the way.
          </p>
        )}
      </article>
    </main>
  );
}
