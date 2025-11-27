ALTER TABLE "practitioners_schema"."practitioners" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "practitioners_schema"."practitioners" ADD COLUMN "middleName" text;--> statement-breakpoint
ALTER TABLE "practitioners_schema"."practitioners" ADD COLUMN "lastName" text NOT NULL;