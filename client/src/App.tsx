import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/-router";

export const App = () => {
  return (
    <RouterProvider
      basepath='/'
      router={router}
      context={{ isLoggedIn: false }}
    />
  );
};
