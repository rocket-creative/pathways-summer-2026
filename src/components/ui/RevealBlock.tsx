"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// useLayoutEffect on the client (so the hidden initial state is applied before
// the browser paints, avoiding a visible-then-hidden flash), useEffect on the
// server to silence the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Direction = "up" | "left" | "right" | "none";

const initialTransform: Record<Direction, string> = {
  up: "translateY(32px)",
  left: "translateX(-24px)",
  right: "translateX(24px)",
  none: "translateY(0)",
};

// SSR-safe staggered scroll reveal. Renders fully visible by default; only after
// hydration confirms the runtime (and that motion is allowed) does it arm the
// hidden initial state and observe the viewport. No JS, or reduced motion, means
// the content simply stays visible and static. Polymorphic via `as` so it can
// carry semantic elements (e.g. section) and forward their props.
export function RevealBlock({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: ElementType;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = armed && !inView;
  const style: CSSProperties | undefined = armed
    ? {
        opacity: hidden ? 0 : 1,
        transform: hidden ? initialTransform[direction] : "translate(0)",
        transition: `opacity 600ms var(--ease-out-soft) ${delay}ms, transform 600ms var(--ease-out-soft) ${delay}ms`,
      }
    : undefined;

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
