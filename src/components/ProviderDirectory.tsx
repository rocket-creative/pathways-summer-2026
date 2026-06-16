"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { ProviderCard } from "@/components/ProviderCard";
import { Arrow } from "@/components/ui/Arrow";
import { ActionButton, AnchorButton } from "@/components/ui/Button";
import {
  TELEHEALTH_SLUG,
  type DirectoryData,
  type FilterOption,
} from "@/lib/providerDirectory";
import {
  licensedStateNames,
  nearestOffice,
  stateForZip,
} from "@/lib/officesGeo";
import { site } from "@/lib/site";

// Beyond this distance from every office we treat the search as out of driving
// range and route to telehealth rather than claim a far office.
const MAX_OFFICE_MILES = 40;

// The NY ZIP centroid table is fetched once, only when a ZIP is searched, then
// cached on the module so repeat searches are instant and the initial page
// payload stays small.
type CentroidTable = Record<string, [number, number]>;
let centroidCache: CentroidTable | null = null;
async function loadCentroids(): Promise<CentroidTable> {
  if (centroidCache) return centroidCache;
  const res = await fetch("/data/ny-zip-centroids.json");
  centroidCache = (await res.json()) as CentroidTable;
  return centroidCache;
}

type Filters = {
  location: string;
  specialty: string;
  approach: string;
  audience: string;
  query: string;
};

