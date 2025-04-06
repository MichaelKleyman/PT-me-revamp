import { Box, CircularProgress } from "@mui/material";

export const LoadingPage = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};
