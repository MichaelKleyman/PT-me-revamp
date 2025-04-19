import { Hono } from "hono";
import { patientsTable } from "../db/schema/patients";
import { eq } from "drizzle-orm";
import { db } from "../db";

export const patientsRouter = new Hono()
  // Get all patients by practice ID
  .get("/practice/:practiceId", async (c) => {
    try {
      const practiceId = c.req.param("practiceId");
      const allPatients = await db
        .select()
        .from(patientsTable)
        .where(eq(patientsTable.practiceId, practiceId));
      console.log(">>>", allPatients);
      return c.json({ allPatients });
    } catch (error) {
      console.error("Error fetching patients:", error);
      return c.json({ error: "Error fetching patients" }, 500);
    }
  })
  // Get a single patient by ID
  .get("/:patientId", async (c) => {
    try {
      const patientId = c.req.param("patientId");
      const patients = await db
        .select()
        .from(patientsTable)
        .where(eq(patientsTable.id, Number(patientId)));

      console.log(">>>", patients);
      return c.json({ patient: patients[0] });
    } catch (error) {
      console.error("Error fetching patient:", error);
      return c.json({ error: "Error fetching patient" }, 500);
    }
  });
