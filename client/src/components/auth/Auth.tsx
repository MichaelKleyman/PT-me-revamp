import Grid from "@mui/material/Grid2";
import authImage from "../../assets/dashboard.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@tanstack/react-router";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { AuthForm } from "./AuthForm";

export const Auth = () => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ height: "100vh" }}
    >
      {/* Left side - Image */}
      <Grid
        sx={{
          display: { xs: "none", md: "flex" }, // Hide on small screens
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "50%" }, // Full width on small screens, 50% otherwise
          background: "linear-gradient(135deg, #161616, #CACACA)",
        }}
      >
        <StyledLink to='/'>
          <ArrowBackIcon />
          <Typography>Back</Typography>
        </StyledLink>

        <img
          alt='auth-image'
          src={authImage}
          style={{
            height: "100%",
            maxHeight: "600px",
            width: "100%",
            maxWidth: "550px",
            borderRadius: "10%",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
            objectFit: "cover",
          }}
        />
      </Grid>

      {/* Right side - Content */}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          width: { xs: "100%", md: "45%" },
        }}
      >
        <AuthForm />
      </Grid>
    </Grid>
  );
};

export const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  position: "absolute",
  top: "16px",
  left: "16px",
  color: "#FFFFFF",
  zIndex: 10,
  textDecoration: "none",
}));
