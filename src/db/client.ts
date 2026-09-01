import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { requireDatabaseUrl } from "./env";
import * as schema from "./schema";

// Lazily initialized so importing this module (e.g. via Next.js's build-time
// route collection) doesn't require DATABASE_URL to be set — only using it does.
const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
};

function createClient() {
  return postgres(requireDatabaseUrl(), { max: 10 });
}

// A single shared connection pool, reused across hot-reloads in dev.
function getClient() {
  if (!globalForDb.postgresClient) {
    globalForDb.postgresClient = createClient();
  }
  return globalForDb.postgresClient;
}

export function getSql() {
  return getClient();
}

export function getDb() {
  return drizzle(getClient(), { schema });
}
