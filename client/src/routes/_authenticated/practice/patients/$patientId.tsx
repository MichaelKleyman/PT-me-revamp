import { LayoutPage } from "@client/layouts/LayoutPage";
import { LoadingPage } from "@client/lib/components/loading/LoadingPage";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute(
  "/_authenticated/practice/patients/$patientId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LayoutPage page={"patients"}>
      <Suspense fallback={<LoadingPage />}>Hello patient details</Suspense>
    </LayoutPage>
  );
}
