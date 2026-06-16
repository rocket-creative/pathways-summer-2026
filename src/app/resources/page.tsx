import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, answers, and crisis resources from Pathways Within to support your mental health between sessions.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources | ${site.name}`,
    description: "Guides, answers, and crisis resources from Pathways Within.",
    url: "/resources",
  },
};

export default async function ResourcesPage() {
  const guides = await prisma.guide.findMany({
    where: { contentApproved: true, publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    take: 12,
  });

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Resources
        </p>
        <h1 className="mt-lg max-w-[14ch] text-display font-medium leading-[0.98]">
          Resources
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          Plain language guides and answers to support you between sessions,
          plus the crisis resources listed at the bottom of every page.
        </p>

        <section
          aria-labelledby="guides-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="guides-heading" className="text-h2 font-medium">
            Guides
          </h2>
          {guides.length > 0 ? (
            <ul className="mt-lg border-t border-rule">
              {guides.map((guide) => (
                <li key={guide.id} className="border-b border-rule">
                  <Link
                    href={`/guide/${guide.slug}`}
                    className="group flex items-center justify-between gap-md py-md"
                  >
                    <span className="text-lg">{guide.title}</span>
                    <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-md text-text-secondary">
              New guides are on the way. In the meantime, call {site.phoneDisplay}{" "}
              to speak with us.
            </p>
          )}
        </section>

        <section
          aria-labelledby="quick-heading"
          className="mt-2xl border-t border-rule pt-lg"
        >
          <h2 id="quick-heading" className="text-h2 font-medium">
            Quick links
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {[
              { href: "/faq", label: "FAQ" },
              { href: "/insurance", label: "Insurance" },
              { href: "/locations", label: "Locations" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href} className="border-b border-rule">
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">{link.label}</span>
                  <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
