CREATE SCHEMA "users_schema";
--> statement-breakpoint
CREATE TABLE "users_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"user_type" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "users_schema"."users" USING btree ("user_type");