import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#FFF4F4",
      paper: "#3D5AFE",
    },
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#FFFF00",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
