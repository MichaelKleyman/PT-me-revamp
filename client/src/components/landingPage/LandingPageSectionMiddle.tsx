import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const LandingPageSectionMiddle = () => {
  return (
    <Stack
      height='200px'
      width='800px'
      zIndex={2}
      alignItems='center'
      justifyContent='center'
      sx={{
        background: "white",
        borderRadius: "30px",
        position: "relative",
        marginTop: "-100px",
        marginBottom: "-100px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography fontWeight='bold' fontSize='18px'>
        Lorem ipsum dolor sit amet, consectetur adipiscing
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing
      </Typography>
    </Stack>
  );
};
