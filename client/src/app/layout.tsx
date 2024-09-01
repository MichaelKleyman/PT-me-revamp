import { Inter } from "next/font/google";
import "./globals.css";
import { Wrapper } from "./wrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../appTheme";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider>
            <CssBaseline />
            <Wrapper>{children}</Wrapper>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
