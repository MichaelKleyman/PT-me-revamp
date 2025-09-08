ALTER TABLE "patients_schema"."patients" ADD COLUMN "firstName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "patients_schema"."patients" ADD COLUMN "middleName" text;--> statement-breakpoint
ALTER TABLE "patients_schema"."patients" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "patients_schema"."patients" DROP COLUMN "name";