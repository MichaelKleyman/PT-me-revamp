import { LandingPage } from "@client/features/landing-page/exports";
import { Outlet } from "@tanstack/react-router";

export const ViewLandingPage = () => {
  return (
    <>
      <LandingPage />
      <Outlet />
    </>
  );
};
