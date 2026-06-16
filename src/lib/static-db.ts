// Static data layer. The app's content is authored in prisma/content/*.ts and
// assembled here into in memory records that mirror the database seed. A small
// query engine exposes the exact Prisma read surface the app uses (findMany,
// findUnique, count, with where / select / include / orderBy / take), so pages
// never touch a database at build or runtime. There is no network dependency.
//
// This is read only by design. Writes, transactions, and other client methods
// are intentionally absent. To change content, edit prisma/content/*.ts.

import {
  offices as officeSeed,
  insurers as insurerSeed,
  conditionLabels,
  modalityLabels,
  populationLabels,
  stateLabels,
  slugify,
} from "../../prisma/content/base";
import { clinicians as clinicianSeed } from "../../prisma/content/clinicians";
import { conditionContent } from "../../prisma/content/conditions";
import { modalityContent } from "../../prisma/content/modalities";
import { populationContent } from "../../prisma/content/populations";
import { insurerContent } from "../../prisma/content/insurers";
import { stateContent } from "../../prisma/content/telehealth";
import { guideContent } from "../../prisma/content/guides";
import { townContent } from "../../prisma/content/towns";
import { wellnessServiceContent } from "../../prisma/content/wellness";

type Row = Record<string, unknown>;

// A fixed timestamp keeps prerendered output deterministic across builds. The
// records are not editable through the app, so a single moment is honest.
const NOW = new Date("2026-06-16T00:00:00.000Z");

// ---------------------------------------------------------------------------
// Record assembly (mirrors prisma/seed.ts).
// ---------------------------------------------------------------------------

const officeRows: Row[] = officeSeed.map((o) => ({
  id: o.slug,
  slug: o.slug,
  townName: o.townName,
  displayName: o.displayName,
  addressLine: o.addressLine,
  suite: o.suite,
  city: o.city,
  state: o.state,
  zip: o.zip,
  phone: "(631) 371 3825",
  hasParking: true,
  latitude: null,
  longitude: null,
  napVerified: o.napVerified,
  napNote: o.napNote,
  sortOrder: o.sortOrder,
  createdAt: NOW,
  updatedAt: NOW,
}));

const insurerRows: Row[] = insurerSeed.map((insurer, index) => {
  const slug = slugify(insurer.name);
  const content = insurerContent.find((c) => c.slug === slug);
  return {
    id: slug,
    slug,
    name: insurer.name,
    outOfNetwork: insurer.outOfNetwork,
    summary: content?.summary ?? null,
    contentApproved: content?.contentApproved ?? false,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  };
});

const conditionRows: Row[] = conditionLabels.map(([slug, name], index) => {
  const content = conditionContent.find((c) => c.slug === slug);
  return {
    id: slug,
    slug,
    name,
    icd10: content?.icd10 ?? null,
    summary: content?.summary ?? null,
    body: content?.body ?? null,
    contentApproved: content?.contentApproved ?? false,
    reviewedById: content?.reviewedBy ?? null,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  };
});

const modalityRows: Row[] = modalityLabels.map(([slug, name], index) => {
  const content = modalityContent.find((c) => c.slug === slug);
  return {
    id: slug,
    slug,
    name,
    summary: content?.summary ?? null,
    body: content?.body ?? null,
    contentApproved: content?.contentApproved ?? false,
    reviewedById: content?.reviewedBy ?? null,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  };
});

const populationRows: Row[] = populationLabels.map(([slug, name], index) => {
  const content = populationContent.find((c) => c.slug === slug);
  return {
    id: slug,
    slug,
    name,
    summary: content?.summary ?? null,
    body: content?.body ?? null,
    contentApproved: content?.contentApproved ?? false,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  };
});

const wellnessServiceRows: Row[] = wellnessServiceContent.map(
  (service, index) => ({
    id: service.slug,
    slug: service.slug,
    name: service.name,
    category: service.category,
    summary: service.summary,
    intro: service.intro,
    bullets: service.bullets,
    benefits: service.benefits,
    sections: service.sections,
    offerings: service.offerings,
    faqs: service.faqs,
    contentApproved: service.contentApproved,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  }),
);

