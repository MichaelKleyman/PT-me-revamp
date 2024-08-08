import { Stack, styled } from "@mui/material";
import Link from "next/link";

export const StyledStack = styled(Stack)(({ theme }) => ({
  position: "fixed",
  top: 0,
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 4,
  margin: theme.spacing(4),
  padding: theme.spacing(2),
  width: "95%",
  boxShadow: "0px 4px 12px rgba(0.2, 0, 0, 0.2)",
}));

export const StyledButtons = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  boxShadow: "0px 4px 12px rgba(0.2, 0, 0, 0.2)",
  transition: "transform 300ms",
  textDecoration: "none",
  padding: theme.spacing(1),
  cursor: "pointer",
  "&:hover": {
    background: "white",
    color: "#3d5afe",
    transform: "scale(1.1)",
  },
}));
