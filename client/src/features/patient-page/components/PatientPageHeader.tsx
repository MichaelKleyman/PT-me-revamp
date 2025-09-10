import { UserBadge } from "@client/lib/components/user-badge/UserBadge";
import { Patient } from "@client/lib/types/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

type TPatientPageHeaderProps = {
  patient?: Patient;
};

export const PatientPageHeader = (props: TPatientPageHeaderProps) => {
  const { patient } = props;

  const renderProfileSection = (
    <Stack direction="row" spacing={2} alignItems="center">
      <UserBadge username={`${patient?.firstName} ${patient?.lastName}`} />
      <Box
        sx={{
          minWidth: "fit-content",
          flexShrink: 0, // Prevents the stack from shrinking
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {patient?.firstName} {patient?.lastName}
        </Typography>
        <Typography variant="body2">Age: 23</Typography>
        <Chip
          label={"Lower Back Pain"}
          variant="outlined"
          size="small"
          color="primary"
          sx={{ mt: 1, backgroundColor: "background.paperSecondary" }}
        />
      </Box>
    </Stack>
  );

  const renderPatientQuickInfo = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CallOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="body2">646-409-9334</Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="body2">{patient?.email}</Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="body2">
              Started: {new Date().toLocaleDateString()}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="body2">Next: 10/10/2025</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );

  const renderActionButtons = (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        minWidth: "fit-content",
        flexShrink: 0, // Prevents the stack from shrinking
      }}
    >
      <Button variant="outlined" size="small">
        Schedule
      </Button>
      <Button variant="contained" size="small">
        Update Plan
      </Button>
    </Stack>
  );

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          gap={2}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          {renderProfileSection}
          {renderPatientQuickInfo}
          {renderActionButtons}
        </Stack>
      </CardContent>
    </Card>
  );
};
