import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32", // A deep green color
      light: "#54E3B1", // A lighter green
      dark: "#1b5e20", // A darker green
    },
    secondary: {
      main: "#81c784",
    },
    background: {
      default: "#f5f5f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e3a1e",
      secondary: "#4a5a4a",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: "#1e3a1e",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
