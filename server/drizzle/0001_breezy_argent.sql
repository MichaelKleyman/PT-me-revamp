ALTER TABLE "users_schema"."users" ADD COLUMN "kinde_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_schema"."users" ADD CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id");