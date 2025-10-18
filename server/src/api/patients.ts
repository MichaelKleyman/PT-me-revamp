import { Hono } from "hono";
import { patientSchema, patientsTable } from "../db/schema/patients";
import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { exercisesTable } from "../db/schema/exercises";
import { zValidator } from "@hono/zod-validator";
import { server, topic } from "..";
import { WSMessageKind } from "../lib/types";
import { z } from "zod";
import { patientExercisesTable } from "../db/schema/patient-exercises";

const bulkDeleteSchema = z.object({
  ids: z.array(z.number()),
});

export const patientsRouter = new Hono()
  // Get all patients by practice ID
  .get("/practice/:practiceId", async (c) => {
    try {
      const practiceId = c.req.param("practiceId");
      const patients = await db
        .select()
        .from(patientsTable)
        .where(eq(patientsTable.practiceId, practiceId));
      return c.json(patients, 200);
    } catch (error) {
      console.error("Error fetching patients:", error);
      return c.json({ error: "Error fetching patients" }, 500);
    }
  })
  // Get a single patient by ID
  .get("/:patientId", async (c) => {
    try {
      const patientId = c.req.param("patientId");
      const patient = await handleGetPatient(Number(patientId));
      return c.json({ patient }, 200);
    } catch (error) {
      console.error("Error fetching patient:", error);
      return c.json({ error: "Error fetching patient" }, 500);
    }
  })
  // Get all exercises for the specific patient
  .get("/exercises/:patientId", async (c) => {
    try {
      const patientId = c.req.param("patientId");
      const patientExercises = await handleGetPatientsExercises(
        Number(patientId)
      );
      return c.json(patientExercises, 200);
    } catch (error) {
      console.error("Error fetching patient exercises:", error);
      return c.json({ error: "Error fetching patient exercises" }, 500);
    }
  })
  // Create a patient (Needed the validation middleware)
  .post("/", zValidator("json", patientSchema), async (c) => {
    try {
      const newPatientData = await c.req.valid("json");
      const newPatient = await db
        .insert(patientsTable)
        .values(newPatientData)
        .returning();

      // TODO Add logic for edge case where newPatient is undefined or an empty array
      server.publish(
        topic,
        JSON.stringify({
          patient: newPatient[0],
          kind: WSMessageKind.PatientCreated,
        })
      );
      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Error creating new patient:", error);
      return c.json({ error: "Error creating new patient" }, 500);
    }
  })
  // Delete a patient
  .delete("/delete/:patientId", async (c) => {
    try {
      const patientId = c.req.param("patientId");
      await db
        .delete(patientsTable)
        .where(eq(patientsTable.id, Number(patientId)));

      server.publish(
        topic,
        JSON.stringify({
          patientId: patientId, //TODO change the id type to number on the client
          kind: WSMessageKind.PatientDeleted,
        })
      );

      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Error deleting patient:", error);
      return c.json({ error: "Error deleting patient" }, 500);
    }
  })
  // Bulk delete patients (Needed the validation middleware)
  .delete("bulk-delete", zValidator("json", bulkDeleteSchema), async (c) => {
    try {
      const { ids } = c.req.valid("json");

      // Delete patients with IDs in the ids array
      await db.delete(patientsTable).where(inArray(patientsTable.id, ids));

      server.publish(
        topic,
        JSON.stringify({
          patientIds: ids,
          kind: WSMessageKind.PatientsBulkDeleted,
        })
      );

      return c.json({ success: true }, 200);
    } catch (error) {
      console.error("Error deleting patients:", error);
      return c.json({ error: "Error deleting patients" }, 500);
    }
  });

// HELPERS
/** Get patient by id */
const handleGetPatient = async (id: number) => {
  const patients = await db
    .select()
    .from(patientsTable)
    .where(eq(patientsTable.id, id));

  return patients[0];
};

/** Get all exercises for a specific patient */
const handleGetPatientsExercises = async (patientId: number) => {
  // Get exercises by looking it up in the patient-exercises table
  const patientExercises = await db
    .select()
    .from(patientExercisesTable)
    .innerJoin(
      exercisesTable,
      eq(patientExercisesTable.exerciseId, exercisesTable.id)
    )
    .where(eq(patientExercisesTable.patientId, patientId));
  return patientExercises;
};
