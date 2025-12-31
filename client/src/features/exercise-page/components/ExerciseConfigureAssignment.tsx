import { withForm } from "@client/lib/components/form/contexts/form";
import { Exercise } from "@client/lib/types/exercise";
import { Info } from "@mui/icons-material";
import { Alert, Box, Stack, Typography, Divider, Paper } from "@mui/material";
import { exerciseOpts } from "../utils/exerciseForm";

export const ExerciseConfigureAssignment = withForm({
  ...exerciseOpts,
  props: {} as { exercise?: Exercise },
  render: function Render({ form, exercise }) {
    const renderDuration = (
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
    );

    const renderFrequency = (
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
    );

    const renderSummary = (
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
    );

    const renderDosage = (
      <Paper variant="outlined" sx={{ p: 2, bgcolor: "action.hover" }}>
        <Typography
          variant="caption"
          fontWeight={500}
          sx={{ mb: 2, display: "block" }}
        >
          Exercise Dosage
        </Typography>

        <Stack direction="row" spacing={2}>
          <form.AppField name="dosage.sets">
            {(field) => (
              <field.TsfTextfield label="Sets" size="small" type="number" />
            )}
          </form.AppField>
          <form.AppField name="dosage.reps">
            {(field) => (
              <field.TsfTextfield label="Reps" size="small" type="number" />
            )}
          </form.AppField>
        </Stack>

        <form.Subscribe
          selector={(state) => ({
            sets: state.values.dosage.sets,
            reps: state.values.dosage.reps,
          })}
        >
          {({ sets, reps }) => (
            <Box
              sx={{
                mt: 2,
                px: 1.5,
                py: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <strong>Dosage:</strong> {sets} set{sets !== 1 ? "s" : ""} ×{" "}
                {reps} rep{reps !== 1 ? "s" : ""}
              </Typography>
            </Box>
          )}
        </form.Subscribe>
      </Paper>
    );

    return (
      <Box sx={{ mb: 3 }}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle2" gutterBottom>
          Step 2: Configure Assignment
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {renderDuration}
          {renderDosage}
          {renderFrequency}
          {renderSummary}
        </Stack>
      </Box>
    );
  },
});
