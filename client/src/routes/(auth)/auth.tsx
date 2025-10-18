import { createFileRoute } from "@tanstack/react-router";
import { authUrlSchema } from "../../lib/types/auth";
import { LayoutAuthPage } from "@client/layouts/LayoutAuthPage";

export const Route = createFileRoute("/(auth)/auth")({
  validateSearch: authUrlSchema,
  component: LayoutAuthPage,
});
