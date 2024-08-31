import React from "react";
import { Box } from "@mui/material";
import { Navbar } from "@/components/navbar/Navbar";
import { Dashboard } from "@/components/dashboard/Dashboard";

export const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <Dashboard />
    </Box>
  );
};
