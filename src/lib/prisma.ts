import type { PrismaClient } from "@prisma/client";
import { staticPrisma } from "@/lib/static-db";

// The app reads content from a static, in memory data layer assembled from
// prisma/content/*.ts (see static-db.ts). There is no database connection at
// build or runtime. The Prisma generated types are still used for type safety;
// the static client implements the read surface the app needs and is cast to
// PrismaClient so every existing call site type checks unchanged.
export const prisma = staticPrisma as unknown as PrismaClient;
