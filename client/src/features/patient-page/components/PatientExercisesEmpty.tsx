import { Add, TextSnippet } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export const PatientExercisesEmpty = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Current Exercise Program
            </Typography>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
              px: 2,
              textAlign: "center",
            }}
          >
            <TextSnippet color="action" />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              gutterBottom
            >
              No Exercises Assigned
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 400 }}
            >
              This patient doesn't have any exercises in their current program.
              Add exercises from the exercise library to get started with their
              treatment plan.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" startIcon={<Add />}>
                Add Exercises
              </Button>
              <Button variant="outlined" startIcon={<TextSnippet />}>
                Browse Exercise Library
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
