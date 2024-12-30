import { Outlet } from "@tanstack/react-router";
import { LandingPage } from "../../components/landing-page/LandingPage";

export const ViewLayout = () => {
  return (
    <>
      <LandingPage />
      <Outlet />
    </>
  );
};
