import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

type TPatientTreatmentHistoryProps = { patientId: number };

// Mock treatment data
const mockTreatments = [
  {
    id: "1",
    date: "2024-12-10",
    time: "10:00 AM",
    type: "Physical Therapy Session",
    therapist: "Dr. Smith",
    status: "Completed",
    notes:
      "Good progress on range of motion exercises. Patient reports reduced pain.",
  },
  {
    id: "2",
    date: "2024-12-05",
    time: "2:00 PM",
    type: "Initial Assessment",
    therapist: "Dr. Johnson",
    status: "Completed",
    notes: "Comprehensive evaluation completed. Treatment plan established.",
  },
  {
    id: "3",
    date: "2024-12-15",
    time: "10:00 AM",
    type: "Follow-up Session",
    therapist: "Dr. Smith",
    status: "Scheduled",
    notes: "Continue strengthening exercises and mobility work.",
  },
];

export const PatientTreatmentHistory = (
  props: TPatientTreatmentHistoryProps
) => {
  const { patientId } = props;

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <HistoryOutlinedIcon fontSize="small" />
          <Typography variant="subtitle1" fontWeight="bold">
            Treatment History
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {mockTreatments.map((treatment) => (
            <Paper key={treatment.id} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {treatment.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    with {treatment.therapist}
                  </Typography>
                </Box>
                <Chip
                  label={treatment.status}
                  variant={
                    treatment.status === "Completed" ? "filled" : "outlined"
                  }
                  color={
                    treatment.status === "Completed" ? "primary" : "default"
                  }
                  size="small"
                  sx={{ borderRadius: 0.8 }}
                />
              </Stack>

              <Stack direction="row" spacing={3} sx={{ mb: 1.5 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CalendarTodayOutlinedIcon fontSize="inherit" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(treatment.date).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTimeOutlinedIcon fontSize="inherit" />
                  <Typography variant="body2" color="text.secondary">
                    {treatment.time}
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {treatment.notes}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<ArticleOutlinedIcon fontSize="inherit" />}
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "none",
                }}
              >
                View Details
              </Button>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
