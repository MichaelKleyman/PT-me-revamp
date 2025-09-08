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
    practiceId: text("practice_id"), // Id of the practice the patient belongs to
    exerciseIds: integer("exercise_ids").array().default([]).notNull(),
    firstName: text("firstName").notNull(),
    middleName: text("middleName"),
    lastName: text("lastName").notNull(),
    email: text("email").notNull(),
    address: text("address").notNull(), // Not needed for practitioner
    userType: text("user_type", {
      enum: ["patient", "practitioner"] as const,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  }
  // (table) => [index("name_idx").on(table.userType)] // TODO: Search up users based on some field (ex: user type? (Patient or Provider))
);

export type PatientsInsert = typeof patientsTable.$inferInsert;

export const patientSchema = z.object({
  kindeId: z.string().nullable().optional(),
  practiceId: z.string().nullable().optional(),
  exerciseIds: z.array(z.number()).default([]),
  firstName: z.string(),
  middleName: z.string().nullable().optional(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  userType: z.enum(["patient", "practitioner"]),
});
