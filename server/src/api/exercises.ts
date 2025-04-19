import { Hono } from "hono";
import { db } from "../db";
import { exercisesTable } from "../db/schema/exercises";
import { eq } from "drizzle-orm";

export const exercisesRouter = new Hono()

  .get("/", async (c) => {
    try {
      const allExercises = await db.select().from(exercisesTable);
      console.log(">>>", allExercises);
      return c.json({ allExercises });
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
      return c.json({ exercise: exercise[0] });
    } catch (error) {
      console.error("Error fetching exercise:", error);
      return c.json({ error: "Error fetching exercise" }, 500);
    }
  });
