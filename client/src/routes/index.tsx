import { createFileRoute, redirect } from "@tanstack/react-router";
import { ViewLayout } from "../views/ViewLayout/ViewLayout";
import { userQueryOptions } from "@client/lib/utils/query/query";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    const { user } = await queryClient.fetchQuery(userQueryOptions);
    if (!user) return;

    throw redirect({
      to: "/dashboard",
    });
  },
  component: ViewLayout,
});
