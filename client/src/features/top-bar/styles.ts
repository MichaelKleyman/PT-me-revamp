import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "@tanstack/react-router";

export const StyledNavItem = styled(Stack)({
  color: "black",
  fontSize: "15px",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 5),
  gap: theme.spacing(2),
  background: "white",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius * 7,
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
  },
}));

export const StyledContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  padding: theme.spacing(2, 10),
  gap: theme.spacing(2),
  background: "white",
  borderRadius: theme.spacing(4),
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
}));
