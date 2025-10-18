import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./api/auth";
import { ServerWebSocket } from "bun";
import { practiceRouter } from "./api/practice";
import { patientsRouter } from "./api/patients";
import { exercisesRouter } from "./api/exercises";
import { createBunWebSocket } from "hono/bun";

export const topic = "pt-me-ws";

const app = new Hono();

const port = process.env.port || 3000;

const { upgradeWebSocket, websocket } = createBunWebSocket();

app.use("*", logger());

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

// Currently will connect even when users arent logged in to the application.
app.get(
  "/ws",
  upgradeWebSocket((_) => ({
    onOpen(_, ws) {
      const rawWs = ws.raw as ServerWebSocket;
      rawWs.subscribe(topic);
      console.log("Websocket server opened and subscribed to topic:", topic);
    },
    onClose(_, ws) {
      const rawWs = ws.raw as ServerWebSocket;
      rawWs.unsubscribe(topic);
      console.log(
        "Websocket server closed and unsubscribed from topic:",
        topic
      );
    },
  }))
);

// Health check
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Base API routes
const _apiRoutes = app
  .basePath("/api")
  .route("/", authRouter)
  .route("/practice", practiceRouter)
  .route("/patients", patientsRouter)
  .route("/exercises", exercisesRouter);

// Add catch-all route at the end
app.all("*", (c) => {
  return c.json({ error: "Not Found", status: 404 }, 404);
});

export const server = Bun.serve({ fetch: app.fetch, port, websocket });
export default app;
export type ApiRoutes = typeof _apiRoutes;
