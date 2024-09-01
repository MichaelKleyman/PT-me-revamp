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
      width="100%"
    >
      <Box>LOGO</Box>
      <Box display="flex" gap={6}>
        <Typography
          sx={(theme) => ({
            cursor: "pointer",
            "&:hover": { color: theme.palette.background.paper },
          })}
        >
          About
        </Typography>
        <Typography
          sx={(theme) => ({
            cursor: "pointer",
            "&:hover": { color: theme.palette.background.paper },
          })}
        >
          Services
        </Typography>
        <Typography
          sx={(theme) => ({
            cursor: "pointer",
            "&:hover": { color: theme.palette.background.paper },
          })}
        >
          Lorem Upsum
        </Typography>
        <Typography
          sx={(theme) => ({
            cursor: "pointer",
            "&:hover": { color: theme.palette.background.paper },
          })}
        >
          Lorem Ipsum
        </Typography>
        <Typography
          sx={(theme) => ({
            cursor: "pointer",
            "&:hover": { color: theme.palette.background.paper },
          })}
        >
          Lorem Ipsum
        </Typography>
      </Box>
      <Box display="flex" gap={3}>
        <StyledButtons
          href="/api/auth/login"
          sx={{ color: "blue", fontWeight: "bold" }}
        >
          Login
        </StyledButtons>
        <StyledButtons
          href="/signup"
          sx={(theme) => ({
            color: "white",
            background: theme.palette.background.paper,
            fontWeight: "bold",
          })}
        >
          Get Started
        </StyledButtons>
      </Box>
    </StyledStack>
  );
};
