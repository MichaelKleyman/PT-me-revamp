import { LayoutPage } from "@client/components/layouts/LayoutPage";
import { Outlet } from "@tanstack/react-router";


export const ViewAppPage = () => {
  return (
    <>
      <LayoutPage />
      <Outlet />
    </>
  );
};
