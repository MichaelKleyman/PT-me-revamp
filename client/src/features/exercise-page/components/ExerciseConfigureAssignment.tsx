import { Exercise } from "@client/lib/types/exercise";
import { Info } from "@mui/icons-material";
import {
  Alert,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

type TExerciseConfigureAssignmentProps = {
  exercise?: Exercise;
  assignmentStep: "select" | "configure" | "patients";
};

export const ExerciseConfigureAssignment = (
  props: TExerciseConfigureAssignmentProps
) => {
  const { exercise, assignmentStep } = props;

  const [selectedDuration, setSelectedDuration] = useState<string>("default");
  const [selectedFrequency, setSelectedFrequency] =
    useState<string>("3x-weekly");

  const handleDurationChange = (event: SelectChangeEvent) => {
    setSelectedDuration(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setSelectedFrequency(event.target.value);
  };

  return (
    (assignmentStep === "configure" || assignmentStep === "patients") && (
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
              <MenuItem value="standard">Standard (2-4 min)</MenuItem>
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
              <strong>Assignment Preview:</strong> Patients will perform{" "}
              <strong>{exercise?.name}</strong> (
              {selectedDuration === "default"
                ? exercise?.duration
                : selectedDuration}
              ) <strong>{selectedFrequency}</strong>
            </Typography>
          </Alert>
        </Stack>
      </Box>
    )
  );
};
