import { createFileRoute } from "@tanstack/react-router";
import { Auth } from "../../components/auth/Auth";
import { authUrlSchema } from "../../lib/types/auth";

export const Route = createFileRoute("/(auth)/auth")({
  validateSearch: authUrlSchema,
  component: Auth,
});
