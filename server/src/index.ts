import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./api/auth";
import { serve } from "bun";

const app = new Hono();

app.use("*", logger());

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

const apiRoutes = app.basePath("/api").route("/", authRouter);

// Add catch-all route at the end
app.all("*", (c) => {
  return c.json({ error: "Not Found", status: 404 }, 404);
});

serve(app);
export default app;
export type ApiRoutes = typeof apiRoutes;
