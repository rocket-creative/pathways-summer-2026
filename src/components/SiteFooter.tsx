import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { site } from "@/lib/site";

// Crisis resources are visible on every page, per YMYL safety. All numbers are
// public emergency lines, not invented business data.
export function SiteFooter() {
  return (
    <footer className="bg-inverse text-background">
      <div className="mx-auto w-full max-w-[var(--container-content)] px-md py-xl">
        <section
          aria-labelledby="crisis-heading"
          className="border-b border-white/15 pb-lg"
        >
          <h2
            id="crisis-heading"
            className="text-xs uppercase tracking-[0.12em] text-background/70"
          >
            In a crisis
          </h2>
          <p className="mt-md max-w-2xl text-background/90">
            If you or someone you know is in immediate danger, call{" "}
            <a href="tel:911" className="underline underline-offset-4">
              911
            </a>
            . For mental health support any time, call or text the{" "}
            <a href="tel:988" className="underline underline-offset-4">
              988 Suicide and Crisis Lifeline
            </a>
            . Veterans can reach the Veterans Crisis Line by calling{" "}
            <a href="tel:988" className="underline underline-offset-4">
              988
            </a>{" "}
            then pressing 1, or texting{" "}
            <a href="sms:838255" className="underline underline-offset-4">
              838255
            </a>
            .
          </p>
        </section>

        <div className="mt-lg grid gap-lg md:grid-cols-3 lg:grid-cols-5">
          <div>
            <p className="text-lg font-medium">{site.name}</p>
            <p className="mt-sm text-background/80">
              A 360 degree practice on Long Island. Therapy and holistic
              wellness, with telehealth in New York, New Jersey, North Carolina,
              and Florida.
            </p>
          </div>
          <nav aria-label="Pathway to Wisdom" className="flex flex-col gap-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-background/70">
              Therapy
            </p>
            <Link href="/services" className="hover:underline underline-offset-4">
              Services
            </Link>
            <Link href="/clinicians" className="hover:underline underline-offset-4">
              Clinicians
            </Link>
            <Link href="/locations" className="hover:underline underline-offset-4">
              Locations
            </Link>
            <Link href="/insurance" className="hover:underline underline-offset-4">
              Insurance
            </Link>
            <Link href="/guide" className="hover:underline underline-offset-4">
              Guides
            </Link>
          </nav>
          <nav aria-label="Pathway to Wellness" className="flex flex-col gap-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-background/70">
              Wellness
            </p>
            <Link href="/wellness" className="hover:underline underline-offset-4">
              Wellness services
            </Link>
            <a
              href={site.wellness.url}
              className="inline-flex items-center gap-sm hover:underline underline-offset-4"
            >
              Wellness site <Arrow />
            </a>
          </nav>
          <nav aria-label="Practice" className="flex flex-col gap-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-background/70">
              Practice
            </p>
            <Link href="/about" className="hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/faq" className="hover:underline underline-offset-4">
              FAQ
            </Link>
            <Link href="/payment-plans" className="hover:underline underline-offset-4">
              Payment options
            </Link>
            <Link href="/careers" className="hover:underline underline-offset-4">
              Careers
            </Link>
            <Link href="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-background/70">
              Speak with us
            </p>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-sm inline-flex items-center gap-sm text-lg"
            >
              {site.phoneDisplay} <Arrow />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-sm block text-background/80 hover:underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
