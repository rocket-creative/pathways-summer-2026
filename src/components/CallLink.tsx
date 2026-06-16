"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";

// Click to call. Pushes a conversion event to the dataLayer only if analytics
// has been loaded (which happens only after consent), so no tracking fires
// before consent is granted.
export function CallLink({
  className,
  children,
  source,
}: {
  className?: string;
  children?: ReactNode;
  source?: string;
}) {
  function handleClick() {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "call_click", source: source ?? "site" });
    }
  }

  return (
    <a href={`tel:${site.phoneTel}`} onClick={handleClick} className={className}>
      {children ?? `Call ${site.phoneDisplay}`}
    </a>
  );
}
