import {
  Box,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useFieldContext } from "../contexts/formContext";

const mockVariations = [
  {
    id: "var-1",
    name: "Beginner",
    description: "Modified version with reduced range of motion",
  },
  {
    id: "var-2",
    name: "Standard",
    description: "Standard difficulty exercise",
  },
  {
    id: "var-3",
    name: "Advanced",
    description: "Advanced version with increased intensity",
  },
];

type TsfExercisePageVariationProps = {
  label: string;
};

export const TsfExercisePageVariation = (
  props: TsfExercisePageVariationProps
) => {
  const { label } = props;

  const field = useFieldContext<string>();
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <RadioGroup
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        <Stack spacing={1}>
          {mockVariations.map((variation) => (
            <Paper
              key={variation.id}
              variant="outlined"
              sx={{
                p: 2,
                cursor: "pointer",
                borderColor: hasError
                  ? "error.main"
                  : field.state.value === variation.id
                    ? "primary.main"
                    : "divider",
                bgcolor:
                  field.state.value === variation.id
                    ? "primary.50"
                    : "transparent",
                "&:hover": {
                  borderColor: hasError ? "error.light" : "primary.light",
                },
              }}
              onClick={() => field.handleChange(variation.id)}
            >
              <FormControlLabel
                value={variation.id}
                control={
                  <Radio
                    size="small"
                    checked={field.state.value === variation.id}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight={500}>{variation.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {variation.description}
                    </Typography>
                  </Box>
                }
                sx={{ m: 0, alignItems: "flex-start" }}
              />
            </Paper>
          ))}
        </Stack>
      </RadioGroup>
      {hasError && (
        <FormHelperText error sx={{ mt: 1 }}>
          {field.state.meta.errors.join(", ")}
        </FormHelperText>
      )}
    </Box>
  );
};
