"use client";
import { Roboto } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: {
      default: "#FFF4F4",
      //   paper: "blue",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
