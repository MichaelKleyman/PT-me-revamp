import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

export const ExercisePageVariation = () => {
  const [selectedVariation, setSelectedVariation] = useState<string>(
    mockVariations[0]?.id || ""
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Step 1: Select Exercise Variation
      </Typography>
      <RadioGroup
        value={selectedVariation}
        onChange={(e) => setSelectedVariation(e.target.value)}
      >
        <Stack spacing={1}>
          {mockVariations.map((variation) => (
            <Paper
              key={variation.id}
              variant="outlined"
              sx={{
                p: 2,
                cursor: "pointer",
                borderColor:
                  selectedVariation === variation.id
                    ? "primary.main"
                    : "divider",
                bgcolor:
                  selectedVariation === variation.id
                    ? "primary.50"
                    : "transparent",
                "&:hover": {
                  borderColor: "primary.light",
                },
              }}
              //   onClick={() => setSelectedVariation(variation.id)}
            >
              <FormControlLabel
                value={variation.id}
                control={<Radio size="small" />}
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
    </Box>
  );
};
