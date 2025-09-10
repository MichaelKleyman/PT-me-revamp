import { Patient } from "@client/lib/types/auth";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

type TPatientQuickInformationProps = {
  patient?: Patient;
};

export const PatientQuickInformation = (
  props: TPatientQuickInformationProps
) => {
  const { patient } = props;

  const renderHeader = (
    <CardHeader
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <Person2OutlinedIcon fontSize="small" />
          <Typography variant="subtitle1" fontWeight="bold">
            Patient Information
          </Typography>
        </Stack>
      }
    />
  );

  const renderContactInfo = (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Contact Details
      </Typography>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CallOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="body2">646-409-9334</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="body2">{patient?.email}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Box sx={{ mt: 0.125 }}>
            <LocationOnOutlinedIcon color="primary" fontSize="small" />
          </Box>
          <Typography variant="body2">{patient?.address}</Typography>
        </Stack>
      </Stack>
    </Box>
  );

  const renderEmergencyContactInfo = (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <GroupOutlinedIcon fontSize="small" />
        <Typography variant="subtitle1" fontWeight="bold">
          Emergency Contact
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="body2" fontWeight="medium">
          {/* {patient.emergencyContact.name} */} John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* {patient.emergencyContact.relationship} */} Brother
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <CallOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="body2">
            {/* {patient.emergencyContact.phone}  */} 646-409-9334
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );

  const renderInssuranceInfo = (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <VerifiedOutlinedIcon fontSize="small" />
        <Typography variant="subtitle1" fontWeight="bold">
          Insurance Details
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="body2" fontWeight="bold">
          {/* {patient.insurance.provider} */} United Healthcare
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Policy: {patient.insurance.policyNumber} */} Policy: 123456
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Group: {patient.insurance.groupNumber} */} Group: 654321
        </Typography>
      </Stack>
    </Box>
  );

  return (
    <Card sx={{ boxShadow: 3 }}>
      {renderHeader}
      <CardContent>
        <Stack spacing={3}>
          {renderContactInfo}
          <Divider />
          {renderEmergencyContactInfo}
          <Divider />
          {renderInssuranceInfo}
        </Stack>
      </CardContent>
    </Card>
  );
};
