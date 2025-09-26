import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { useGetAllPatients } from "@client/lib/api/practitioner/query";
import { useAppStore } from "@client/store";
import { useSelectPractice } from "@client/store/selectors";
import { PatientCreate } from "@client/features/patient-create/components/PatientCreate";

export const PracticePatientsCard = () => {
  const [openCreatePatient, setOpenCreatePatient] = useState(false);
  const practice = useAppStore(useSelectPractice);

  const practiceId = String(practice?.id);

  const { data: patients } = useGetAllPatients(practiceId);

  const onClickCreatePatient = useCallback(() => {
    setOpenCreatePatient((prev) => !prev);
  }, []);

  const renderCreatePatientDialog = (
    <PatientCreate
      openCreatePatient={openCreatePatient}
      onClickCreatePatient={onClickCreatePatient}
    />
  );

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 3, height: "100%" }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
            Total Patients
          </Typography>
          <Tooltip title="Create Patient">
            <span>
              <IconButton onClick={onClickCreatePatient}>
                <AddIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
        <Typography variant="h3">{patients?.length}</Typography>
      </Paper>
      {renderCreatePatientDialog}
    </Grid>
  );
};
