import { Exercise } from "@client/lib/types/exercise";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export const ExerciseBenefits = ({ exercise }: { exercise?: Exercise }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Benefits
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 1.5,
          }}
        >
          {exercise?.benefits?.map((benefit, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              <Typography>{benefit}</Typography>
            </Stack>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
