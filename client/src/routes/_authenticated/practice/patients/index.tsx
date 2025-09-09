import { LayoutPage } from "@client/layouts/LayoutPage";
import { LoadingPage } from "@client/lib/components/loading/LoadingPage";
import { ViewPatientsPage } from "@client/views/ViewPatientsPage";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/practice/patients/")({
  component: () => (
    <LayoutPage page={"patients"}>
      <Suspense fallback={<LoadingPage />}>
        <ViewPatientsPage />
      </Suspense>
    </LayoutPage>
  ),
});
