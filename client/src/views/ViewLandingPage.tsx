import { LandingPage } from "@client/components/landing-page/LandingPage";
import { Outlet } from "@tanstack/react-router";

export const ViewLandingPage = () => {
  return (
    <>
      <LandingPage />
      <Outlet />
    </>
  );
};
