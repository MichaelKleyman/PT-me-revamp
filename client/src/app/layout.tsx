"use client";
import { Inter } from "next/font/google";
import { Wrapper } from "./wrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/appTheme";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <AppRouterCacheProvider>
              <CssBaseline />
              <Wrapper>{children}</Wrapper>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
