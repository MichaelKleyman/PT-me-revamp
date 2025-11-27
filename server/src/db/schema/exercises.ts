import { relations } from "drizzle-orm";
import { serial, text, pgSchema, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { patientExercisesTable } from "./patient-exercises";

export enum ExerciseDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const exercisesSchema = pgSchema("exercises_schema");

export const exercisesTable = exercisesSchema.table("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty", {
    enum: [
      ExerciseDifficulty.BEGINNER,
      ExerciseDifficulty.INTERMEDIATE,
      ExerciseDifficulty.ADVANCED,
    ] as const,
  }).notNull(),
  targetArea: text("target-area").notNull(),
  duration: text("duration"),
  equipment: text("equipment"),
  videoUrl: text("video_url").notNull(),
  instructions: text("instructions").array().notNull(),
  benefits: text("benefits").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ExercisesInsert = typeof exercisesTable.$inferInsert;

// This will be used for validation when creating or updating exercises.
// TODO: The messages listed here will be moved to the client side for form validation.
export const exerciseSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  difficulty: z.enum([
    ExerciseDifficulty.BEGINNER,
    ExerciseDifficulty.INTERMEDIATE,
    ExerciseDifficulty.ADVANCED,
  ]),
  targetArea: z.string(),
  duration: z.string().optional(),
  equipment: z.string().optional(),
  videoUrl: z
    .string()
    .url()
    .nonempty({ message: "Video URL must be a valid URL" }),
  instructions: z
    .array(z.string())
    .min(2, { message: "At least two instructions are required" }),
  benefits: z.array(z.string()).optional(),
});

/** One exercise can be assigned to many patients.
 * One-to-many relationship
 */
export const exercisesRelations = relations(exercisesTable, ({ many }) => ({
  patientExercises: many(patientExercisesTable),
}));
