import { Exercise } from "@client/lib/types/exercise";
import { difficultyConfig } from "@client/lib/utils/difficulty";
import { Add, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

type TExercisesGridProps = {
  filteredExercises?: Exercise[];
};

export const ExercisesGrid = (props: TExercisesGridProps) => {
  const { filteredExercises = [] } = props;
  const navigate = useNavigate();

  const handleViewExercise = (exerciseId: string) => {
    navigate({
      to: "/practice/exercises/$exerciseId",
      params: { exerciseId },
    });
  };

  return (
    <Grid container spacing={3}>
      {filteredExercises.map((exercise) => (
        <Grid item xs={12} md={6} lg={4} key={exercise.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={exercise?.videoUrl}
                  title="Exercise demonstration"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Box>
            <CardHeader
              title={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography variant="h6">{exercise.name}</Typography>
                  <Chip
                    label={exercise.difficulty}
                    size="small"
                    variant="outlined"
                    color={difficultyConfig[exercise.difficulty].color}
                  />
                </Stack>
              }
              subheader={
                <Typography variant="body2">{exercise.description}</Typography>
              }
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Target:
                  </Typography>
                  <Typography variant="body2">{exercise.targetArea}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2">{exercise.duration}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Equipment:
                  </Typography>
                  <Typography variant="body2">{exercise.equipment}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Level:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {exercise.difficulty}
                  </Typography>
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Key Benefits:
                </Typography>
                <Stack spacing={0.5}>
                  {exercise.benefits?.slice(0, 3).map((benefit, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          bgcolor: "primary.main",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {benefit}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  startIcon={<Visibility />}
                  onClick={() => {
                    handleViewExercise(String(exercise.id));
                  }}
                >
                  View Details
                </Button>
                <Button variant="outlined" size="small" startIcon={<Add />}>
                  Add
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
