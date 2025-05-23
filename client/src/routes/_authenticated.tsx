import { updateAppSlice } from "@client/store/selectors";
import { getPracticeQueryOptions, userQueryOptions } from "../lib/api/query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Patient, Practice, Practitioner } from "@client/lib/types/auth";

const handleLoggedInUser = (
  user: Patient | Practitioner,
  practice: Practice
) => {
  updateAppSlice("loggedInUser", user);
  updateAppSlice("practice", practice);
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const { user } = await queryClient.fetchQuery(userQueryOptions);
      const { practice } = await queryClient.fetchQuery(
        getPracticeQueryOptions(user?.practiceId ?? "")
      );
      console.log(practice);
      console.log(user);
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
