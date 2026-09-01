CREATE TYPE "public"."subscriber_status" AS ENUM('pending', 'active', 'unsubscribed');--> statement-breakpoint
CREATE TABLE "joke" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"order_index" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "joke_order_index_unique" UNIQUE("order_index")
);
--> statement-breakpoint
CREATE TABLE "send_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscriber_id" uuid NOT NULL,
	"joke_id" integer NOT NULL,
	"date" date NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "send_log_subscriber_id_date_unique" UNIQUE("subscriber_id","date")
);
--> statement-breakpoint
CREATE TABLE "subscriber" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone_number" text NOT NULL,
	"status" "subscriber_status" DEFAULT 'pending' NOT NULL,
	"delivery_timezone" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed_at" timestamp with time zone,
	"unsubscribed_at" timestamp with time zone,
	CONSTRAINT "subscriber_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
ALTER TABLE "send_log" ADD CONSTRAINT "send_log_subscriber_id_subscriber_id_fk" FOREIGN KEY ("subscriber_id") REFERENCES "public"."subscriber"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "send_log" ADD CONSTRAINT "send_log_joke_id_joke_id_fk" FOREIGN KEY ("joke_id") REFERENCES "public"."joke"("id") ON DELETE no action ON UPDATE no action;