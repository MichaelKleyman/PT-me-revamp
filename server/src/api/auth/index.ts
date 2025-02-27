import { Hono } from "hono"; // path to your auth file
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { auth } from "../../lib/auth";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  console.log("Pending authentication");
  return auth.handler(c.req.raw);
});

serve(app);
