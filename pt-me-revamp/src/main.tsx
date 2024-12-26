import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/appTheme.ts";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./utils/query/query.ts";
import ErrorBoundary from "./components/error/error-boundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <QueryClientProvider queryClient={queryClient}> */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      {/* </QueryClientProvider> */}
    </ThemeProvider>
  </StrictMode>
);
