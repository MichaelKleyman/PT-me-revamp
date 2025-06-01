import { useCreatePatient } from "@client/lib/api/query";
import { useAppStore } from "@client/store";
import {
  useSelectLoggedInUser,
  useSelectPractice,
} from "@client/store/selectors";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export const DashboardContent = () => {
  const loggedInUser = useAppStore(useSelectLoggedInUser);
  const practice = useAppStore(useSelectPractice);

  // const { mutateAsync: createPatient } = useCreatePatient();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {practice?.practiceName} Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" gutterBottom>
                Total Patients
              </Typography>
              <Tooltip title="Create Patient">
                <span>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
            <Typography variant="h3">0</Typography>
          </Paper>
        </Grid>

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
