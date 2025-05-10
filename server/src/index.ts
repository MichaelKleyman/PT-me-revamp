import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./api/auth";
import { serve } from "bun";
import { practiceRouter } from "./api/practice";
import { patientsRouter } from "./api/patients";
import { exercisesRouter } from "./api/exercises";

const app = new Hono();

app.use("*", logger());

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

// Base API routes
const apiRoutes = app
  .basePath("/api")
  .route("/", authRouter)
  .route("/practice", practiceRouter)
  .route("/patients", patientsRouter)
  .route("/exercises", exercisesRouter);

// Add catch-all route at the end
app.all("*", (c) => {
  return c.json({ error: "Not Found", status: 404 }, 404);
});

serve(app);
export default app;
export type ApiRoutes = typeof apiRoutes;