const geoStateRows: Row[] = stateLabels.map(([slug, name, code], index) => {
  const content = stateContent.find((s) => s.slug === slug);
  return {
    id: slug,
    slug,
    name,
    code,
    licensed: true,
    summary: content?.summary ?? null,
    contentApproved: content?.contentApproved ?? false,
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  };
});

const metroRows: Row[] = stateContent.flatMap((state) =>
  state.metros.map((metro, index) => ({
    id: metro.slug,
    slug: metro.slug,
    name: metro.name,
    sortOrder: index + 1,
    stateId: state.slug,
    createdAt: NOW,
    updatedAt: NOW,
  })),
);

const guideRows: Row[] = guideContent.map((guide) => ({
  id: guide.slug,
  slug: guide.slug,
  title: guide.title,
  question: guide.question ?? null,
  body: guide.body,
  contentApproved: guide.contentApproved,
  publishedAt: new Date(guide.publishedAt),
  reviewedById: guide.reviewedBy ?? null,
  createdAt: NOW,
  updatedAt: NOW,
}));

const clinicianRows: Row[] = clinicianSeed.map((c) => ({
  id: c.slug,
  slug: c.slug,
  name: c.name,
  credentials: c.credentials ?? null,
  title: c.title ?? null,
  bio: c.bio,
  createdAt: NOW,
  updatedAt: NOW,
}));

// Towns: office towns first (each linked to its own office), then the authored
// town content overrides and extends them, exactly as the seed does.
const townOffices = new Map<string, string[]>();
const townBuild = new Map<string, Row>();

for (const office of officeSeed) {
  townOffices.set(office.slug, [office.slug]);
  townBuild.set(office.slug, {
    id: office.slug,
    slug: office.slug,
    name: office.townName,
    county: office.county,
    localDetail: null,
    isOfficeTown: true,
    sortOrder: office.sortOrder,
    createdAt: NOW,
    updatedAt: NOW,
  });
}

townContent.forEach((town, index) => {
  townOffices.set(town.slug, [...town.offices]);
  townBuild.set(town.slug, {
    id: town.slug,
    slug: town.slug,
    name: town.name,
    county: town.county,
    localDetail: town.localDetail,
    isOfficeTown: Boolean(town.isOfficeTown),
    sortOrder: index + 1,
    createdAt: NOW,
    updatedAt: NOW,
  });
});

const townRows: Row[] = [...townBuild.values()];

// Membership lookups for clinician relations, keyed by clinician slug.
const clinicianBySlug = new Map(clinicianSeed.map((c) => [c.slug, c]));

// ---------------------------------------------------------------------------
// Query engine.
// ---------------------------------------------------------------------------

type RelationDef = {
  kind: "toMany" | "toOne";
  target: ModelKey;
  resolve: (row: Row) => Row[] | Row | null;
};

type ModelDef = {
  rows: Row[];
  relations: Record<string, RelationDef>;
};

type ModelKey =
  | "office"
  | "clinician"
  | "insurer"
  | "condition"
  | "modality"
  | "population"
  | "town"
  | "geoState"
  | "metro"
  | "wellnessService"
  | "guide";

const idOf = (row: Row): unknown => row.id;

function clinicianMembership(row: Row): {
  offices: string[];
  conditions: string[];
  modalities: string[];
  populations: string[];
} {
  const seed = clinicianBySlug.get(String(row.id));
  return {
    offices: seed?.offices ?? [],
    conditions: seed?.conditions ?? [],
    modalities: seed?.modalities ?? [],
    populations: seed?.populations ?? [],
  };
}

const cliniciansWhere = (pick: (m: ReturnType<typeof clinicianMembership>) => string[]) =>
  (row: Row): Row[] =>
    clinicianRows.filter((c) => pick(clinicianMembership(c)).includes(String(idOf(row))));

