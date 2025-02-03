import { createTheme, ThemeOptions } from "@mui/material/styles";

const primaryColor = "#1e1e1e";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: `"Dancing Script", Arial, sans-serif`, // Include fallback fonts
  },
  palette: {
    mode: "dark",
    background: {
      default: "#FFF4F4",
      paper: "#3D5AFE",
    },
    text: {
      primary: "#000000",
      secondary: "linear-gradient(to right, #333, #000)",
    },
    primary: {
      main: primaryColor,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Dancing Script';
          src: url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
        }
        body {
          font-family: 'Dancing Script', Arial, sans-serif; 
        }
      `,
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: primaryColor,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: primaryColor,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
