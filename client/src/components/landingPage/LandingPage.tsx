"use client";
import { Box } from "@mui/material";
import { Footer } from "@/components/footer/Footer";
import { HomePage } from "@/components/homePage/HomePage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useRevampStore } from "@/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setAppState } from "@/store/slices/app";
import { useEffect } from "react";

export const LandingPage = () => {
  const { user, error, isLoading } = useUser();

  const updateAppSlice = useRevampStore(setAppState);

  useEffect(() => {
    updateAppSlice({ userLoggedIn: !!user });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Box>
      {user ? <Dashboard /> : <HomePage />}
      <Footer />
    </Box>
  );
};
