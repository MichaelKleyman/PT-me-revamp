import {
  index,
  integer,
  pgSchema,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { patientsTable } from "./patients";
import { exercisesTable } from "./exercises";
import { relations } from "drizzle-orm";

enum PatientExerciseStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  PENDING = "pending",
  SKIPPED = "skipped",
}

export const patientExercisesSchema = pgSchema("patient_exercises_schema");

export const patientExercisesTable = patientExercisesSchema.table(
  "patient_exercises",
  {
    id: serial("id").primaryKey(),
    patientId: integer("patient_id")
      .references(() => patientsTable.id)
      .notNull(),
    exerciseId: integer("exercise_id")
      .references(() => exercisesTable.id)
      .notNull(),
    // Patient specific details
    sets: integer("sets").notNull(),
    reps: text("reps").notNull(),
    frequency: text("frequency").notNull(),
    status: text("status", {
      enum: [
        PatientExerciseStatus.ACTIVE,
        PatientExerciseStatus.COMPLETED,
        PatientExerciseStatus.SKIPPED,
        PatientExerciseStatus.PENDING,
      ] as const,
    }).notNull(),
    lastCompletedDate: timestamp("last_completed_date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("patient_idx").on(table.patientId)] // TODO: Search up exercises for the patient based on the patientId field)
);

export type PatientExercisesInsert = typeof patientExercisesTable.$inferInsert;

/** Each patient exercise belongs to one patient and one exercise.
 * Many-to-one relationship
 */
export const patientExercisesRelations = relations(
  patientExercisesTable,
  ({ one }) => ({
    patient: one(patientsTable, {
      fields: [patientExercisesTable.patientId],
      references: [patientsTable.id],
    }),
    exercise: one(exercisesTable, {
      fields: [patientExercisesTable.exerciseId],
      references: [exercisesTable.id],
    }),
  })
);

// patients (1) ←→ (many) patient_exercises (many) ←→ (1) exercises
// One patient can have many exercises
// One exercise can be assigned to many patients
