import { userQueryOptions } from "../lib/api/query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const { user } = await queryClient.fetchQuery(userQueryOptions);
      console.log(user);
      if (!user) {
        console.log("No user found, redirecting to home");
        throw redirect({
          to: "/",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw redirect({
        to: "/",
      });
      // return { user: null };
    }
  },
});
