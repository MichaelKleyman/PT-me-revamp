import { userQueryOptions } from "../lib/utils/query/query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const { user } = await queryClient.fetchQuery(userQueryOptions);
      console.log(user);
      if (user) {
        throw redirect({
          to: "/",
        });
      }
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  },
});
