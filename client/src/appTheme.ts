"use client";
import { Lato } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: lato.style.fontFamily,
  },
  palette: {
    background: {
      default: "#FFF4F4",
      paper: "#3D5AFE",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
