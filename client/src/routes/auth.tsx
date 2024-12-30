import { createFileRoute } from "@tanstack/react-router";
import { Auth } from "../components/auth/auth";

export const Route = createFileRoute("/auth")({
  component: Auth,
});
