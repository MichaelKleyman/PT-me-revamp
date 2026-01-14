import {
  SnackbarContent,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, Box, IconButton, Stack, Typography } from "@mui/material";

type SnackBarProps = {
  id: SnackbarKey;
  message: SnackbarMessage;
  variant?: "default" | "info" | "warning" | "error" | "success"; // Exclude 'default' to avoid confusion with the default variant
};

const SnackBar = forwardRef<HTMLDivElement, SnackBarProps>(
  ({ id, message, variant }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleToggleExpand = useCallback(() => setExpanded((v) => !v), []);
    const handleDismiss = useCallback(
      () => closeSnackbar(id),
      [id, closeSnackbar]
    );

    useEffect(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      setIsOverflowed(content.scrollWidth > container.clientWidth);
    }, [message]);

    return (
      <SnackbarContent ref={ref} style={{ justifyContent: "flex-end" }}>
        <Stack>
          <Alert
            onClose={handleDismiss}
            severity={!variant || variant === "default" ? "info" : variant}
            variant="standard"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              maxWidth: 400,
              overflow: "hidden",
              alignItems: "center",
            }}
            action={
              <>
                {(isOverflowed || expanded) && (
                  <IconButton
                    aria-label={expanded ? "Show less" : "Show more"}
                    aria-expanded={expanded}
                    aria-controls="snackbar-extra"
                    size="small"
                    onClick={handleToggleExpand}
                    sx={{
                      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 120ms ease",
                      ml: 0.5,
                      flex: "0 0 auto",
                    }}
                  >
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  aria-label="Close"
                  size="small"
                  onClick={handleDismiss}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          >
            <Box
              ref={containerRef}
              sx={{
                maxWidth: (theme) => theme.spacing(42),
                overflow: "hidden",
                display: "flex",
                minWidth: 0,
                flex: 1,
                transition: "max-height 500ms ease",
                maxHeight: expanded ? 1000 : 24,
              }}
              title={typeof message === "string" ? message : undefined}
            >
              <Typography
                ref={contentRef}
                variant="subtitle2"
                noWrap={!expanded}
                sx={{ display: "inline-block" }}
              >
                {message}
              </Typography>
            </Box>
          </Alert>
        </Stack>
      </SnackbarContent>
    );
  }
);

export default SnackBar;
