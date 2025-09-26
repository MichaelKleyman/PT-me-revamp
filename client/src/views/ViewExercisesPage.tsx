import { Box } from "@mui/material";

import { ExercisesPage } from "@client/features/exercises-page/components/ExercisesPage";

export const ViewExercisesPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3 }}>
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <ExercisesPage />
      </Box>
    </Box>
  );
};
