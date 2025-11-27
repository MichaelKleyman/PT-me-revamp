import { LayoutPage } from "@client/layouts/LayoutPage";
import { useGetExercise } from "@client/lib/api/practitioner/query";
import { LoadingPage } from "@client/lib/components/loading/LoadingPage";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute(
  "/_authenticated/practice/exercises/$exerciseId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { exerciseId } = useParams({
    from: "/_authenticated/practice/exercises/$exerciseId",
  });

  const { data: exercise } = useGetExercise(exerciseId);

  const pageBreadcrumbs = [
    { label: "Exercises", href: "/practice/exercises" },
    { label: exercise?.name ?? "", href: "#" },
  ];

  return (
    <LayoutPage pageBreadcrumbs={pageBreadcrumbs}>
      <Suspense fallback={<LoadingPage />}>
        <p>Exercise {exercise?.name}</p>
      </Suspense>
    </LayoutPage>
  );
}
