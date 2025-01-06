import { createFileRoute } from "@tanstack/react-router";
import { AuthLogin } from "../components/auth/AuthLogin";

export const Route = createFileRoute("/auth/login")({
  component: AuthLogin,
});
