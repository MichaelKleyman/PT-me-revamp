import React from "react";
import { Box } from "@mui/material";
import { Navbar } from "@/components/navbar/Navbar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Footer } from "@/components/footer/Footer";

export const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <Dashboard />
      <Footer />
    </Box>
  );
};
