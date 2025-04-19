CREATE SCHEMA "patients_schema";
--> statement-breakpoint
CREATE SCHEMA "practitioners_schema";
--> statement-breakpoint
CREATE TABLE "patients_schema"."patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"kinde_id" text,
	"practice_id" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text,
	"user_type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "patients_kinde_id_unique" UNIQUE("kinde_id"),
	CONSTRAINT "patients_practice_id_unique" UNIQUE("practice_id")
);
--> statement-breakpoint
CREATE TABLE "practitioners_schema"."practitioners" (
	"id" serial PRIMARY KEY NOT NULL,
	"kinde_id" text,
	"practice_id" text,
	"admin" boolean DEFAULT false,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"licenseNumber" integer,
	"user_type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "practitioners_kinde_id_unique" UNIQUE("kinde_id"),
	CONSTRAINT "practitioners_practice_id_unique" UNIQUE("practice_id")
);
