import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Arrow } from "@/components/ui/Arrow";

// Two button styles only, per the design language. Ghost: 1px border, no fill,
// inverts on hover. Solid: brand action color fill, white text, darkens on hover
// via color-mix. No radius, 44px min height for touch. The action color is the
// per-section accent (Wisdom sky blue, Wellness sage), set by theme scope.
type Variant = "ghost" | "solid";

const variantClass: Record<Variant, string> = {
  ghost: "border border-text hover:bg-text hover:text-background",
  solid:
    "bg-accent text-on-accent hover:[background-color:color-mix(in_oklch,var(--color-accent)_85%,black)]",
};

export function buttonClass(variant: Variant = "ghost", extra = ""): string {
  return `cta-arrow inline-flex min-h-[44px] items-center gap-sm px-lg py-sm text-sm uppercase tracking-[0.08em] transition-colors duration-[250ms] ease-inout-soft ${variantClass[variant]} ${extra}`;
}

export function LinkButton({
  href,
  variant = "ghost",
  arrow = false,
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function AnchorButton({
  href,
  variant = "ghost",
  arrow = false,
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"a">) {
  return (
    <a href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

export function ActionButton({
  variant = "ghost",
  arrow = false,
  children,
  className = "",
  ...rest
}: {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
