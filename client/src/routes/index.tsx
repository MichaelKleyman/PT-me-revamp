import { createFileRoute } from "@tanstack/react-router";
import { ViewLandingPage } from "../views/ViewLandingPage";

export const Route = createFileRoute("/")({
  component: ViewLandingPage,
});
