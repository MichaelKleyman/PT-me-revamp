import { updateAppSlice } from "@client/store/selectors";
import { getPracticeQueryOptions, userQueryOptions } from "../lib/api/query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Practice, User } from "@client/lib/types/auth";

const handleLoggedInUser = (user: User, practice: Practice) => {
  updateAppSlice("loggedInUser", user);
  updateAppSlice("practice", practice);
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const userResponse = await queryClient.fetchQuery(userQueryOptions);

      // Type guard to check for error response
      if ("error" in userResponse) {
        console.log("User fetch error:", userResponse.error);
        throw redirect({ to: "/" });
      }

      const { user } = userResponse;

      const practiceResponse = await queryClient.fetchQuery(
        getPracticeQueryOptions(user?.practiceId ?? "")
      );

      // Type guard to check for error response
      if ("error" in practiceResponse) {
        console.log("Practice fetch error:", practiceResponse.error);
        throw redirect({ to: "/" });
      }

      const { practice } = practiceResponse;
      if (!user || !practice) {
        console.log("No user or practice found, redirecting to home");
        throw redirect({
          to: "/",
        });
      }

      handleLoggedInUser(user, practice);
    } catch (error) {
      console.error("Authentication error:", error);
      throw redirect({
        to: "/",
      });
    }
  },
});
