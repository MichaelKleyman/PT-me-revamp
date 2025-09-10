import { useGetPatient } from "@client/lib/api/practitioner/query";
import { Link, useParams } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid2, Tooltip } from "@mui/material";
import { PatientPageHeader } from "./PatientPageHeader";
import { PatientQuickInformation } from "./PatientQuickInformation";
import { PatientTreatmentHistory } from "./PatientTreatmentHistory";

export const PatientPage = () => {
  const params = useParams({
    from: "/_authenticated/practice/patients/$patientId",
  });
  const patientId = params.patientId;

  const { data: patient } = useGetPatient(patientId);

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

  return (
    <Box>
      {renderGoBack}
      {renderPatientHeader}
      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={{ xs: 12, sm: 4 }}>{renderPatientQuickInfo}</Grid2>
        <Grid2 size={{ xs: 12, sm: 8 }}>{renderPatientTreatmentHistory}</Grid2>
      </Grid2>
    </Box>
  );
};
