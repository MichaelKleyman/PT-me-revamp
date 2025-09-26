import { LayoutPage } from "@client/layouts/LayoutPage";
import { ViewDashboardPage } from "@client/views/ViewDashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/dashboard")({
  component: () => (
    <LayoutPage pageBreadcrumbs={[{ label: "Dashboard", href: "#" }]}>
      <ViewDashboardPage />
    </LayoutPage>
  ),
});
