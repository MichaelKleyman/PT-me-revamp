import { Hono } from "hono";
import { patientSchema, patientsTable } from "../db/schema/patients";
import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { exercisesTable } from "../db/schema/exercises";
import { zValidator } from "@hono/zod-validator";

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
      const patient = handleGetPatient(Number(patientId));
      return c.json({ patient: patient }, 200);
    } catch (error) {
      console.error("Error fetching patient:", error);
      return c.json({ error: "Error fetching patient" }, 500);
    }
  })
  // Get all exercises for the specific patient
  .get("/exercises/:patientId", async (c) => {
    try {
      const patientId = c.req.param("patientId");
      const patientExercises = handleGetPatientsExercises(Number(patientId));
      return c.json({ patientExercises }, 200);
    } catch (error) {
      console.error("Error fetching patient exercises:", error);
      return c.json({ error: "Error fetching patient exercises" }, 500);
    }
  })
  // Create a patient
  .post("/", zValidator("json", patientSchema), async (c) => {
    try {
      const newPatientData = await c.req.valid("json");
      const newPatient = await db
        .insert(patientsTable)
        .values(newPatientData)
        .returning();
      return c.json({ newPatient }, 200);
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
    } catch (error) {
      console.error("Error deleting patient:", error);
      return c.json({ error: "Error deleting patient" }, 500);
    }
  });

// HELPERS
/** Get patient by id */
const handleGetPatient = async (id: number) => {
  const patients = await db
    .select()
    .from(patientsTable)
    .where(eq(patientsTable.id, id));

  console.log(">>>", patients);
  return patients[0];
};

/** Get all exercises for a specific patient */
const handleGetPatientsExercises = async (id: number) => {
  const patient = handleGetPatient(id);
  const patientExerciseIds = (await patient).exerciseIds ?? [];
  // Get exercises by ID from the list of exercise IDs
  const patientExercises = await db
    .select()
    .from(exercisesTable)
    .where(inArray(exercisesTable.id, patientExerciseIds));
  return patientExercises;
};
