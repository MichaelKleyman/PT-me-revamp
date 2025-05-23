import { Hono } from "hono";
import { db } from "../db";
import { practicesTable } from "../db/schema/practices";
import { eq } from "drizzle-orm";

export const practiceRouter = new Hono()
  // Get a single practice by ID
  .get("/:practiceId", async (c) => {
    try {
      const practiceId = c.req.param("practiceId");
      const practice = await db
        .select()
        .from(practicesTable)
        .where(eq(practicesTable.id, Number(practiceId)));

      console.log(">>>", practice);
      return c.json({ practice: practice[0] }, 200);
    } catch (error) {
      console.error("Error fetching practice:", error);
      return c.json({ error: "Error fetching practice" }, 500);
    }
  });
