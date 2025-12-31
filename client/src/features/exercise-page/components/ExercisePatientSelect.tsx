import { useGetAllPatients } from "@client/lib/api/practitioner/query";
import { withForm } from "@client/lib/components/form/contexts/form";
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
import { exerciseOpts } from "../utils/exerciseForm";

export const ExercisePatientSelect = withForm({
  ...exerciseOpts,
  render: function Render({ form }) {
    const [searchPatient, setSearchPatient] = useState("");

    const practice = useAppStore(useSelectPractice);
    const practiceId = String(practice?.id);

    const { data: patients } = useGetAllPatients(practiceId);

    const filteredPatients = patients?.filter((patient) => {
      const patientName = patient.firstName + patient.lastName;
      return patientName.toLowerCase().includes(searchPatient.toLowerCase());
    });

    return (
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
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <form.AppField name="patientIds">
          {(field) => {
            const selectedPatients: number[] = field.state.value || [];

            const togglePatient = (patientId: number) => {
              const newSelection = selectedPatients.includes(patientId)
                ? selectedPatients.filter((id: number) => id !== patientId)
                : [...selectedPatients, patientId];
              field.handleChange(newSelection);
            };

            return (
              <>
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
                      onClick={() => togglePatient(patient.id)}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Checkbox
                          checked={selectedPatients.includes(patient.id)}
                          size="small"
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {patient.firstName + " " + patient.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
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
              </>
            );
          }}
        </form.AppField>
      </Box>
    );
  },
});
