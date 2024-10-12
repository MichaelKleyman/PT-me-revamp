"use client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { HomePage } from "@/components/homePage/HomePage";
import { LandingPage } from "@/components/landingPage/LandingPage";
import { Navbar } from "@/components/navbar/Navbar";
import { useRevampStore } from "@/store";
import { setAppState } from "@/store/slices/app";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();

  const updateAppSlice = useRevampStore(setAppState);

  useEffect(() => {
    if (user) {
      console.log(user);
      updateAppSlice({ userLoggedIn: !!user });
    }
  }, [user, updateAppSlice]);

  if (isLoading)
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress />
      </Box>
    );
  if (error) return <div>{error.message}</div>;
  return (
    <>
      {!user ? <Navbar /> : null}
      {user ? <Dashboard /> : <HomePage />}
      {/* <LandingPage /> */}
    </>
  );
}
