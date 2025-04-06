import { Box, Grid, Paper, Typography } from "@mui/material";

export const DashboardContent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Practice Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant='h6' gutterBottom>
              Total Patients
            </Typography>
            <Typography variant='h3'>0</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant='h6' gutterBottom>
              Appointments Today
            </Typography>
            <Typography variant='h3'>0</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant='h6' gutterBottom>
              Pending Tasks
            </Typography>
            <Typography variant='h3'>0</Typography>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Recent Activity
            </Typography>
            <Typography color='text.secondary'>
              No recent activity to display
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
