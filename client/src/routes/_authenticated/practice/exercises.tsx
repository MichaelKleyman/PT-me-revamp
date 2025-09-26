import { LayoutPage } from "@client/layouts/LayoutPage";
import { ViewExercisesPage } from "@client/views/ViewExercisesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/exercises")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LayoutPage
      pageBreadcrumbs={[{ label: "Exercises", href: "/practice/exercises" }]}
    >
      <ViewExercisesPage />
    </LayoutPage>
  );
}
