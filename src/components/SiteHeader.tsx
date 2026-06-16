"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { site } from "@/lib/site";

const primaryLinks = [
  { href: "/therapy", label: "Therapy" },
  { href: "/wellness", label: "Wellness" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/therapy", label: "Therapy" },
  { href: "/services", label: "Services" },
  { href: "/wellness", label: "Wellness" },
  { href: "/clinicians", label: "Clinicians" },
  { href: "/locations", label: "Locations" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Transparent over the hero in the default state. A 1px rule and the background
// appear on scroll. No colored fill, ever.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-in sticky top-0 z-40 transition-colors ${
        scrolled ? "border-b border-rule bg-background/95 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--container-content)] items-center justify-between px-md py-md">
        <Link
          href="/"
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
        <nav
          aria-label="Primary"
          className="hidden items-center gap-lg text-xs uppercase tracking-[0.1em] md:flex"
        >
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneTel}`} className="nav-link">
            {site.phoneDisplay}
          </a>
        </nav>
        <MobileNav links={mobileLinks} />
      </div>
    </header>
  );
}
