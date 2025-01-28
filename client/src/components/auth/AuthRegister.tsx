import { Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import patientIcon from "../../assets/patient.png";
import doctorIcon from "../../assets/doctor.png";

export const AuthRegister = () => {
  const renderPatientConsumer = (
    <StyledProfileOption>
      <Stack>
        <img
          alt='patient-icon'
          src={patientIcon}
          style={{ height: "45px", width: "45px", marginTop: "8px" }}
        />
      </Stack>
      <Stack>
        <Typography variant='h6' fontWeight='bold' textAlign='start'>
          Patient / Consumer
        </Typography>
        <Typography textAlign='start'>Register as a patient...</Typography>
      </Stack>
    </StyledProfileOption>
  );

  const renderProviderOption = (
    <StyledProfileOption>
      <Stack>
        <img
          alt='patient-icon'
          src={doctorIcon}
          style={{ height: "45px", width: "45px", marginTop: "8px" }}
        />
      </Stack>
      <Stack>
        <Typography variant='h6' fontWeight='bold' textAlign='start'>
          Licensed Physical Therapist / PT Practice
        </Typography>
        <Typography textAlign='start'>
          Register as a physical therapist...
        </Typography>
      </Stack>
    </StyledProfileOption>
  );

  return (
    <>
      <Typography variant='h4' fontWeight='bold'>
        Register
      </Typography>
      <Typography variant='h6'>
        Choose the profile that best describes you
      </Typography>
      <Stack gap={2} mt={2}>
        {renderPatientConsumer}
        {renderProviderOption}
      </Stack>
    </>
  );
};

const StyledProfileOption = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "start",
  gap: theme.spacing(2),
  border: `0.5px solid ${theme.palette.grey[500]}`,
  borderRadius: "10px",
  cursor: "pointer",
  padding: theme.spacing(4),
  transition: "all 0.3s ease",
  "&:hover": {
    border: `1.5px solid black`,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
}));
