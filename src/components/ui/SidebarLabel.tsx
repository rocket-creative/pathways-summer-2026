import type { ReactNode } from "react";

// Vertical section label running along a left edge. Structural, not decorative.
// Hidden on smaller screens by the consumer's responsive class.
export function SidebarLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
      }}
      className={`select-none text-[11px] uppercase tracking-[0.12em] text-text-secondary ${className}`}
    >
      {children}
    </span>
  );
}
