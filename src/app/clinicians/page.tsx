import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EntityCta } from "@/components/EntityCta";
import { AnchorButton } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { clinicianImage } from "@/lib/clinicianImages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our clinicians",
  description:
    "Meet the licensed therapists of Pathways Within, serving Long Island in person and online.",
  alternates: { canonical: "/clinicians" },
  openGraph: {
    title: `Our clinicians | ${site.name}`,
    description: "Meet the licensed therapists of Pathways Within.",
    url: "/clinicians",
  },
};

export default async function CliniciansIndexPage() {
  const clinicians = await prisma.clinician.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Therapy", path: "/therapy" },
          { name: "Clinicians", path: "/clinicians" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Pathway to Wisdom
        </p>
        <h1 className="mt-lg max-w-[15ch] text-h1 font-medium leading-[1.05]">
          Our clinicians
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          Our team of licensed therapists brings warmth and expertise to every
          session. We look forward to meeting you.
        </p>

        {clinicians.length > 0 ? (
          <ul className="mt-section grid gap-x-lg gap-y-2xl md:grid-cols-3 md:[&>*:nth-child(3n+2)]:translate-y-12">
            {clinicians.map((clinician) => {
              const photo = clinicianImage(clinician.slug, clinician.name);
              return (
              <li key={clinician.id}>
                <Link
                  href={`/clinicians/${clinician.slug}`}
                  className="group block"
                >
                  <ImagePlaceholder
                    aspect="3/4"
                    label={clinician.name}
                    src={photo?.src}
                    alt={photo?.alt}
                    zoom
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="mt-md flex items-baseline justify-between gap-sm">
                    <h2 className="text-lg font-medium group-hover:text-accent">
                      {clinician.name}
                      {clinician.credentials
                        ? `, ${clinician.credentials}`
                        : ""}
                    </h2>
                    <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  {clinician.title ? (
                    <p className="mt-sm text-sm text-text-secondary">
                      {clinician.title}
                    </p>
                  ) : null}
                </Link>
              </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-section border-t border-rule pt-lg">
            <p className="max-w-xl text-text-secondary">
              Our clinician profiles are on the way. To be matched with the
              right therapist now, give us a call.
            </p>
            <div className="mt-lg">
              <AnchorButton href={`tel:${site.phoneTel}`} variant="solid" arrow>
                Call {site.phoneDisplay}
              </AnchorButton>
            </div>
          </div>
        )}

        <EntityCta />
      </article>
    </main>
  );
}
