"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledButtons, StyledStack } from "./styles/stylesNavbar";

export const Navbar = () => {
  return (
    <StyledStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>LOGO</Box>
      <Box display="flex" gap={6}>
        <Typography sx={{ cursor: "pointer" }}>About</Typography>
        <Typography sx={{ cursor: "pointer" }}>Services</Typography>
      </Box>
      <Box display="flex" gap={3}>
        <StyledButtons href="/login" style={{ color: "blue" }}>
          Login
        </StyledButtons>
        <StyledButtons
          href="/signup"
          style={{ color: "white", background: "blue" }}
        >
          Get Started
        </StyledButtons>
      </Box>
    </StyledStack>
  );
};
