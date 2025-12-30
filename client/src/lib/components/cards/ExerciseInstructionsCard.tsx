import { Exercise } from "@client/lib/types/exercise";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

export const ExerciseInstructionsCard = ({
  exercise,
}: {
  exercise?: Exercise;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Step-by-Step Instructions
        </Typography>
        <Stack spacing={2}>
          {exercise?.instructions.map((instruction, index) => (
            <Stack key={index} direction="row" spacing={2}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: "primary.main",
                  fontSize: 14,
                }}
              >
                {index + 1}
              </Avatar>
              <Typography sx={{ pt: 0.25 }}>{instruction}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
