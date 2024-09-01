import { Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  bottom: -20,
  background: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius * 4,
  height: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: theme.spacing(4),
}));
