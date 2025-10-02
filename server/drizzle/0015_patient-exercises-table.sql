CREATE SCHEMA "patient_exercises_schema";
--> statement-breakpoint
CREATE TABLE "patient_exercises_schema"."patient_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" text NOT NULL,
	"frequency" text NOT NULL,
	"status" text NOT NULL,
	"last_completed_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "patient_exercises_schema"."patient_exercises" ADD CONSTRAINT "patient_exercises_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients_schema"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_exercises_schema"."patient_exercises" ADD CONSTRAINT "patient_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercises_schema"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "patient_idx" ON "patient_exercises_schema"."patient_exercises" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "patients_schema"."patients" USING btree ("email");--> statement-breakpoint
