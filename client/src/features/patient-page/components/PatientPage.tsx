import { useGetPatient } from "@client/lib/api/practitioner/query";
import { Link, useParams } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid2, Stack, styled, Tab, Tabs, Tooltip } from "@mui/material";
import { PatientPageHeader } from "./PatientPageHeader";
import { PatientQuickInformation } from "./PatientQuickInformation";
import { PatientTreatmentHistory } from "./PatientTreatmentHistory";
import { useState } from "react";
import theme from "@client/theme/appTheme";
import { PatientExerciseHistory } from "./PatientExerciseHistory";

enum PatientPageTabs {
  PatientOverview = "Patient Overview",
  ExerciseProgram = "Exercise Program",
  ExerciseHistory = "Exercise History",
}

export const PatientPage = () => {
  const [tab, setTab] = useState<PatientPageTabs>(
    PatientPageTabs.PatientOverview
  );

  const params = useParams({
    from: "/_authenticated/practice/patients/$patientId",
  });
  const patientId = params.patientId;

  const { data: patient } = useGetPatient(patientId);

  const handleChangeTab = (tab: PatientPageTabs) => {
    console.log(tab);
    setTab(tab);
  };

  const renderGoBack = (
    <Link href="/practice/patients">
      <Tooltip title="Go Back">
        <span>
          <ArrowBackIcon color="primary" />
        </span>
      </Tooltip>
    </Link>
  );

  const renderPatientHeader = <PatientPageHeader patient={patient} />;

  const renderPatientQuickInfo = <PatientQuickInformation patient={patient} />;

  const renderPatientTreatmentHistory = (
    <PatientTreatmentHistory patientId={patient?.id} />
  );

  const renderPatientExerciseHistory = (
    <PatientExerciseHistory patient={patient} />
  );

  const renderTabs = (
    <Stack
      sx={{
        width: "100%",
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: theme.shape.borderRadius / 5,
      }}
    >
      <Tabs
        value={tab}
        variant="fullWidth"
        onChange={(_, newValue) => handleChangeTab(newValue)}
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTabs-flexContainer": {
            marginTop: 0.8,
            marginX: 0.6,
            gap: 1,
          },
        }}
      >
        <StyledTab
          value={PatientPageTabs.PatientOverview}
          label={PatientPageTabs.PatientOverview}
        />
        <StyledTab
          value={PatientPageTabs.ExerciseHistory}
          label={PatientPageTabs.ExerciseHistory}
        />
        <StyledTab
          value={PatientPageTabs.ExerciseProgram}
          label={PatientPageTabs.ExerciseProgram}
        />
      </Tabs>
    </Stack>
  );

  return (
    <Box>
      {renderGoBack}
      {renderPatientHeader}
      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={{ xs: 12, sm: 4 }}>{renderPatientQuickInfo}</Grid2>
        <Grid2 size={{ xs: 12, sm: 8 }}>
          {renderTabs}
          {tab === PatientPageTabs.PatientOverview
            ? renderPatientTreatmentHistory
            : null}
          {tab === PatientPageTabs.ExerciseHistory
            ? renderPatientExerciseHistory
            : null}
        </Grid2>
      </Grid2>
    </Box>
  );
};

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(14),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  margin: 0,
  minHeight: "auto",
  padding: "8px 16px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)`, // More prominent shadow
  },
}));
