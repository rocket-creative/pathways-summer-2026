import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { EntityCta } from "@/components/EntityCta";
import { breadcrumbSchema } from "@/lib/schema";
import { faq } from "@/lib/faq";
import { organizationId, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about insurance, online therapy, our Long Island offices, parking, payment options, and how to get started with Pathways Within.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `Frequently asked questions | ${site.name}`,
    description: "Insurance, telehealth, offices, and how to begin.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${site.url}/faq#faq`,
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
            publisher: { "@id": organizationId },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <article className="mx-auto w-full max-w-[var(--container-content)] px-md py-section">
        <p className="text-xs uppercase tracking-[0.12em] text-accent">
          FAQ
        </p>
        <h1 className="mt-lg max-w-[16ch] text-display font-medium leading-[0.98]">
          Frequently asked questions
        </h1>

        <dl className="mt-section divide-y divide-rule border-t border-rule">
          {faq.map((item) => (
            <div
              key={item.question}
              className="grid gap-md py-lg md:grid-cols-[2fr_3fr] md:gap-2xl"
            >
              <dt className="text-lg font-medium">{item.question}</dt>
              <dd className="text-text-secondary">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <EntityCta />
      </article>
    </main>
  );
}
