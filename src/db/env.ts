import { config } from "dotenv";

// Standalone scripts (drizzle-kit, tsx) run outside Next.js's own env loading,
// so mirror its .env.local -> .env precedence here.
export function loadEnv() {
  config({ path: ".env.local" });
  config();
}

export function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return url;
}
