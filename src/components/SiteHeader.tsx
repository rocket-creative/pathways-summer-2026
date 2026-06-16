"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { LinkButton } from "@/components/ui/Button";
import { navSections } from "@/lib/nav";
import { site } from "@/lib/site";

// Transparent over the hero in the default state. A 1px rule and the background
// appear on scroll. No colored fill, ever. Desktop is three rows: a utility bar,
// the brand and call to action, then the primary nav whose items open editorial
// mega panels. Mobile collapses into the full screen overlay.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpenIndex(null);

  return (
    <header
      className={`nav-in sticky top-0 z-40 transition-colors ${
        scrolled || openIndex !== null
          ? "border-b border-rule bg-background/95 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      {/* Row 1: utility bar */}
      <div className="border-b border-rule/60">
        <div className="mx-auto flex w-full max-w-[var(--container-content)] items-center justify-between gap-md px-md py-xs text-[11px] uppercase tracking-[0.12em] text-text-secondary">
          <p className="hidden sm:block">
            Long Island therapy and holistic wellness
          </p>
          <div className="flex items-center gap-lg">
            <a
              href={`mailto:${site.email}`}
              className="nav-link hidden md:inline"
            >
              {site.email}
            </a>
            <a href={`tel:${site.phoneTel}`} className="nav-link text-text">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: brand and call to action */}
      <div className="mx-auto flex w-full max-w-[var(--container-content)] items-center justify-between px-md py-md">
        <Link
          href="/"
          onClick={close}
          className="nav-link flex items-center gap-sm text-lg font-medium tracking-tight"
        >
          <Image
            src="/images/brand/logo.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 shrink-0"
          />
          {site.name}
        </Link>
        <div className="hidden items-center gap-md md:flex">
          <LinkButton href="/contact" variant="solid" arrow>
            Get started
          </LinkButton>
        </div>
        <MobileNav sections={navSections} />
      </div>

      {/* Row 3: primary nav with mega panels */}
      <div
        ref={navRef}
        className="relative hidden border-t border-rule/60 md:block"
        onMouseLeave={close}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
        onBlur={(event) => {
          if (!navRef.current?.contains(event.relatedTarget as Node)) close();
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[var(--container-content)] items-stretch gap-xl px-md"
        >
          {navSections.map((section, index) => {
            const open = openIndex === index;
            const panelId = `nav-panel-${index}`;
            return (
              <div key={section.label} className="flex">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onMouseEnter={() => setOpenIndex(index)}
                  onFocus={() => setOpenIndex(index)}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className={`nav-link flex items-center gap-xs py-md text-xs uppercase tracking-[0.12em] transition-colors ${
                    open ? "text-accent" : "text-text"
                  }`}
                >
                  {section.label}
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    aria-hidden="true"
                    className={`transition-transform duration-[250ms] ease-out-soft ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 1l3.5 3.5L8 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </nav>

        {openIndex !== null ? (
          <div
            id={`nav-panel-${openIndex}`}
            className="absolute left-0 right-0 top-full border-t border-rule bg-background shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <div className="mx-auto w-full max-w-[var(--container-content)] px-md py-xl">
              <div className="grid gap-x-2xl gap-y-lg sm:grid-cols-2 lg:grid-cols-4">
                {navSections[openIndex]?.groups.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                      {group.heading}
                    </p>
                    <ul className="mt-md space-y-sm">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={close}
                              className="nav-link inline-block text-text hover:text-accent"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={close}
                              className="nav-link inline-block text-text hover:text-accent"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
