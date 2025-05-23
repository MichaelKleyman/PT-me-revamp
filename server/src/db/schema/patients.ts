import {
  serial,
  text,
  pgSchema,
  index,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const patientsSchema = pgSchema("patients_schema");

export const patientsTable = patientsSchema.table(
  "patients",
  {
    id: serial("id").primaryKey(),
    kindeId: text("kinde_id").unique(), // Unique identifier for Kinde user
    practiceId: text("practice_id").unique(), // Id of the practice the patient belongs to
    exerciseIds: integer("exercise_ids").array().default([]),
    name: text("name").notNull(),
    email: text("email").notNull(),
    address: text("address"), // Not needed for practitioner
    userType: text("user_type", {
      enum: ["patient", "practitioner"] as const,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  }
  // (table) => [index("name_idx").on(table.userType)] // TODO: Search up users based on some field (ex: user type? (Patient or Provider))
);

export type PatientsInsert = typeof patientsTable.$inferInsert;

export const patientSchema = z.object({
  kindeId: z.string().optional(),
  practiceId: z.string().optional(),
  exerciseIds: z.array(z.number()).optional().default([]),
  name: z.string(),
  email: z.string().email(),
  address: z.string().optional(),
  userType: z.enum(["patient", "practitioner"]),
});
