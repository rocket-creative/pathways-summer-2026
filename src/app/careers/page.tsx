import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { AnchorButton } from "@/components/ui/Button";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers at Pathways Within",
  description:
    "Join the Pathways Within team of therapists and wellness providers on Long Island. We are always glad to meet thoughtful, caring practitioners.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers at Pathways Within | ${site.name}`,
    description: "Join our team of therapists and wellness providers.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Careers
        </p>
        <h1 className="mt-lg max-w-[14ch] text-display font-medium leading-[0.98]">
          Build your practice with us.
        </h1>
        <div className="mt-lg max-w-2xl space-y-md text-lg text-text-secondary">
          <p>
            Pathways Within brings together therapists and wellness providers
            who care for the whole person. If that sounds like you, we would
            love to hear from you.
          </p>
          <p>
            Send a note and your resume by email, or call {site.phoneDisplay}.
          </p>
        </div>
        <div className="mt-xl flex flex-wrap items-center gap-md border-t border-rule pt-lg">
          <AnchorButton href={`mailto:${site.email}`} variant="solid" arrow>
            Email us
          </AnchorButton>
          <AnchorButton href={`tel:${site.phoneTel}`} arrow>
            Call {site.phoneDisplay}
          </AnchorButton>
        </div>
      </article>
    </main>
  );
}
