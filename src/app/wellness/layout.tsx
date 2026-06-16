import type { ReactNode } from "react";

// Scopes the Wellness (medspa) brand palette to every /wellness route. The
// shared header and footer live in the root layout and stay in the navy chrome;
// only this section's content re-skins to sage and periwinkle.
export default function WellnessLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="theme-wellness">{children}</div>;
}
