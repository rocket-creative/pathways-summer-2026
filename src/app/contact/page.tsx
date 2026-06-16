import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { CallLink } from "@/components/CallLink";
import { AnchorButton } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { cityLine, streetLine } from "@/lib/office";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and get started",
  description:
    "Get started with Pathways Within. Call or email us to verify your benefits and book an intake at one of our five Long Island offices or online.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact and get started | ${site.name}`,
    description: "Call or email Pathways Within to begin.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const offices = await prisma.office.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const hasIntake = Boolean(site.intakeUrl);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Contact
        </p>
        <h1 className="mt-lg max-w-[12ch] text-display font-medium leading-[0.98]">
          Let us talk.
        </h1>

        <div className="mt-section grid gap-2xl md:grid-cols-[3fr_2fr]">
          <section aria-labelledby="reach-heading">
            <h2 id="reach-heading" className="text-h2 font-medium">
              Reach us
            </h2>
            <p className="mt-md max-w-xl text-lg text-text-secondary">
              The simplest first step is a benefits check. Call or email us and
              we will confirm your coverage and book an intake, in person or
              online.
            </p>
            <dl className="mt-lg border-t border-rule">
              <div className="flex items-baseline justify-between gap-md border-b border-rule py-md">
                <dt className="text-xs uppercase tracking-[0.12em] text-text-secondary">
                  Call
                </dt>
                <dd>
                  <CallLink
                    source="contact_page"
                    className="text-lg text-text hover:text-accent"
                  />
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-md border-b border-rule py-md">
                <dt className="text-xs uppercase tracking-[0.12em] text-text-secondary">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg text-text hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-lg">
              <AnchorButton
                href={hasIntake ? site.intakeUrl! : `tel:${site.phoneTel}`}
                variant="solid"
                arrow
                {...(hasIntake
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Verify your benefits
              </AnchorButton>
            </div>
          </section>

          <section aria-labelledby="visit-heading">
            <h2 id="visit-heading" className="text-h2 font-medium">
              Visit an office
            </h2>
            <ul className="mt-lg border-t border-rule">
              {offices.map((office) => (
                <li key={office.id} className="border-b border-rule py-md">
                  <Link
                    href={`/locations/${office.slug}`}
                    className="group flex items-center justify-between gap-md"
                  >
                    <span className="font-medium text-text group-hover:text-accent">
                      {office.townName}
                    </span>
                    <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                  <p className="mt-sm text-sm text-text-secondary">
                    {streetLine(office)}
                    <br />
                    {cityLine(office)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
