import { ViewAppPage } from "@client/views/ViewAppPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/")({
  component: ViewAppPage,
});
