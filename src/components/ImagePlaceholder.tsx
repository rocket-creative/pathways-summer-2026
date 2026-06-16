// Editorial image region. With a `src` it renders real photography through
// next/image (fill, object-cover). Without one it holds the canonical aspect
// ratio and reads as a photo slot so layouts compose before photography
// arrives. The frame, aspect ratios, and hover zoom are shared by both states.

import Image from "next/image";

type Aspect = "3/4" | "4/5" | "16/9" | "1/1";

const aspectClass: Record<Aspect, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
};

export function ImagePlaceholder({
  aspect,
  label,
  className = "",
  zoom = false,
  src,
  alt,
  priority = false,
  sizes = "100vw",
}: {
  aspect?: Aspect;
  label?: string;
  className?: string;
  // Standard editorial image hover: scale to 1.04 inside the overflow-hidden
  // frame when an ancestor `.group` is hovered. Scale only, no brightness,
  // overlay, or shadow. Use on linked image regions.
  zoom?: boolean;
  // When set, real photography renders in place of the placeholder.
  src?: string;
  alt?: string;
  // Hero or above the fold images load eager with high fetch priority.
  priority?: boolean;
  sizes?: string;
}) {
  const zoomClass = zoom
    ? "transition-transform duration-[500ms] ease-hover group-hover:scale-[1.04]"
    : "";

  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-surface-muted ${aspect ? aspectClass[aspect] : ""} ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          sizes={sizes}
          className={`object-cover ${zoomClass}`}
          {...(priority
            ? { loading: "eager" as const, fetchPriority: "high" as const }
            : {})}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label ? `${label}, photography to come` : "Photography to come"}
      className={`relative w-full overflow-hidden bg-surface-muted ${aspect ? aspectClass[aspect] : ""} ${zoomClass} ${className}`}
    >
      <span className="absolute bottom-md left-md text-[11px] uppercase tracking-[0.12em] text-text-secondary">
        {label ?? "Photograph"}
      </span>
    </div>
  );
}
