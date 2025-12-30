import { useGetAllPatients } from "@client/lib/api/practitioner/query";
import { useAppStore } from "@client/store";
import { useSelectPractice } from "@client/store/selectors";
import { CheckCircle, Search } from "@mui/icons-material";
import {
  Box,
  Typography,
  Chip,
  TextField,
  Checkbox,
  Paper,
  Alert,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

type TExercisePatientSelectProps = {
  assignmentStep: "select" | "configure" | "patients";
};

export const ExercisePatientSelect = (props: TExercisePatientSelectProps) => {
  const { assignmentStep } = props;

  const [searchPatient, setSearchPatient] = useState("");
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const practice = useAppStore(useSelectPractice);
  const practiceId = String(practice?.id);

  const { data: patients } = useGetAllPatients(practiceId);

  const filteredPatients = patients?.filter((patient) => {
    const patientName = patient.firstName + patient.lastName;
    return patientName.toLowerCase().includes(searchPatient.toLowerCase());
    // ||  patient.toLowerCase().includes(searchPatient.toLowerCase())
  });

  const togglePatient = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  return (
    assignmentStep === "patients" && (
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

        <Stack spacing={1} sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
          {filteredPatients?.map((patient) => (
            <Paper
              key={patient.id}
              variant="outlined"
              sx={{
                p: 1.5,
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
              }}
              onClick={() => togglePatient(patient.id?.toString() ?? "")}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
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
                  <Typography variant="caption" color="text.secondary">
                    {/* {patient.condition} */}
                    Condition
                  </Typography>
                </Box>
                <Chip label={"Active"} variant="outlined" size="small" />
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
    )
  );
};
