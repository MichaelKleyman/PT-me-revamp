import { LayoutPage } from "@client/layouts/LayoutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/exercises")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LayoutPage>
      <p>exercises</p>
    </LayoutPage>
  );
}
