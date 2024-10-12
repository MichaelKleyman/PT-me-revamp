import { Stack, styled } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(15),
    padding: theme.spacing(10),
    height: "100%",
  }));