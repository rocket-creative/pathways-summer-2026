import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { EntityCta } from "@/components/EntityCta";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance we accept for therapy",
  description:
    "Pathways Within is in network with most major New York insurers. See the plans we accept and verify your benefits before your first visit.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title: `Insurance we accept for therapy | ${site.name}`,
    description:
      "Pathways Within is in network with most major New York insurers.",
    url: "/insurance",
  },
};

export default async function InsuranceIndexPage() {
  const insurers = await prisma.insurer.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const inNetwork = insurers.filter((insurer) => !insurer.outOfNetwork);
  const outOfNetwork = insurers.filter((insurer) => insurer.outOfNetwork);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.12em] text-text-secondary"
        >
          <span className="text-text">Insurance</span>
        </nav>
        <h1 className="mt-lg max-w-[14ch] text-display font-medium leading-[0.98]">
          Insurance we accept
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          We are in network with most major New York insurers. Once we confirm
          your benefits, we build a plan that respects them.
        </p>

        <section
          aria-labelledby="innetwork-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="innetwork-heading" className="text-h2 font-medium">
            In network
          </h2>
          <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
            {inNetwork.map((insurer) => (
              <li key={insurer.id} className="border-b border-rule">
                <Link
                  href={`/insurance/${insurer.slug}`}
                  className="group flex items-center justify-between gap-md py-md"
                >
                  <span className="text-lg">{insurer.name}</span>
                  <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {outOfNetwork.length > 0 ? (
          <section
            aria-labelledby="oon-heading"
            className="mt-2xl border-t border-rule pt-lg"
          >
            <h2 id="oon-heading" className="text-h2 font-medium">
              Out of network
            </h2>
            <p className="mt-md max-w-xl text-text-secondary">
              We can help you use your out of network benefits with these plans.
            </p>
            <ul className="mt-lg border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-2xl">
              {outOfNetwork.map((insurer) => (
                <li key={insurer.id} className="border-b border-rule">
                  <Link
                    href={`/insurance/${insurer.slug}`}
                    className="group flex items-center justify-between gap-md py-md"
                  >
                    <span className="text-lg">{insurer.name}</span>
                    <Arrow className="text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <EntityCta />
      </article>
    </main>
  );
}
