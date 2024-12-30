import { createFileRoute } from "@tanstack/react-router";
import { ViewLayout } from "../views/ViewLayout/ViewLayout";

export const Route = createFileRoute("/")({
  component: ViewLayout,
});
