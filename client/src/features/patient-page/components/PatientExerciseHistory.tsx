import { useGetPatientsExercises } from "@client/lib/api/practitioner/query";
import { Patient } from "@client/lib/types/auth";
import { Exercise } from "@client/lib/types/exercise";
import {
  Check,
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
import { PatientExerciseMetaData } from "@client/lib/types/patient";

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

  const { data: patientsExercises } = useGetPatientsExercises(
    String(patient?.id)
  );
  const allExercises = patientsExercises?.map((item) => item.exercises);
  const allExercisesMetaData = patientsExercises?.map(
    (item) => item.patient_exercises
  );

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
        {allExercisesMetaData?.filter((e) => e.status === "completed").length}
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
            {allExercisesMetaData?.map((metadata) => {
              return (
                <PatientExercise
                  key={metadata.id}
                  exercise={
                    allExercises.filter(
                      ({ id }) => id === metadata.exerciseId
                    )[0]
                  }
                  exerciseMetadata={metadata}
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
                        allExercisesMetaData?.filter(
                          (e) => e.status === "active"
                        ).length
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
                        allExercisesMetaData?.filter(
                          (e) => e.status === "pending"
                        ).length
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
  exerciseMetadata: PatientExerciseMetaData;
  selectedVideo: string | null;
  handleSessionCompletion: (exerciseId: string, completed: boolean) => void;
  handleSetSelectedVideo: (exercise?: Exercise) => void;
};

const PatientExercise = (props: TPatientExerciseProps) => {
  const {
    exercise,
    exerciseMetadata,
    selectedVideo,
    handleSessionCompletion,
    handleSetSelectedVideo,
  } = props;

  const StatusIcon = statusConfig[exerciseMetadata.status].icon;

  const renderExerciseMetadata = (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight="medium">
          {exercise.name}
        </Typography>
        <Chip
          icon={<StatusIcon />}
          label={exerciseMetadata.status}
          color={statusConfig[exerciseMetadata.status].color}
          size="small"
        />
        <Chip
          label={exercise.difficulty}
          color={difficultyConfig[exercise.difficulty]?.color}
          variant="outlined"
          size="small"
        />
        {/* {exercise.completedInSession && ( */}
        <Chip
          icon={<Check />}
          label="Session Complete"
          color="success"
          size="small"
        />
        {/* // )} */}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {exercise.description}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" color="text.secondary">
          <strong>Target:</strong> {exercise.targetArea}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Sets:</strong> {exerciseMetadata.sets}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Reps:</strong> {exerciseMetadata.reps}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Frequency:</strong> {exerciseMetadata.frequency}
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
        {exercise.instructions?.map((instruction, index) => (
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
    <Paper key={exerciseMetadata.id} variant="outlined" sx={{ p: 2 }}>
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

const mockPatientExercises = [
  {
    patient_exercises: {
      id: 1,
      patientId: 123,
      exerciseId: 1,
      sets: 3,
      reps: "10-12",
      frequency: "3x per week",
      status: "active",
      lastCompletedDate: "2025-10-05T14:30:00Z",
      createdAt: "2025-09-15T10:00:00Z",
    },
    exercises: {
      id: 1,
      name: "Push-ups",
      description:
        "A fundamental upper body exercise that builds chest, shoulder, and tricep strength while engaging your core for stability.",
      difficulty: "beginner",
      targetArea: "Chest, Shoulders, Triceps",
      duration: "5-10 minutes",
      equipment: null,
      videoUrl: "https://example.com/videos/pushups.mp4",
      instructions: [
        "Start in a plank position with hands slightly wider than shoulder-width",
        "Keep your body in a straight line from head to heels",
        "Lower your chest toward the ground by bending your elbows",
        "Push back up to the starting position",
        "Repeat for the prescribed number of repetitions",
      ],
      benefits: [
        "Builds upper body strength",
        "Improves core stability",
        "No equipment needed",
        "Can be modified for all fitness levels",
      ],
      createdAt: "2025-01-10T08:00:00Z",
    },
  },
  {
    patient_exercises: {
      id: 2,
      patientId: 123,
      exerciseId: 2,
      sets: 4,
      reps: "8-10",
      frequency: "2x per week",
      status: "active",
      lastCompletedDate: "2025-10-06T16:45:00Z",
      createdAt: "2025-09-20T11:30:00Z",
    },
    exercises: {
      id: 2,
      name: "Goblet Squats",
      description:
        "A lower body exercise using a dumbbell or kettlebell held at chest level to build leg strength and improve squat mechanics.",
      difficulty: "intermediate",
      targetArea: "Quadriceps, Glutes, Core",
      duration: "10-15 minutes",
      equipment: "Dumbbell or Kettlebell (15-25 lbs)",
      videoUrl: "https://example.com/videos/goblet-squats.mp4",
      instructions: [
        "Hold a dumbbell or kettlebell vertically at chest level with both hands",
        "Stand with feet shoulder-width apart, toes slightly pointed out",
        "Keep your chest up and core engaged",
        "Lower down by bending your knees and hips as if sitting back into a chair",
        "Go as low as comfortable while keeping your heels on the ground",
        "Push through your heels to return to standing position",
      ],
      benefits: [
        "Strengthens legs and glutes",
        "Improves squat form and mobility",
        "Engages core muscles",
        "Builds functional strength for daily activities",
      ],
      createdAt: "2025-01-15T09:30:00Z",
    },
  },
  {
    patient_exercises: {
      id: 3,
      patientId: 123,
      exerciseId: 3,
      sets: 3,
      reps: "30-60 seconds hold",
      frequency: "Daily",
      status: "completed",
      lastCompletedDate: "2025-10-08T07:15:00Z",
      createdAt: "2025-09-10T14:00:00Z",
    },
    exercises: {
      id: 3,
      name: "Plank Hold",
      description:
        "An isometric core strengthening exercise that builds endurance in the abdominals, back, and stabilizer muscles throughout the body.",
      difficulty: "beginner",
      targetArea: "Core, Shoulders, Back",
      duration: "2-5 minutes",
      equipment: "Exercise mat (optional)",
      videoUrl: "https://example.com/videos/plank-hold.mp4",
      instructions: [
        "Start on your forearms and toes in a plank position",
        "Keep your elbows directly under your shoulders",
        "Maintain a straight line from head to heels - don't let hips sag or pike up",
        "Engage your core by pulling your belly button toward your spine",
        "Keep your neck neutral by looking at the floor",
        "Hold for the prescribed duration while breathing steadily",
      ],
      benefits: [
        "Strengthens entire core",
        "Improves posture",
        "Reduces back pain",
        "Builds shoulder stability",
        "No equipment required",
      ],
      createdAt: "2025-01-05T10:15:00Z",
    },
  },
];
