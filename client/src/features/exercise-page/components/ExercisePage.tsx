import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  IconButton,
  Paper,
  Alert,
  Stack,
  Divider,
  Avatar,
  InputAdornment,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  Verified,
  Search,
  CheckCircle,
  Info,
} from "@mui/icons-material";
import { Exercise } from "@client/lib/types/exercise";
import { Link } from "@tanstack/react-router";
import { useGetAllPatients } from "@client/lib/api/practitioner/query";
import { useAppStore } from "@client/store";
import { useSelectPractice } from "@client/store/selectors";

// type CreatorInfo = {
//   name: string;
//   role: string;
//   isVerified: boolean;
// };

// type ExerciseVariation = {
//   id: string;
//   name: string;
//   description: string;
// };

// type ExerciseDetailPageProps = {
//   exercise: Exercise;
//   patients: Patient[];
//   variations: ExerciseVariation[];
//   creatorInfo: CreatorInfo;
//   source: "practitioner" | "platform";
//   onAssign: (assignmentData: {
//     exerciseId: string;
//     variation: string;
//     duration: string;
//     frequency: string;
//     patients: string[];
//   }) => void;
// };

const difficultyConfig = {
  beginner: { bgcolor: "#e8f5e9", color: "#2e7d32", label: "Beginner" },
  intermediate: { bgcolor: "#fff8e1", color: "#f57f17", label: "Intermediate" },
  advanced: { bgcolor: "#ffebee", color: "#c62828", label: "Advanced" },
};

type AssignmentStep = "select" | "configure" | "patients";

type TExercisePageProps = {
  exercise?: Exercise;
};

