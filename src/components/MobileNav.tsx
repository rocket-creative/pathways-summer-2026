"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import type { NavSection } from "@/lib/nav";
import { site } from "@/lib/site";

// Mobile navigation. The hamburger opens a full screen overlay, not a drawer.
// Each section is an accordion that reveals every page in that area.
export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
      >
        <span
          className={`block h-px w-6 bg-text transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-6 bg-text transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="mobile-overlay fixed inset-0 z-50 flex flex-col bg-background"
        >
          <div className="flex items-center justify-between border-b border-rule px-md py-md">
            <Link
              href="/"
              onClick={closeAll}
              className="text-lg font-medium tracking-tight"
            >
              {site.name}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeAll}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className="relative block h-6 w-6">
                <span className="absolute left-0 top-1/2 block h-px w-6 rotate-45 bg-text" />
                <span className="absolute left-0 top-1/2 block h-px w-6 -rotate-45 bg-text" />
              </span>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-md py-lg"
          >
            <ul className="border-t border-rule">
              {sections.map((section) => {
                const isOpen = expanded === section.label;
                const panelId = `mobile-section-${section.label}`;
                return (
                  <li key={section.label} className="border-b border-rule">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setExpanded(isOpen ? null : section.label)
                      }
                      className="flex w-full items-center justify-between gap-md py-md text-left"
                    >
                      <span className="font-display text-h2 font-medium leading-none">
                        {section.label}
                      </span>
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        aria-hidden="true"
                        className={`shrink-0 text-text-secondary transition-transform duration-[250ms] ease-out-soft ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M1 1l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </button>
                    {isOpen ? (
                      <div id={panelId} className="pb-md">
                        {section.groups.map((group) => (
                          <div key={group.heading} className="mb-md">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                              {group.heading}
                            </p>
                            <ul className="mt-sm space-y-sm">
                              {group.links.map((link) =>
                                link.external ? (
                                  <li key={link.href}>
                                    <a
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={closeAll}
                                      className="inline-flex items-center gap-sm text-lg text-text-secondary hover:text-accent"
                                    >
                                      {link.label} <Arrow />
                                    </a>
                                  </li>
                                ) : (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={closeAll}
                                      className="text-lg text-text-secondary hover:text-accent"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-rule px-md py-lg">
            <Link
              href="/contact"
              onClick={closeAll}
              className="inline-flex items-center gap-sm text-sm uppercase tracking-[0.08em] hover:text-accent"
            >
              Get started <Arrow />
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-md inline-flex items-center gap-sm text-sm uppercase tracking-[0.08em] hover:text-accent"
              onClick={closeAll}
            >
              Call {site.phoneDisplay} <Arrow />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
