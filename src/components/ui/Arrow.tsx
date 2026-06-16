// Thin SVG line arrow. Functional directional marker, never decoration.
// Inherits color via currentColor.
export function Arrow({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "left" | "down";
  className?: string;
}) {
  return (
    <svg
      width="32"
      height="12"
      viewBox="0 0 32 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      {direction === "right" && (
        <>
          <line x1="0" y1="6" x2="30" y2="6" />
          <polyline points="24,1 30,6 24,11" />
        </>
      )}
      {direction === "left" && (
        <>
          <line x1="32" y1="6" x2="2" y2="6" />
          <polyline points="8,1 2,6 8,11" />
        </>
      )}
      {direction === "down" && (
        <>
          <line x1="16" y1="0" x2="16" y2="10" />
          <polyline points="11,5 16,11 21,5" />
        </>
      )}
    </svg>
  );
}
