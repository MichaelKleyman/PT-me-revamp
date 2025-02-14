import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LandingImage from "../../assets/doctor-patient.jpg";
import { styled, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { FloatingPaths } from "../../lib/components/animations/AnimationsFloatingPaths";

export const LandingPageSectionOne = () => {
  const theme = useTheme();

  return (
    <Stack
      alignItems='center'
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #002419 0%, #004731 25%, #005C3F 50%, #00734E 75%, #00855D 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <Stack flexDirection='row' alignItems='center' mt={30} width='55%'>
        <Stack>
          <Typography fontSize='40px' lineHeight='1.2' color='white'>
            Build custom PT plans,{" "}
            <span
              style={{
                WebkitBackgroundClip: "text",
                color: theme.palette.primary.light,
              }}
            >
              streamline
            </span>{" "}
            paperwork, and access onsite tools{" "}
            <span
              style={{
                WebkitBackgroundClip: "text",
                color: theme.palette.primary.light,
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
            <StyledLink to='/auth'>
              <Typography>Get started</Typography>
              <ArrowForwardIcon />
            </StyledLink>
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

const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0.5),
  gap: theme.spacing(2),
  background: "white",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius * 7,
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
  width: "35%",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
  },
}));
