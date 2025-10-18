import { LayoutPage } from "@client/layouts/LayoutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/schedule")({
  component: () => (
    <LayoutPage
      pageBreadcrumbs={[{ label: "Schedule", href: "/practice/schedule" }]}
    >
      <p>schedule</p>
    </LayoutPage>
  ),
});
