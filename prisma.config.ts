import "dotenv/config";
import { defineConfig } from "prisma/config";

// `prisma generate` runs in postinstall, including on Vercel where no
// DATABASE_URL exists at install time. The throwing env() helper would abort
// config loading there, so we read the variable directly and fall back to a
// placeholder. generate never connects, so the placeholder is harmless. Real
// CLI work (migrate, db push, db seed, studio) and the runtime client both use
// the actual DATABASE_URL when it is set.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
