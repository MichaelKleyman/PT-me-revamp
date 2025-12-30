import { Card, CardContent, Stack, Typography } from "@mui/material";

export const VerificationInfoCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          About Variations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Variations allow you to customize exercise difficulty for different
          patient needs and recovery stages.
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            • <strong>Beginner</strong> - For initial recovery phase
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • <strong>Standard</strong> - For general patient population
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • <strong>Advanced</strong> - For experienced, strong patients
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
