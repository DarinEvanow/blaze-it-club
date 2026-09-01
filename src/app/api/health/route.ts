import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getDb } from "@/db/client";
import { subscriber } from "@/db/schema";

// Touches the database on every request; never statically cache this route.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // A real read against a migrated table, not just a connectivity probe.
    const [{ value }] = await getDb()
      .select({ value: count() })
      .from(subscriber);
    return NextResponse.json({
      status: "ok",
      database: "reachable",
      subscriberCount: value,
    });
  } catch (error) {
    console.error("Health check failed to reach the database", error);
    return NextResponse.json(
      { status: "error", database: "unreachable" },
      { status: 503 },
    );
  }
}
