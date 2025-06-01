import { LayoutPage } from "@client/layouts/LayoutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/schedule")({
  component: () => (
    <LayoutPage>
      <p>schedule</p>
    </LayoutPage>
  ),
});
