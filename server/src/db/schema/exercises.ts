import { serial, text, pgSchema, timestamp } from "drizzle-orm/pg-core";

export const exercisesSchema = pgSchema("exercises_schema");

export const exercisesTable = exercisesSchema.table("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ExercisesInsert = typeof exercisesTable.$inferInsert;
