import { LayoutPage } from "@client/layouts/LayoutPage";
import { Outlet } from "@tanstack/react-router";

export const ViewAppPage = () => {
  return (
    <>
      <LayoutPage>
        <Outlet />
      </LayoutPage>
    </>
  );
};