const EMPTY: Filters = {
  location: "",
  specialty: "",
  approach: "",
  audience: "",
  query: "",
};

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.12em] text-text-secondary"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-xs h-12 w-full select-none border border-rule bg-background px-sm text-base focus:border-text focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProviderDirectory({ data }: { data: DirectoryData }) {
  const { providers, filters } = data;
  const [active, setActive] = useState<Filters>(EMPTY);
  const [zip, setZip] = useState("");
  const [zipNotice, setZipNotice] = useState<string | null>(null);
  const [refineOpen, setRefineOpen] = useState(false);
  const refineId = useId();
  const noticeRef = useRef<HTMLParagraphElement>(null);

  const set = useCallback((key: keyof Filters, value: string) => {
    setActive((prev) => ({ ...prev, [key]: value }));
  }, []);

  const results = useMemo(() => {
    const query = active.query.trim().toLowerCase();
    return providers.filter((provider) => {
      if (active.location && !provider.locationSlugs.includes(active.location)) {
        return false;
      }
      if (
        active.specialty &&
        !provider.conditionSlugs.includes(active.specialty)
      ) {
        return false;
      }
      if (active.approach && !provider.modalitySlugs.includes(active.approach)) {
        return false;
      }
      if (active.audience && !provider.populationSlugs.includes(active.audience)) {
        return false;
      }
      if (query && !provider.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [providers, active]);

  const chips = useMemo(() => {
    const labelFor = (options: FilterOption[], slug: string) =>
      options.find((option) => option.slug === slug)?.label ?? slug;
    const list: { key: keyof Filters; label: string }[] = [];
    if (active.location)
      list.push({
        key: "location",
        label: labelFor(filters.locations, active.location),
      });
    if (active.specialty)
      list.push({
        key: "specialty",
        label: labelFor(filters.specialties, active.specialty),
      });
    if (active.approach)
      list.push({
        key: "approach",
        label: labelFor(filters.approaches, active.approach),
      });
    if (active.audience)
      list.push({
        key: "audience",
        label: labelFor(filters.audiences, active.audience),
      });
    if (active.query.trim())
      list.push({ key: "query", label: `"${active.query.trim()}"` });
    return list;
  }, [active, filters]);

  const clearAll = useCallback(() => {
    setActive(EMPTY);
    setZip("");
    setZipNotice(null);
  }, []);

  const onZipSearch = useCallback(async () => {
    const clean = zip.trim();
    const state = stateForZip(clean);
    if (!state) {
      setActive((prev) => ({ ...prev, location: "" }));
      setZipNotice(
        "Pathways is licensed in New York, New Jersey, North Carolina, and Florida. We cannot see clients in your area yet.",
      );
      noticeRef.current?.focus();
      return;
    }
    if (state !== "NY") {
      setActive((prev) => ({ ...prev, location: TELEHEALTH_SLUG }));
      setZipNotice(
        `Pathways is licensed in ${licensedStateNames[state]}. Showing telehealth providers, available across our licensed states.`,
      );
      noticeRef.current?.focus();
      return;
    }
    const table = await loadCentroids();
    const point = table[clean];
    if (!point) {
      setActive((prev) => ({ ...prev, location: TELEHEALTH_SLUG }));
      setZipNotice(
        "We could not place that New York ZIP near an office. Showing telehealth across New York.",
      );
      noticeRef.current?.focus();
      return;
    }
    const nearest = nearestOffice(point[0], point[1]);
    const miles = Math.round(nearest.distanceMiles);
    if (nearest.distanceMiles > MAX_OFFICE_MILES) {
      setActive((prev) => ({ ...prev, location: TELEHEALTH_SLUG }));
      setZipNotice(
        `Your nearest office is ${nearest.townName}, about ${miles} miles away. Showing telehealth across New York, or pick an office below.`,
      );
    } else {
      setActive((prev) => ({ ...prev, location: nearest.slug }));
      setZipNotice(
        `Nearest office: ${nearest.townName}, about ${miles} miles away.`,
      );
    }
    noticeRef.current?.focus();
  }, [zip]);

  return (
    <div className="mt-section">
      {/* Search and filters */}
      <div className="border border-rule p-md md:p-lg">
        {/* Location: ZIP near you, with the town and telehealth dropdown */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onZipSearch();
          }}
          className="grid gap-md md:grid-cols-[1fr_auto_1fr] md:items-end"
        >
          <div>
            <label
              htmlFor="provider-zip"
              className="block text-xs uppercase tracking-[0.12em] text-text-secondary"
            >
              Find a provider near you
            </label>
            <div className="mt-xs flex gap-sm">
              <input
                id="provider-zip"
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="ZIP code"
                value={zip}
                onChange={(event) =>
                  setZip(event.target.value.replace(/[^0-9]/g, ""))
                }
                className="h-12 w-full min-w-0 border border-rule bg-background px-sm text-base focus:border-text focus:outline-none"
              />
              <ActionButton type="submit" variant="solid" aria-label="Search by ZIP">
                <span className="inline-flex items-center gap-sm">
                  Search <Arrow />
                </span>
              </ActionButton>
            </div>
          </div>
          <div className="hidden text-center text-xs uppercase tracking-[0.12em] text-text-secondary md:block md:pb-3">
            or
          </div>
          <FilterSelect
            label="Location"
            value={active.location}
            placeholder="All locations"
            options={filters.locations}
            onChange={(value) => {
              set("location", value);
              setZipNotice(null);
            }}
          />
        </form>

        {zipNotice ? (
          <p
            ref={noticeRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-md border-l-2 border-accent pl-sm text-sm text-text-secondary focus:outline-none"
          >
            {zipNotice}
          </p>
        ) : null}

        {/* Refine: specialty, approach, audience, name */}
        <button
          type="button"
          aria-expanded={refineOpen}
          aria-controls={refineId}
          onClick={() => setRefineOpen((open) => !open)}
          className="mt-md inline-flex min-h-[44px] select-none items-center gap-sm text-sm uppercase tracking-[0.08em] lg:hidden"
        >
          {refineOpen ? "Hide filters" : "Refine results"}
          <Arrow direction="down" />
        </button>
        <div
          id={refineId}
          className={`${refineOpen ? "grid" : "hidden"} mt-md gap-md sm:grid-cols-2 lg:grid lg:grid-cols-4`}
        >
          <FilterSelect
            label="Specialty"
            value={active.specialty}
            placeholder="Any specialty"
            options={filters.specialties}
            onChange={(value) => set("specialty", value)}
          />
          <FilterSelect
            label="Approach"
            value={active.approach}
            placeholder="Any approach"
            options={filters.approaches}
            onChange={(value) => set("approach", value)}
          />
          <FilterSelect
            label="Who they help"
            value={active.audience}
            placeholder="Anyone"
            options={filters.audiences}
            onChange={(value) => set("audience", value)}
          />
          <div>
            <label
              htmlFor="provider-name"
              className="block text-xs uppercase tracking-[0.12em] text-text-secondary"
            >
              Search by name
            </label>
            <input
              id="provider-name"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Name"
              value={active.query}
              onChange={(event) => set("query", event.target.value)}
              className="mt-xs h-12 w-full border border-rule bg-background px-sm text-base focus:border-text focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Active filters and result count */}
      <div className="mt-lg flex flex-wrap items-center gap-sm">
        <p aria-live="polite" className="text-sm text-text-secondary">
          {results.length} of {providers.length} providers
        </p>
        {chips.length > 0 ? (
          <>
            <span aria-hidden="true" className="text-rule">
              |
            </span>
            <ul className="flex flex-wrap gap-sm">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={() => set(chip.key, "")}
                    className="inline-flex min-h-[44px] select-none items-center gap-xs border border-text px-sm text-xs uppercase tracking-[0.08em] transition-colors hover:bg-text hover:text-background"
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    {chip.label}
                    <span aria-hidden="true" className="text-base leading-none">
                      &times;
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={clearAll}
              className="select-none text-sm uppercase tracking-[0.08em] text-accent hover:underline underline-offset-4"
            >
              Clear all
            </button>
          </>
        ) : null}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <ul className="mt-lg grid gap-x-lg gap-y-2xl sm:grid-cols-2 lg:grid-cols-4">
          {results.map((provider) => (
            <li key={provider.slug}>
              <ProviderCard provider={provider} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-lg border-t border-rule pt-lg">
          <p className="max-w-xl text-text-secondary">
            No providers match those filters yet. Clear a filter to widen your
            search, or call and we will match you with the right therapist.
          </p>
          <div className="mt-lg flex flex-wrap items-center gap-md">
            <ActionButton variant="ghost" onClick={clearAll}>
              Clear filters
            </ActionButton>
            <AnchorButton href={`tel:${site.phoneTel}`} variant="solid" arrow>
              Call {site.phoneDisplay}
            </AnchorButton>
          </div>
        </div>
      )}
    </div>
  );
}
