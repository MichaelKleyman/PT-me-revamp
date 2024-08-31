import { Link, Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(15),
  padding: theme.spacing(10),
  height: "100%",
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
  width: theme.spacing(15),
  textAlign: "center",
}));