const models: Record<ModelKey, ModelDef> = {
  office: {
    rows: officeRows,
    relations: {
      clinicians: {
        kind: "toMany",
        target: "clinician",
        resolve: cliniciansWhere((m) => m.offices),
      },
    },
  },
  clinician: {
    rows: clinicianRows,
    relations: {
      offices: {
        kind: "toMany",
        target: "office",
        resolve: (row) =>
          officeRows.filter((o) =>
            clinicianMembership(row).offices.includes(String(idOf(o))),
          ),
      },
      conditions: {
        kind: "toMany",
        target: "condition",
        resolve: (row) =>
          conditionRows.filter((x) =>
            clinicianMembership(row).conditions.includes(String(idOf(x))),
          ),
      },
      modalities: {
        kind: "toMany",
        target: "modality",
        resolve: (row) =>
          modalityRows.filter((x) =>
            clinicianMembership(row).modalities.includes(String(idOf(x))),
          ),
      },
      populations: {
        kind: "toMany",
        target: "population",
        resolve: (row) =>
          populationRows.filter((x) =>
            clinicianMembership(row).populations.includes(String(idOf(x))),
          ),
      },
    },
  },
  insurer: { rows: insurerRows, relations: {} },
  condition: {
    rows: conditionRows,
    relations: {
      clinicians: {
        kind: "toMany",
        target: "clinician",
        resolve: cliniciansWhere((m) => m.conditions),
      },
    },
  },
  modality: {
    rows: modalityRows,
    relations: {
      clinicians: {
        kind: "toMany",
        target: "clinician",
        resolve: cliniciansWhere((m) => m.modalities),
      },
    },
  },
  population: {
    rows: populationRows,
    relations: {
      clinicians: {
        kind: "toMany",
        target: "clinician",
        resolve: cliniciansWhere((m) => m.populations),
      },
    },
  },
  town: {
    rows: townRows,
    relations: {
      offices: {
        kind: "toMany",
        target: "office",
        resolve: (row) => {
          const ids = townOffices.get(String(idOf(row))) ?? [];
          return officeRows.filter((o) => ids.includes(String(idOf(o))));
        },
      },
    },
  },
  geoState: { rows: geoStateRows, relations: {} },
  metro: {
    rows: metroRows,
    relations: {
      state: {
        kind: "toOne",
        target: "geoState",
        resolve: (row) =>
          geoStateRows.find((s) => idOf(s) === row.stateId) ?? null,
      },
    },
  },
  wellnessService: { rows: wellnessServiceRows, relations: {} },
  guide: {
    rows: guideRows,
    relations: {
      reviewedBy: {
        kind: "toOne",
        target: "clinician",
        resolve: (row) =>
          row.reviewedById == null
            ? null
            : clinicianRows.find((c) => idOf(c) === row.reviewedById) ?? null,
      },
    },
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  );
}

// Scalar field matcher. Supports equality, { in: [...] }, and { not: value }.
function matchScalar(actual: unknown, condition: unknown): boolean {
  if (isPlainObject(condition)) {
    if ("in" in condition) {
      const list = condition.in;
      return Array.isArray(list) && list.includes(actual);
    }
    if ("not" in condition) {
      const target = condition.not;
      if (target === null) return actual !== null && actual !== undefined;
      return actual !== target;
    }
    return false;
  }
  return actual === condition;
}

// Scalar only where, used for the inner filter of relation conditions.
function matchScalarWhere(row: Row, where: Record<string, unknown>): boolean {
  return Object.keys(where).every((key) => matchScalar(row[key], where[key]));
}

