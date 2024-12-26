import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  isLoggedIn?: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
