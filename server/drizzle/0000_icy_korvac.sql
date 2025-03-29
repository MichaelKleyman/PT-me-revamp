CREATE SCHEMA "users_schema";
--> statement-breakpoint
CREATE SCHEMA "practices_schema";
--> statement-breakpoint
CREATE TABLE "users_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text,
	"licenseNumber" integer,
	"user_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "practices_schema"."practices" (
	"id" serial PRIMARY KEY NOT NULL,
	"practiceName" text,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"admin_ids" integer[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "users_schema"."users" USING btree ("user_type");--> statement-breakpoint
CREATE INDEX "id_idx" ON "practices_schema"."practices" USING btree ("id");