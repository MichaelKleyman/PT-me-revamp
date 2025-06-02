import { LayoutPage } from "@client/layouts/LayoutPage";
import { createFileRoute } from "@tanstack/react-router";
import { PracticeDashboard } from "@client/components/practice/PracticeDashboard";

export const Route = createFileRoute("/_authenticated/practice/dashboard")({
  component: () => (
    <LayoutPage>
      <PracticeDashboard />
    </LayoutPage>
  ),
});
