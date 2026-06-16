import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Arrow } from "@/components/ui/Arrow";
import type { DirectoryProvider } from "@/lib/providerDirectory";

// One provider in the directory grid. Photography led, the image is the card.
// Reuses the editorial 3/4 frame with hover zoom and the thin arrow marker.
export function ProviderCard({ provider }: { provider: DirectoryProvider }) {
  const focus = provider.focus.slice(0, 3);
  return (
    <Link href={`/clinicians/${provider.slug}`} className="group block">
      <ImagePlaceholder
        aspect="3/4"
        label={provider.name}
        src={provider.image?.src}
        alt={provider.image?.alt}
        zoom
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-md flex items-baseline justify-between gap-sm">
        <h3 className="text-lg font-medium group-hover:text-accent">
          {provider.name}
          {provider.credentials ? `, ${provider.credentials}` : ""}
        </h3>
        <Arrow className="shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>
      {provider.title ? (
        <p className="mt-sm text-sm text-text-secondary">{provider.title}</p>
      ) : null}
      {provider.officeTowns.length > 0 ? (
        <p className="mt-sm text-xs uppercase tracking-[0.1em] text-text-secondary">
          {provider.officeTowns.join(", ")}
        </p>
      ) : null}
      {focus.length > 0 ? (
        <p className="mt-sm text-sm text-text-secondary">{focus.join(", ")}</p>
      ) : null}
    </Link>
  );
}
