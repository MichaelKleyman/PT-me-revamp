import { LayoutPage } from "@client/layouts/LayoutPage";
import { LoadingPage } from "@client/lib/components/loading/LoadingPage";
import { ViewExercisesPage } from "@client/views/ViewExercisesPage";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/practice/exercises/")({
  component: () => (
    <LayoutPage
      pageBreadcrumbs={[{ label: "Exercises", href: "/practice/exercises" }]}
    >
      <Suspense fallback={<LoadingPage />}>
        <ViewExercisesPage />{" "}
      </Suspense>
    </LayoutPage>
  ),
});
