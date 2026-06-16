"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";

// Compact provider search for the nav. Submits to the provider directory with
// a `find` query (a name or a ZIP); the directory reads it on load and either
// runs the ZIP "near you" search or prefills the name filter.
export function ProviderSearch({
  className = "",
  onSubmitted,
}: {
  className?: string;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const id = useId();

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        router.push(
          query ? `/clinicians?find=${encodeURIComponent(query)}` : "/clinicians",
        );
        onSubmitted?.();
      }}
      className={`flex items-center border border-rule transition-colors focus-within:border-text ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Find a provider
      </label>
      <input
        id={id}
        type="search"
        inputMode="search"
        autoComplete="off"
        placeholder="Find a provider"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-11 w-full min-w-0 bg-transparent px-sm text-base focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search providers"
        className="flex h-11 w-11 shrink-0 items-center justify-center text-text-secondary transition-colors hover:text-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <circle cx="7.5" cy="7.5" r="5.5" />
          <line x1="11.6" y1="11.6" x2="16.5" y2="16.5" />
        </svg>
      </button>
    </form>
  );
}
