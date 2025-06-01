CREATE SCHEMA "exercises_schema";
--> statement-breakpoint
CREATE TABLE "exercises_schema"."exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
