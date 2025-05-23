import { Box } from "@mui/material";
import { lazy } from "react";

const drawerWidth = 200;

const LayoutLeftPanel = lazy(() => import("./LayoutLeftPanel"));
const LayoutTopBar = lazy(() => import("./LayoutTopBar"));

export const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Left Panel */}
      <LayoutLeftPanel />

      {/* Main content area with TopBar and children */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Top Bar */}
        <LayoutTopBar />

        {/* Main content */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
