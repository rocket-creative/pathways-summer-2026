import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CallLink } from "@/components/CallLink";
import { buttonClass } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Arrow";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance and payment options",
  description:
    "Pathways Within is in network with most major New York insurers and offers payment options. We confirm your benefits before your first visit.",
  alternates: { canonical: "/payment-plans" },
  openGraph: {
    title: `Insurance and payment options | ${site.name}`,
    description:
      "In network with most major New York insurers, with payment options available.",
    url: "/payment-plans",
  },
};

export default function PaymentPlansPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Payment options", path: "/payment-plans" },
        ])}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          Payment options
        </p>
        <h1 className="mt-lg max-w-[16ch] text-display font-medium leading-[0.98]">
          Insurance and payment options
        </h1>
        <p className="mt-lg max-w-xl text-lg text-text-secondary">
          We want care to be reachable. We are in network with most major New
          York insurers, and we offer payment options so cost is not a barrier
          to starting.
        </p>

        <section
          aria-labelledby="how-heading"
          className="mt-section border-t border-rule pt-lg"
        >
          <h2 id="how-heading" className="text-h2 font-medium">
            How it works
          </h2>
          <ol className="mt-lg max-w-2xl border-t border-rule">
            <li className="flex gap-md border-b border-rule py-md">
              <span className="font-display text-lg text-text-secondary">
                01
              </span>
              <span className="text-text-secondary">
                We confirm your benefits before your first visit.
              </span>
            </li>
            <li className="flex gap-md border-b border-rule py-md">
              <span className="font-display text-lg text-text-secondary">
                02
              </span>
              <span className="text-text-secondary">
                See the plans we accept on our{" "}
                <Link href="/insurance" className="text-text underline underline-offset-4 hover:text-accent">
                  insurance page
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-md border-b border-rule py-md">
              <span className="font-display text-lg text-text-secondary">
                03
              </span>
              <span className="text-text-secondary">
                Ask us about payment options when you call.
              </span>
            </li>
          </ol>
          <div className="mt-lg">
            <CallLink source="payment_plans" className={buttonClass("solid")}>
              <span className="inline-flex items-center gap-sm">
                Call {site.phoneDisplay} <Arrow />
              </span>
            </CallLink>
          </div>
        </section>
      </article>
    </main>
  );
}
