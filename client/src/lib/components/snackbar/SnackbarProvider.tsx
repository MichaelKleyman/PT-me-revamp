import { initSnackBridge } from "@client/lib/utils/snackbar";
import { SnackbarProvider } from "notistack";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const SnackBridgeInitializer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    // Set the functions to be used outside of hooks
    // This allows us to call pushSnack from anywhere in the app
    // without needing to be inside a component that uses useSnackbar
    initSnackBridge(enqueueSnackbar, closeSnackbar);

    return () => {
      // Clear the functions when the component unmounts
      initSnackBridge(null, null);
    };
  }, [enqueueSnackbar, closeSnackbar]);

  return null;
};

export const SnackProvider = ({ children }: { children: React.ReactNode }) => (
  <SnackbarProvider
    maxSnack={10}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  >
    <SnackBridgeInitializer />
    {children}
  </SnackbarProvider>
);
