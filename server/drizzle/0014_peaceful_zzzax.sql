ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "difficulty" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "target-area" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "duration" text;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "equipment" text;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "video_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "instructions" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises_schema"."exercises" ADD COLUMN "benefits" text[];