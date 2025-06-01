import { serial, text, pgSchema, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const exercisesSchema = pgSchema("exercises_schema");

export const exercisesTable = exercisesSchema.table("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ExercisesInsert = typeof exercisesTable.$inferInsert;

export const exerciseSchema = z.object({
  name: z.string(),
  // TODO: add more fields
});