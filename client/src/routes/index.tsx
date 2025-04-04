import { createFileRoute } from "@tanstack/react-router";
import { ViewLandingPage } from "../views/ViewLandingPage";
import { userQueryOptions } from "@client/lib/utils/query/query";
import { ViewAppPage } from "@client/views/ViewAppPage";

function RootRouteComponent() {
  const data = Route.useLoaderData();

  if (data && data.user) {
    return <ViewAppPage />;
  } else return <ViewLandingPage />;
}

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    const { user } = await queryClient.fetchQuery(userQueryOptions);

    if (user) {
      return { user };
    }
  },
  component: RootRouteComponent,
});