export const ExercisePage = (props: TExercisePageProps) => {
  const { exercise } = props;
  const practice = useAppStore(useSelectPractice);
  const practiceId = String(practice?.id);

  const { data: patients } = useGetAllPatients(practiceId);

  //   const [selectedVariation, setSelectedVariation] = useState<string>(
  //     variations[0]?.id || ""
  //   );
  const [assignmentStep, setAssignmentStep] =
    useState<AssignmentStep>("select");
  const [selectedDuration, setSelectedDuration] = useState<string>("default");
  const [selectedFrequency, setSelectedFrequency] =
    useState<string>("3x-weekly");
  const [searchPatient, setSearchPatient] = useState("");
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const filteredPatients = patients?.filter((patient) => {
    const patientName = patient.firstName + patient.lastName;
    return patientName.toLowerCase().includes(searchPatient.toLowerCase());
    // ||  patient.toLowerCase().includes(searchPatient.toLowerCase())
  });

  const handleAssign = () => {
    if (assignmentStep === "select") {
      setAssignmentStep("configure");
    } else if (assignmentStep === "configure") {
      setAssignmentStep("patients");
    } else {
      //   onAssign({
      //     exerciseId: exercise?.id.toString(),
      //     variation: selectedVariation,
      //     duration: selectedDuration,
      //     frequency: selectedFrequency,
      //     patients: selectedPatients,
      //   });
    }
  };

  const handleBack = () => {
    if (assignmentStep === "configure") {
      setAssignmentStep("select");
    } else if (assignmentStep === "patients") {
      setAssignmentStep("configure");
    }
  };

  const togglePatient = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleDurationChange = (event: SelectChangeEvent) => {
    setSelectedDuration(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setSelectedFrequency(event.target.value);
  };

  const getStepNumber = () => {
    switch (assignmentStep) {
      case "select":
        return "1 of 3";
      case "configure":
        return "2 of 3";
      case "patients":
        return "3 of 3";
    }
  };

  const getButtonText = () => {
    switch (assignmentStep) {
      case "select":
        return "Select Variation";
      case "configure":
        return "Configure";
      case "patients":
        return "Assign Exercise";
    }
  };

  //   const isButtonDisabled = () => {
  //     if (assignmentStep === "patients" && selectedPatients.length === 0)
  //       return true;
  //     if (assignmentStep === "select" && !selectedVariation) return true;
  //     return false;
  //   };

  const renderGoBack = (
    <Link href="/practice/exercises" to="/practice/exercises">
      <Tooltip title="Go Back">
        <span>
          <ArrowBack color="primary" />
        </span>
      </Tooltip>
    </Link>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3 }}>
      {renderGoBack}
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            {exercise?.name}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
            gap: 3,
          }}
        >
          {/* Left Column - Exercise Details */}
          <Stack spacing={3}>
            {/* Video Section */}
            <Card>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={exercise?.videoUrl || "/placeholder.svg"}
                  alt={`${exercise?.name} demonstration`}
                  sx={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0, 0, 0, 0.2)",
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.3)" },
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                      p: 2,
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 48 }} />
                  </IconButton>
                </Box>
              </Box>
            </Card>

            {/* Description */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About This Exercise
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {exercise?.description}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      Difficulty
                    </Typography>
                    {exercise?.difficulty ? (
                      <Chip
                        label={difficultyConfig[exercise?.difficulty].label}
                        size="small"
                        sx={{
                          bgcolor:
                            difficultyConfig[exercise?.difficulty].bgcolor,
                          color: difficultyConfig[exercise?.difficulty].color,
                          fontWeight: 500,
                        }}
                      />
                    ) : null}
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      Target Area
                    </Typography>
                    <Typography fontWeight={500}>
                      {exercise?.targetArea}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      Duration
                    </Typography>
                    <Typography fontWeight={500}>
                      {exercise?.duration}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      Equipment
                    </Typography>
                    <Typography fontWeight={500}>
                      {exercise?.equipment}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                    gap: 1.5,
                  }}
                >
                  {exercise?.benefits?.map((benefit, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "primary.main",
                          borderRadius: "50%",
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography>{benefit}</Typography>
                    </Stack>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Step-by-Step Instructions
                </Typography>
                <Stack spacing={2}>
                  {exercise?.instructions.map((instruction, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "primary.main",
                          fontSize: 14,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <Typography sx={{ pt: 0.25 }}>{instruction}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Right Column - Assignment Section */}
          <Stack spacing={3}>
            {/* Creator Info */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Creator Information
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Avatar sx={{ width: 48, height: 48 }}>👤</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={500}>
                        {/* {creatorInfo.name} */}
                        Creator Name
                      </Typography>
                      {/* {creatorInfo.isVerified && (
                        <Verified sx={{ fontSize: 16, color: "info.main" }} />
                      )} */}
                      {<Verified sx={{ fontSize: 16, color: "info.main" }} />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {/* {creatorInfo.role} */}
                      Creator Role
                    </Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Source:
                  </Typography>
                  <Chip
                    // label={
                    //   source === "practitioner"
                    //     ? "👨‍⚕️ Practitioner Created"
                    //     : "🏢 Platform"
                    // }
                    label={"🏢 Platform"}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Assignment Section - Multi-step */}
            <Card sx={{ borderColor: "primary.light", borderWidth: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Assign to Patient Program
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Step {getStepNumber()}
                </Typography>

                {/* Step 1: Select Variation */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Step 1: Select Exercise Variation
                  </Typography>
                  {/* <RadioGroup
                    value={selectedVariation}
                    onChange={(e) => setSelectedVariation(e.target.value)}
                  >
                    <Stack spacing={1}>
                      {variations.map((variation) => (
                        <Paper
                          key={variation.id}
                          variant="outlined"
                          sx={{
                            p: 2,
                            cursor: "pointer",
                            borderColor:
                              selectedVariation === variation.id
                                ? "primary.main"
                                : "divider",
                            bgcolor:
                              selectedVariation === variation.id
                                ? "primary.50"
                                : "transparent",
                            "&:hover": {
                              borderColor: "primary.light",
                            },
                          }}
                          //   onClick={() => setSelectedVariation(variation.id)}
                        >
                          <FormControlLabel
                            value={variation.id}
                            control={<Radio size="small" />}
                            label={
                              <Box>
                                <Typography fontWeight={500}>
                                  {variation.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {variation.description}
                                </Typography>
                              </Box>
                            }
                            sx={{ m: 0, alignItems: "flex-start" }}
                          />
                        </Paper>
                      ))}
                    </Stack>
                  </RadioGroup> */}
                </Box>

                {/* Step 2: Configure Assignment */}
                {(assignmentStep === "configure" ||
                  assignmentStep === "patients") && (
                  <Box sx={{ mb: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Step 2: Configure Assignment
                    </Typography>

                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Duration Override</InputLabel>
                        <Select
                          value={selectedDuration}
                          label="Duration Override"
                          onChange={handleDurationChange}
                        >
                          <MenuItem value="default">
                            Use Default ({exercise?.duration})
                          </MenuItem>
                          <MenuItem value="short">Short (1-2 min)</MenuItem>
                          <MenuItem value="standard">
                            Standard (2-4 min)
                          </MenuItem>
                          <MenuItem value="long">Extended (5-10 min)</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small">
                        <InputLabel>Frequency</InputLabel>
                        <Select
                          value={selectedFrequency}
                          label="Frequency"
                          onChange={handleFrequencyChange}
                        >
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="5x-weekly">5x Weekly</MenuItem>
                          <MenuItem value="3x-weekly">3x Weekly</MenuItem>
                          <MenuItem value="2x-weekly">2x Weekly</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                      </FormControl>

                      <Alert icon={<Info />} severity="info">
                        <Typography variant="caption">
                          <strong>Assignment Preview:</strong> Patients will
                          perform <strong>{exercise?.name}</strong> (
                          {selectedDuration === "default"
                            ? exercise?.duration
                            : selectedDuration}
                          ) <strong>{selectedFrequency}</strong>
                        </Typography>
                      </Alert>
                    </Stack>
                  </Box>
                )}

                {/* Step 3: Select Patients */}
                {assignmentStep === "patients" && (
                  <Box sx={{ mb: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Step 3: Select Patients
                    </Typography>

                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search patients..."
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Stack
                      spacing={1}
                      sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}
                    >
                      {filteredPatients?.map((patient) => (
                        <Paper
                          key={patient.id}
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            cursor: "pointer",
                            "&:hover": { bgcolor: "action.hover" },
                          }}
                          onClick={() =>
                            togglePatient(patient.id?.toString() ?? "")
                          }
                        >
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Checkbox
                              checked={selectedPatients.includes(
                                patient.id?.toString() ?? ""
                              )}
                              size="small"
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight={500}>
                                {patient.firstName + patient.lastName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {/* {patient.condition} */}
                                Condition
                              </Typography>
                            </Box>
                            <Chip
                              label={"Active"}
                              variant="outlined"
                              size="small"
                            />
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>

                    {selectedPatients.length > 0 && (
                      <Alert icon={<CheckCircle />} severity="success">
                        <Typography variant="caption">
                          {selectedPatients.length} patient
                          {selectedPatients.length !== 1 ? "s" : ""} selected
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                )}

                {/* Navigation Buttons */}
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={1}>
                  {assignmentStep !== "select" && (
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ flex: 1 }}
                    >
                      ← Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleAssign}
                    // disabled={isButtonDisabled()}
                    sx={{ flex: 1 }}
                  >
                    {getButtonText()}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Variations Info Card */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  About Variations
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Variations allow you to customize exercise difficulty for
                  different patient needs and recovery stages.
                </Typography>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    • <strong>Beginner</strong> - For initial recovery phase
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • <strong>Standard</strong> - For general patient population
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • <strong>Advanced</strong> - For experienced, strong
                    patients
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
