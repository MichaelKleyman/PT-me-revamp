import { withForm } from "@client/lib/components/form/contexts/form";
import { Exercise } from "@client/lib/types/exercise";
import { Info } from "@mui/icons-material";
import { Alert, Box, Stack, Typography, Divider } from "@mui/material";
import { exerciseOpts } from "../utils/exerciseForm";

export const ExerciseConfigureAssignment = withForm({
  ...exerciseOpts,
  props: {} as { exercise?: Exercise },
  render: function Render({ form, exercise }) {
    return (
      <Box sx={{ mb: 3 }}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle2" gutterBottom>
          Step 2: Configure Assignment
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <form.AppField name="duration">
            {(field) => (
              <field.TsfSelectField
                label="Duration"
                defaultSelect={exercise?.duration}
                defaultOptions={[
                  "Short (1-2 min)",
                  "Standard (2-4 min)",
                  "Extended (5-10 min)",
                ]}
              />
            )}
          </form.AppField>
          <form.AppField name="frequency">
            {(field) => (
              <field.TsfSelectField
                label="Frequency"
                defaultOptions={[
                  "Daily",
                  "5x weekly",
                  "3x weekly",
                  "2x weekly",
                  "Weekly",
                ]}
              />
            )}
          </form.AppField>
          <form.Subscribe
            selector={(state) => ({
              duration: state.values.duration,
              frequency: state.values.frequency,
            })}
          >
            {({ duration, frequency }) => (
              <Alert icon={<Info />} severity="info">
                <Typography variant="caption">
                  <strong>Assignment Preview:</strong> Patients will perform{" "}
                  <strong>{exercise?.name}</strong> (
                  {duration === "default" ? exercise?.duration : duration}){" "}
                  <strong>{frequency}</strong>
                </Typography>
              </Alert>
            )}
          </form.Subscribe>
        </Stack>
      </Box>
    );
  },
});
