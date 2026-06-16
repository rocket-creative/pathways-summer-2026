"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { site } from "@/lib/site";

type NavLink = { href: string; label: string };

// Mobile navigation. The hamburger opens a full screen overlay, not a drawer.
export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
              onClick={() => setOpen(false)}
              className="text-lg font-medium tracking-tight"
            >
              {site.name}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
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
            className="flex flex-1 flex-col justify-center gap-lg px-md"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-h2 font-medium leading-none hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-rule px-md py-lg">
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center gap-sm text-sm uppercase tracking-[0.08em]"
              onClick={() => setOpen(false)}
            >
              Call {site.phoneDisplay} <Arrow />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
