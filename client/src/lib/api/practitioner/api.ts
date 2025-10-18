import { hc } from "hono/client";
import type { ApiRoutes } from "../../../../../server/src/index.ts";

export const client = hc<ApiRoutes>("/");
export const api = client.api;
