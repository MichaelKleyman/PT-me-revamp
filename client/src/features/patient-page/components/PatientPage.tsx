import { useGetPatient } from "@client/lib/api/practitioner/query";
import { Link, useParams } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";

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

  return (
    <div>
      {renderGoBack}
      <h1>PatientPage: {patient?.firstName}</h1>
    </div>
  );
};
