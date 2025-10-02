import { useGetPatientsExercises } from "@client/lib/api/practitioner/query";
import { Patient } from "@client/lib/types/auth";
import { Exercise } from "@client/lib/types/exercise";
import {
  CheckCircle,
  Close,
  PlayArrow,
  PlayCircle,
  Refresh,
  Schedule,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { PatientExercisesEmpty } from "./PatientExercisesEmpty";

const mockExercises = [
  {
    id: "1",
    name: "Cat-Cow Stretch",
    description: "Gentle spinal mobility exercise to improve flexibility",
    sets: 2,
    reps: "10-15",
    frequency: "2x daily",
    status: "active",
    difficulty: "beginner",
    targetArea: "Lower Back",
    videoUrl: "/cat-cow-stretch-exercise-demonstration.jpg",
    completedInSession: false,
    instructions: [
      "Start on hands and knees in tabletop position",
      "Arch your back and look up (Cow pose)",
      "Round your spine and tuck chin to chest (Cat pose)",
      "Move slowly between positions",
    ],
  },
  {
    id: "2",
    name: "Pelvic Tilts",
    description: "Strengthen core muscles and improve pelvic alignment",
    sets: 3,
    reps: "12-15",
    frequency: "Daily",
    status: "active",
    difficulty: "beginner",
    targetArea: "Core/Lower Back",
    videoUrl: "/pelvic-tilt-exercise-demonstration.jpg",
    completedInSession: true,
    instructions: [
      "Lie on back with knees bent",
      "Tighten abdominal muscles",
      "Tilt pelvis to flatten lower back against floor",
      "Hold for 5 seconds, then relax",
    ],
  },
  {
    id: "3",
    name: "Bird Dog",
    description: "Core stability exercise to improve balance and coordination",
    sets: 2,
    reps: "8-10 each side",
    frequency: "Daily",
    status: "pending",
    difficulty: "intermediate",
    targetArea: "Core/Back",
    videoUrl: "/bird-dog-exercise-demonstration.jpg",
    completedInSession: false,
    instructions: [
      "Start in tabletop position",
      "Extend opposite arm and leg simultaneously",
      "Hold for 5-10 seconds",
      "Return to start and switch sides",
    ],
  },
  {
    id: "4",
    name: "Wall Sits",
    description: "Strengthen leg muscles and improve endurance",
    sets: 3,
    reps: "30-60 seconds",
    frequency: "3x weekly",
    status: "completed",
    difficulty: "intermediate",
    targetArea: "Legs/Glutes",
    videoUrl: "/wall-sit-exercise-demonstration.jpg",
    completedInSession: false,
    instructions: [
      "Stand with back against wall",
      "Slide down until thighs are parallel to floor",
      "Keep knees at 90-degree angle",
      "Hold position for prescribed time",
    ],
  },
];

console.log(mockExercises);
const statusConfig = {
  active: { color: "success" as const, icon: PlayArrow },
  completed: { color: "info" as const, icon: CheckCircle },
  pending: { color: "warning" as const, icon: Schedule },
  skipped: { color: "warning" as const, icon: Schedule },
};

const difficultyConfig = {
  beginner: { color: "success" as const },
  intermediate: { color: "warning" as const },
  advanced: { color: "error" as const },
};

type TPatientExerciseHistoryProps = {
  patient?: Patient;
};

export const PatientExerciseHistory = (props: TPatientExerciseHistoryProps) => {
  const { patient } = props;

  // const [exercises, setExercises] = useState(mockExercises);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { data } = useGetPatientsExercises(String(patient?.id));

  console.log(patientsExercises);

  const handleSessionCompletion = (exerciseId: string, completed: boolean) => {
    console.log({ exerciseId, completed });
    // setExercises((prev) =>
    //   prev.map((exercise) =>
    //     exercise.id === exerciseId
    //       ? { ...exercise, completedInSession: completed }
    //       : exercise
    //   )
    // );
  };

  const handleSetSelectedVideo = (exercise?: Exercise) => {
    if (!exercise) setSelectedVideo(null);
    setSelectedVideo(
      selectedVideo === exercise?.id ? null : (exercise?.id ?? "")
    );
  };

  const renderCurrentSessionProgress = (
    <CardContent sx={{ pt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight="semibold" gutterBottom>
            Today's Session Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track exercises completed during this visit
          </Typography>
        </Box>
        <Box textAlign="right">
          {/* <Typography variant="h4" fontWeight="bold" color="primary.main">
            {completedInSessionCount}/{exercises.length}
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            Completed
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  );

  const renderCompletedToday = (
    <Typography variant="body2" color="text.secondary">
      Completed Today:
      <Typography
        component="span"
        color="info.main"
        fontWeight="medium"
        sx={{ ml: 1 }}
      >
        {patientsExercises?.filter((e) => e.status === "completed").length}
      </Typography>
    </Typography>
  );

  if (!patientsExercises?.length) {
    return <PatientExercisesEmpty />;
  }

  return (
    <Stack spacing={3}>
      <Card sx={{ bgcolor: "primary.50", borderColor: "primary.200" }}>
        {renderCurrentSessionProgress}
      </Card>

      <Card>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="semibold">
              Current Exercise Program
            </Typography>
          }
          action={
            <Button variant="outlined" size="small" startIcon={<Refresh />}>
              Update Program
            </Button>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            {patientsExercises?.map((exercise) => {
              return (
                <PatientExercise
                  key={exercise.id}
                  exercise={exercise}
                  selectedVideo={selectedVideo}
                  handleSessionCompletion={handleSessionCompletion}
                  handleSetSelectedVideo={handleSetSelectedVideo}
                />
              );
            })}

            <Paper
              sx={{ p: 2, bgcolor: "primary.50", borderColor: "primary.200" }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="subtitle1" fontWeight="medium">
                  Exercise Program Summary
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">
                    Active Exercises:
                    <Typography
                      component="span"
                      color="success.main"
                      fontWeight="medium"
                      sx={{ ml: 1 }}
                    >
                      {
                        patientsExercises?.filter((e) => e.status === "active")
                          .length
                      }
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">
                    Session Complete:
                    <Typography
                      component="span"
                      color="info.main"
                      fontWeight="medium"
                      sx={{ ml: 1 }}
                    >
                      {/* {completedInSessionCount} */}
                      N/A
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {renderCompletedToday}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">
                    Pending:
                    <Typography
                      component="span"
                      color="warning.main"
                      fontWeight="medium"
                      sx={{ ml: 1 }}
                    >
                      {
                        patientsExercises?.filter((e) => e.status === "pending")
                          .length
                      }
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

type TPatientExerciseProps = {
  exercise: Exercise;
  selectedVideo: string | null;
  handleSessionCompletion: (exerciseId: string, completed: boolean) => void;
  handleSetSelectedVideo: (exercise?: Exercise) => void;
};

const PatientExercise = (props: TPatientExerciseProps) => {
  const {
    exercise,
    selectedVideo,
    handleSessionCompletion,
    handleSetSelectedVideo,
  } = props;

  const StatusIcon = statusConfig[exercise.status].icon;

  const renderExerciseMetadata = (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight="medium">
          {exercise.name}
        </Typography>
        <Chip
          icon={<StatusIcon />}
          label={exercise.status}
          color={statusConfig[exercise.status].color}
          size="small"
        />
        <Chip
          label={exercise.difficulty}
          color={difficultyConfig[exercise.difficulty].color}
          variant="outlined"
          size="small"
        />
        {/* {exercise.completedInSession && (
          <Chip
            icon={<Check />}
            label="Session Complete"
            color="success"
            size="small"
          />
        )} */}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {exercise.description}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" color="text.secondary">
          <strong>Target:</strong> {exercise.targetArea}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Sets:</strong> {exercise.sets}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Reps:</strong> {exercise.reps}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Frequency:</strong> {exercise.frequency}
        </Typography>
      </Stack>
    </Box>
  );

  const renderExerciseVideoPreview = (
    <Box sx={{ flexShrink: 0 }}>
      <Box
        sx={{
          position: "relative",
          width: 128,
          height: 80,
          bgcolor: "grey.200",
          borderRadius: 1,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover": { opacity: 0.8 },
          transition: "opacity 0.2s",
        }}
        onClick={() => handleSetSelectedVideo(exercise)}
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
          <PlayCircle sx={{ color: "white", fontSize: 24 }} />
        </Box>
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        sx={{ display: "block", mt: 0.5 }}
      >
        {selectedVideo === exercise.id ? "Hide" : "Show"} Video
      </Typography>
    </Box>
  );

  const renderSelectedExerciseVideo =
    selectedVideo === exercise.id ? (
      <Box sx={{ bgcolor: "grey.50", borderRadius: 1, p: 2 }}>
        <Box
          sx={{
            aspectRatio: "16/9",
            bgcolor: "black",
            borderRadius: 1,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <img
            src={exercise.videoUrl || "/placeholder.svg"}
            alt={`${exercise.name} demonstration video`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Exercise Demonstration
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Close />}
            onClick={() => handleSetSelectedVideo()}
          >
            Close
          </Button>
        </Stack>
      </Box>
    ) : null;

  const renderExerciseInstructions = (
    <Box sx={{ bgcolor: "grey.50", borderRadius: 1, p: 2 }}>
      <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
        Instructions:
      </Typography>
      <Box component="ol" sx={{ m: 0, pl: 0, listStyle: "none" }}>
        {exercise.instructions.map((instruction, index) => (
          <Box component="li" key={index} sx={{ display: "flex", mb: 0.5 }}>
            <Typography
              variant="body2"
              color="primary.main"
              fontWeight="medium"
              sx={{ mr: 1 }}
            >
              {index + 1}.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {instruction}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Paper key={exercise.id} variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ mt: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true} // TODO: Revisit
                  onChange={(e) =>
                    handleSessionCompletion(exercise.id, e.target.checked)
                  }
                  size="small"
                />
              }
              label={
                <Typography variant="body2" fontWeight="medium">
                  Done in session
                </Typography>
              }
            />
          </Box>
          {renderExerciseMetadata}
          {renderExerciseVideoPreview}
        </Stack>
        {renderSelectedExerciseVideo}
        {renderExerciseInstructions}
      </Stack>
    </Paper>
  );
};
