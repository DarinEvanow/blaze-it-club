import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

// See CONTEXT.md for the Subscriber lifecycle (Pending → Active → Unsubscribed).
export const subscriberStatus = pgEnum("subscriber_status", [
  "pending",
  "active",
  "unsubscribed",
]);

export const subscriber = pgTable("subscriber", {
  id: uuid("id").primaryKey().defaultRandom(),
  phoneNumber: text("phone_number").notNull().unique(),
  status: subscriberStatus("status").notNull().default("pending"),
  // IANA tz name (e.g. "America/New_York"); pre-filled from area code, editable at signup.
  deliveryTimezone: text("delivery_timezone").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
});

export const joke = pgTable("joke", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  // Rotation position; the Joke of the Day is picked deterministically by this order.
  orderIndex: integer("order_index").notNull().unique(),
  active: boolean("active").notNull().default(true),
});

// One row per (subscriber_id, date) actually sent — makes the daily cron idempotent
// against retries/overlap. Not a user-facing concept (see CONTEXT.md).
export const sendLog = pgTable(
  "send_log",
  {
    id: serial("id").primaryKey(),
    subscriberId: uuid("subscriber_id")
      .notNull()
      .references(() => subscriber.id),
    jokeId: integer("joke_id")
      .notNull()
      .references(() => joke.id),
    date: date("date").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique().on(table.subscriberId, table.date)],
);
