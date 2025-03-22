ALTER TABLE "users_schema"."users" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_schema"."users" ADD COLUMN "licenseNumber" text;