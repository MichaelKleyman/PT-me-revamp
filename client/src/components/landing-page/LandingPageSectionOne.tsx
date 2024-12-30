import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LandingImage from "../../assets/doctor-patient.jpg";
import Button from "@mui/material/Button";

export const LandingPageSectionOne = () => {
  return (
    <Stack
      alignItems='center'
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #161616, #CACACA)",
      }}
    >
      <Stack flexDirection='row' alignItems='center' mt={30} width='55%'>
        <Stack>
          <Typography fontSize='40px' lineHeight='1.2' color='white'>
            Build custom PT plans,{" "}
            <span
              style={{
                color: "black",
              }}
            >
              streamline
            </span>{" "}
            paperwork, and access onsite tools{" "}
            <span
              style={{
                color: "black",
              }}
            >
              instantly
            </span>
            .
          </Typography>
          <Stack>
            <Typography mt={1} fontSize='20px' lineHeight='1.2' color='white'>
              Lets get started today!
            </Typography>
            <Button
              variant='contained'
              sx={{
                marginTop: 2,
                gap: 2,
                background: "white",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                borderRadius: "30px",
                width: "35%",
                textTransform: "none",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Get Started
              <ArrowForwardIcon />
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <img
            style={{
              height: "350px",
              width: "350px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt='Landing-image'
            src={LandingImage}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
