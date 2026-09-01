// Standalone migration runner: `npm run db:migrate`.
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { loadEnv, requireDatabaseUrl } from "./env";

loadEnv();

async function main() {
  const migrationClient = postgres(requireDatabaseUrl(), { max: 1 });
  const db = drizzle(migrationClient);

  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migrations complete.");

  await migrationClient.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
