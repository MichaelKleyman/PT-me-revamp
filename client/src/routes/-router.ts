import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { isLoggedIn: undefined, queryClient },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
