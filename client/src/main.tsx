import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import theme from "./theme/appTheme.ts";
import theme from "./theme/appThemeSub.ts";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./utils/query/query.ts";
import ErrorBoundary from "./components/error/error-boundary.tsx";
import { LoadingPage } from "./lib/components/loading/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <QueryClientProvider queryClient={queryClient}> */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <App />
        </Suspense>
      </ErrorBoundary>
      {/* </QueryClientProvider> */}
    </ThemeProvider>
  </StrictMode>
);
