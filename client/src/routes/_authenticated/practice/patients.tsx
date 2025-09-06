import { LayoutPage } from "@client/layouts/LayoutPage";
import { ViewPatientsPage } from "@client/views/ViewPatientsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/patients")({
  component: () => (
    <LayoutPage page={"patients"}>
      <ViewPatientsPage />
    </LayoutPage>
  ),
});
