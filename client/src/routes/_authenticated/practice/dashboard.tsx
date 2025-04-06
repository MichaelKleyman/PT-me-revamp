import { LayoutPage } from "@client/components/layouts/LayoutPage";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardContent } from "@client/components/practice/DashboardContent";

export const Route = createFileRoute("/_authenticated/practice/dashboard")({
  component: () => (
    <LayoutPage>
      <DashboardContent />
    </LayoutPage>
  ),
});
