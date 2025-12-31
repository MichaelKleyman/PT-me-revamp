ALTER TABLE "patient_exercises_schema"."patient_exercises" ALTER COLUMN "reps" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "patient_exercises_schema"."patient_exercises" ALTER COLUMN "last_completed_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "patient_exercises_schema"."patient_exercises" ADD COLUMN "difficulty" text NOT NULL;--> statement-breakpoint
ALTER TABLE "patient_exercises_schema"."patient_exercises" ADD COLUMN "duration" text;