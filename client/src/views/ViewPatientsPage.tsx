import { useGetAllPatients } from "@client/lib/api/practitioner/query";
import { useAppStore } from "@client/store";
import { useSelectPractice } from "@client/store/selectors";
import Box from "@mui/material/Box";
import { PatientsTable } from "@client/features/patients-table/exports";

export const ViewPatientsPage = () => {
  const practice = useAppStore(useSelectPractice);
  const practiceId = String(practice?.id);

  const { data: patients } = useGetAllPatients(practiceId);

  const renderPatientsTable = <PatientsTable patients={patients} />;

  return <Box sx={{ width: "100%" }}>{renderPatientsTable}</Box>;
};
