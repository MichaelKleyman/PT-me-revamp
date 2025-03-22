CREATE SCHEMA "practices_schema";
--> statement-breakpoint
CREATE TABLE "practices_schema"."practices" (
	"id" serial PRIMARY KEY NOT NULL,
	"practiceName" text,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"licenseNumber" text,
	"admin_ids" integer[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "id_idx" ON "practices_schema"."practices" USING btree ("id");