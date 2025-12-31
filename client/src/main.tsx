import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import theme from "./theme/appTheme.ts";
import theme from "./theme/appThemeSub.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./lib/components/error/error-boundary.tsx";
import { LoadingPage } from "./lib/components/loading/LoadingPage.tsx";
import { queryClient } from "./lib/api/practitioner/query.ts";
import { SnackProvider } from "./lib/components/snackbar/SnackbarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <SnackProvider>
              <App />
            </SnackProvider>
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
