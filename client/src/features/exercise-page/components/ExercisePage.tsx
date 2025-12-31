import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  Alert,
} from "@mui/material";
import { ArrowBack, Verified } from "@mui/icons-material";
import { Exercise } from "@client/lib/types/exercise";
import { Link } from "@tanstack/react-router";
import { ExercisePatientSelect } from "./ExercisePatientSelect";
import { VerificationInfoCard } from "@client/lib/components/cards/VerificationInfoCard";
import { ExerciseInstructionsCard } from "@client/lib/components/cards/ExerciseInstructionsCard";
import { ExerciseBenefits } from "./ExerciseBenefits";
import { difficultyConfig } from "@client/lib/utils/difficulty";
import { ExerciseConfigureAssignment } from "./ExerciseConfigureAssignment";
import { useAssignExercise } from "@client/lib/hooks/exercise/useAssignExercise";

// type CreatorInfo = {
//   name: string;
//   role: string;
//   isVerified: boolean;
// };

type TExercisePageProps = {
  exercise?: Exercise;
};

export const ExercisePage = (props: TExercisePageProps) => {
  const { exercise } = props;

  const {
    form,
    assignmentStep,
    handleAssign,
    handleBack,
    getStepNumber,
    getButtonText,
  } = useAssignExercise({
    exercise,
  });

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

  const renderExerciseVideoCard = (
    <Card>
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
    </Card>
  );

  const renderExerciseDescription = (
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
                  bgcolor: difficultyConfig[exercise?.difficulty].bgcolor,
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
            <Typography fontWeight={500}>{exercise?.targetArea}</Typography>
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
            <Typography fontWeight={500}>{exercise?.duration}</Typography>
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
            <Typography fontWeight={500}>{exercise?.equipment}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderExerciseBenefits = <ExerciseBenefits exercise={exercise} />;

  const renderExerciseInstructions = (
    <ExerciseInstructionsCard exercise={exercise} />
  );

  const renderCreatorInfo = (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Creator Information
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
  );

  const renderVerfificationInfoCard = <VerificationInfoCard />;

  const renderExerciseVariation = (
    <form.AppField name="variation">
      {(field) => (
        <field.TsfExercisePageVariation label="Step 1: Select Exercise Variation" />
      )}
    </form.AppField>
  );

  const renderExericseConfigureAssignment =
    assignmentStep === "configure" || assignmentStep === "patients" ? (
      <ExerciseConfigureAssignment form={form} exercise={exercise} />
    ) : null;

  const renderExercisePatientsSelect =
    assignmentStep === "patients" ? (
      <ExercisePatientSelect form={form} />
    ) : null;

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
            {renderExerciseVideoCard}
            {/* Description */}
            {renderExerciseDescription}
            {/* Benefits */}
            {renderExerciseBenefits}
            {/* Instructions */}
            {renderExerciseInstructions}
          </Stack>

          {/* Right Column - Assignment Section */}
          <Stack spacing={3}>
            {/* Creator Info */}
            {renderCreatorInfo}
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
                {renderExerciseVariation}

                {/* Step 2: Configure Assignment */}
                {renderExericseConfigureAssignment}

                {/* Step 3: Select Patients */}
                {renderExercisePatientsSelect}

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
                <form.Subscribe
                  selector={(state) => ({
                    errors: state.errors,
                    isValid: state.isValid,
                    isTouched: state.isTouched,
                  })}
                >
                  {({ errors, isValid, isTouched }) => (
                    <>
                      {isTouched &&
                        !isValid &&
                        errors.length > 0 &&
                        errors.map((error, index) => (
                          <Alert key={index} severity="error" sx={{ mt: 2 }}>
                            {error?.toString()}
                          </Alert>
                        ))}
                    </>
                  )}
                </form.Subscribe>
              </CardContent>
            </Card>

            {/* Variations Info Card */}
            {renderVerfificationInfoCard}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
