import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Auth } from "../../components/auth/Auth";

const authUrlSchema = z.object({
  authType: z.enum(["login", "register"]).optional(),
});

export const Route = createFileRoute("/(auth)/auth")({
  validateSearch: authUrlSchema,
  component: Auth,
});
