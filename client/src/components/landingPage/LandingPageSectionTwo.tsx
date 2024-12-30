import { Stack, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const LandingPageSectionTwo = () => {
  return (
    <Stack
      alignItems='center'
      mt={20}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Typography color='black' fontSize='30px' fontWeight='200px'>
        Services
      </Typography>
      <Grid container spacing={4} mt={4} px={4}>
        <StyledGridItem size={3}>
          <Typography fontWeight='bold'>Exercise Database</Typography>
          <Typography sx={{ marginTop: 3 }}>
            Physical therapy practice accounts are provided with a vast library
            of exercises and treatment resources. Comes with easy access to a
            wide range of exercises, consisting of tips, description, and muscle
            specification. This database allows therapists to create customized
            exercise plans tailored to each patients needs, making it a
            versatile resource for individualized care.
          </Typography>
        </StyledGridItem>
        <StyledGridItem size={3}>
          <Typography fontWeight='bold'>Instant Search</Typography>
          <Typography sx={{ marginTop: 3 }}>
            Find a patients flowsheet in seconds and make appointments seamless.
            Search for a patients name and save time on digging through files.
            Exercises are categorized by injury type and muscle type, making
            exercise assignment simple.
          </Typography>
        </StyledGridItem>
        <StyledGridItem size={3}>
          <Typography fontWeight='bold'>Clinic Portal</Typography>
          <Typography sx={{ marginTop: 3 }}>
            Gain access to relevant insights of your practice such as common
            injuries your patients have, and appointment history based on data
            overtime.
          </Typography>
        </StyledGridItem>
        <StyledGridItem size={3}>
          <Typography fontWeight='bold'>Appointment Tracking</Typography>
          <Typography sx={{ marginTop: 3 }}>
            Schedule and track appointments with our extensive calendar
            functionality, and set recurring appointments with one click. Track
            these appointments and send reminders to patients via email through
            your portal.
          </Typography>
        </StyledGridItem>
      </Grid>
    </Stack>
  );
};

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  background: "white",
  borderRadius: "30px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));
