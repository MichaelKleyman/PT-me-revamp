import { PracticePatientsCard } from "@client/components/practice/PracticePatientsCard";
import { useAppStore } from "@client/store";
import { useSelectPractice } from "@client/store/selectors";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const ViewDashboardPage = () => {
  const practice = useAppStore(useSelectPractice);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {practice?.practiceName} Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <PracticePatientsCard />

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Appointments Today
            </Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Pending Tasks
            </Typography>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activity to display
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
