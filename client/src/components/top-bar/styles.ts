import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "@tanstack/react-router";

export const StyledNavItem = styled(Stack)({
  color: "black",
  fontSize: "16px",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

export const StyledLink = styled(Link)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 5),
  gap: theme.spacing(2),
  background: "white",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius * 7,
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const StyledContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  padding: theme.spacing(2, 10),
  gap: theme.spacing(2),
  background: "white",
  borderRadius: theme.spacing(4),
}));
