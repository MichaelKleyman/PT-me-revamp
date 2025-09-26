import { Exercise } from "@client/lib/types/exercise";
import { Add, PlayArrow, Visibility } from "@mui/icons-material";
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
import { useState } from "react";

type TExercisesGridProps = {
  filteredExercises: Exercise[];
};

const difficultyConfig = {
  beginner: { color: "success" as const },
  intermediate: { color: "warning" as const },
  advanced: { color: "error" as const },
};

export const ExercisesGrid = (props: TExercisesGridProps) => {
  const { filteredExercises } = props;

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
                  aspectRatio: "16/9",
                  bgcolor: "grey.200",
                  cursor: "pointer",
                  position: "relative",
                  "&:hover": { opacity: 0.8 },
                  transition: "opacity 0.2s",
                }}
                onClick={() =>
                  setSelectedVideo(
                    selectedVideo === exercise.id ? null : exercise.id
                  )
                }
              >
                <img
                  src={exercise.videoUrl || "/placeholder.svg"}
                  alt={`${exercise.name} demonstration`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0,0,0,0.2)",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.9)",
                      borderRadius: "50%",
                      p: 1.5,
                      display: "flex",
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 32 }} />
                  </Box>
                </Box>
              </Box>

              {selectedVideo === exercise.id && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Card sx={{ maxWidth: 400, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Video Preview
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Full video demonstration would play here
                    </Typography>
                    <Button size="small" onClick={() => setSelectedVideo(null)}>
                      Close Preview
                    </Button>
                  </Card>
                </Box>
              )}
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
                  {exercise.benefits.slice(0, 3).map((benefit, index) => (
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
