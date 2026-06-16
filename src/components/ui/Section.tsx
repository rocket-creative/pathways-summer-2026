import type { ReactNode } from "react";
import { SidebarLabel } from "@/components/ui/SidebarLabel";

// Content width section wrapper. Optional top rule (never a box) and an
// optional rotated sidebar label set in the left margin on wide screens.
export function Section({
  children,
  label,
  ruleTop = false,
  className = "",
  ariaLabelledby,
}: {
  children: ReactNode;
  label?: string;
  ruleTop?: boolean;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={`relative mx-auto w-full max-w-[var(--container-content)] px-md ${
        ruleTop ? "border-t border-rule" : ""
      } ${className}`}
    >
      {label ? (
        <SidebarLabel className="pointer-events-none absolute -left-2 top-0 hidden xl:block">
          {label}
        </SidebarLabel>
      ) : null}
      {children}
    </section>
  );
}
