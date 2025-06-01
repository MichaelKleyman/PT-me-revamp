import { Hono } from "hono";
import { db } from "../db";
import { exerciseSchema, exercisesTable } from "../db/schema/exercises";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

export const exercisesRouter = new Hono()

  .get("/", async (c) => {
    try {
      const allExercises = await db.select().from(exercisesTable);
      console.log(">>>", allExercises);
      return c.json({ allExercises }, 200);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return c.json({ error: "Error fetching exercises" }, 500);
    }
  })
  // Get a single exercise by ID
  .get("/:exerciseId", async (c) => {
    try {
      const exerciseId = c.req.param("exerciseId");
      const exercise = await db
        .select()
        .from(exercisesTable)
        .where(eq(exercisesTable.id, Number(exerciseId)));
      console.log(">>>", exercise);
      return c.json({ exercise: exercise[0] }, 200);
    } catch (error) {
      console.error("Error fetching exercise:", error);
      return c.json({ error: "Error fetching exercise" }, 500);
    }
  })
  // Create a new exercise
  .post("/", zValidator("json", exerciseSchema), async (c) => {
    try {
      const newExerciseData = await c.req.valid("json");
      const newExercise = await db
        .insert(exercisesTable)
        .values(newExerciseData)
        .returning();
      return c.json({ newExercise }, 200);
    } catch (error) {
      console.error("Error creating new exercise:", error);
      return c.json({ error: "Error creating new exercise" }, 500);
    }
  })
  // Delete exercise
  .delete("/delete/:exerciseId", async (c) => {
    try {
      const exerciseId = c.req.param("exerciseId");
      await db
        .delete(exercisesTable)
        .where(eq(exercisesTable.id, Number(exerciseId)));
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return c.json({ error: "Error deleting exercise" }, 500);
    }
  });
