"use client";
import { Button } from "@mui/material";
import { StyledStack } from "./styles/stylesDashboard";
import { useRevampStore } from "@/store";
import { selectUserLoggedIn } from "@/store/slices/app";

export const Dashboard = () => {
  const userLoggedIn = useRevampStore(selectUserLoggedIn);

  console.log(userLoggedIn);

  return (
    <StyledStack mt={20}>
      <p>Welcome</p>
      <Button href="/api/auth/logout" color="success">
        Logout
      </Button>
    </StyledStack>
  );
};
