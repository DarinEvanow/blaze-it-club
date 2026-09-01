import { defineConfig } from "drizzle-kit";

import { loadEnv } from "./src/db/env";

loadEnv();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // Only required for commands that connect to the DB (e.g. `drizzle-kit migrate`).
  // `db:generate` diffs the schema against the migrations folder and needs no connection.
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
});
