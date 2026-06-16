// Display headline that reveals word by word, each word rising from below a
// masked line. The animation is pure CSS (.animate-word-in), so it runs without
// JavaScript and never flashes invisible. The full text is exposed to assistive
// tech via aria-label; the per-word spans are hidden from it.
export function SplitHeadline({
  text,
  className,
  delay = 0,
  stagger = 60,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <span
            className="animate-word-in inline-block"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
