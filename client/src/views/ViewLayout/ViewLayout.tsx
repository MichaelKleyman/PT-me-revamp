import { Outlet } from "@tanstack/react-router";
import { LandingPage } from "../../components/LandingPage/LandingPage";

export const ViewLayout = () => {
  return (
    <>
      <LandingPage />
      <Outlet />
    </>
  );
};