function matchWhere(row: Row, where: Record<string, unknown>, model: ModelDef): boolean {
  for (const key of Object.keys(where)) {
    const value = where[key];
    const relation = model.relations[key];
    if (relation) {
      if (relation.kind === "toMany") {
        const inner =
          isPlainObject(value) && isPlainObject(value.some) ? value.some : {};
        const related = relation.resolve(row);
        const list = Array.isArray(related) ? related : [];
        if (!list.some((r) => matchScalarWhere(r, inner))) return false;
      } else {
        const related = relation.resolve(row);
        const single = Array.isArray(related) ? related[0] ?? null : related;
        if (!single || !isPlainObject(value) || !matchScalarWhere(single, value)) {
          return false;
        }
      }
    } else if (!matchScalar(row[key], value)) {
      return false;
    }
  }
  return true;
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function applyOrderBy(rows: Row[], orderBy: Record<string, unknown>): Row[] {
  const key = Object.keys(orderBy)[0];
  if (!key) return rows;
  const direction = orderBy[key] === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => compareValues(a[key], b[key]) * direction);
}

type ProjectArgs = {
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
};

// Returns a clone of the record with any requested relations and _count
// attached. Scalar fields are always present (a superset of a Prisma select,
// which is harmless: callers are typed against Prisma and read only what they
// asked for).
function project(row: Row, args: ProjectArgs | undefined, model: ModelDef): Row {
  const result: Row = { ...row };
  if (!args) return result;

  const requests: Record<string, unknown> = { ...args.include, ...args.select };
  for (const key of Object.keys(requests)) {
    const request = requests[key];
    if (!request) continue;

    if (key === "_count") {
      const select = isPlainObject(request) && isPlainObject(request.select)
        ? request.select
        : {};
      const counts: Row = {};
      for (const relKey of Object.keys(select)) {
        if (!select[relKey]) continue;
        const relation = model.relations[relKey];
        if (relation && relation.kind === "toMany") {
          const related = relation.resolve(row);
          counts[relKey] = Array.isArray(related) ? related.length : 0;
        }
      }
      result._count = counts;
      continue;
    }

    const relation = model.relations[key];
    if (!relation) continue;

    const childArgs = isPlainObject(request) ? (request as ProjectArgs) : undefined;
    const childModel = models[relation.target];
    const related = relation.resolve(row);
    if (relation.kind === "toMany") {
      const list = Array.isArray(related) ? related : [];
      result[key] = list.map((child) => project(child, childArgs, childModel));
    } else {
      const single = Array.isArray(related) ? related[0] ?? null : related;
      result[key] = single ? project(single, childArgs, childModel) : null;
    }
  }
  return result;
}

type QueryArgs = {
  where?: Record<string, unknown>;
  select?: Record<string, unknown>;
  include?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
  take?: number;
};

function createDelegate(key: ModelKey) {
  const model = models[key];
  return {
    findMany(args?: QueryArgs): Promise<Row[]> {
      let rows = args?.where
        ? model.rows.filter((row) => matchWhere(row, args.where!, model))
        : model.rows.slice();
      if (args?.orderBy) rows = applyOrderBy(rows, args.orderBy);
      if (typeof args?.take === "number") rows = rows.slice(0, args.take);
      return Promise.resolve(rows.map((row) => project(row, args, model)));
    },
    findUnique(args: QueryArgs): Promise<Row | null> {
      const where = args.where ?? {};
      const row = model.rows.find((candidate) => matchWhere(candidate, where, model));
      return Promise.resolve(row ? project(row, args, model) : null);
    },
    count(args?: QueryArgs): Promise<number> {
      const rows = args?.where
        ? model.rows.filter((row) => matchWhere(row, args.where!, model))
        : model.rows;
      return Promise.resolve(rows.length);
    },
  };
}

export const staticPrisma = {
  office: createDelegate("office"),
  clinician: createDelegate("clinician"),
  insurer: createDelegate("insurer"),
  condition: createDelegate("condition"),
  modality: createDelegate("modality"),
  population: createDelegate("population"),
  town: createDelegate("town"),
  geoState: createDelegate("geoState"),
  metro: createDelegate("metro"),
  wellnessService: createDelegate("wellnessService"),
  guide: createDelegate("guide"),
};
