import { OptionsObject, SnackbarKey } from "notistack";
import SnackBar from "../components/snackbar/Snackbar";

export type SnackMessage = {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  interruptId?: string;
  durationMs?: number;
};

const lastKeysByLogicalId = new Map<string, SnackbarKey>();
let seq = 0;

/** internal state wired up once from a mounted bridge component -- allows us to use it outside of a hook */
let enqueueSnackbarFn:
  | ((message: string, options?: OptionsObject) => SnackbarKey)
  | null = null;
let closeSnackbarFn: ((key?: SnackbarKey) => void) | null = null;
export const initSnackBridge = (
  enqueue: ((message: string, options?: OptionsObject) => SnackbarKey) | null,
  close: ((key?: SnackbarKey) => void) | null
) => {
  enqueueSnackbarFn = enqueue;
  closeSnackbarFn = close;
};

/** Push a snack bar message to be picked up by the UI */
export const pushSnack = (message: SnackMessage) => {
  if (!enqueueSnackbarFn) {
    console.warn("enqueueSnackbar not yet initialized");
    return;
  }

  const logicalId = message.interruptId;
  if (logicalId) {
    const prevKey = lastKeysByLogicalId.get(logicalId);
    if (prevKey !== undefined) closeSnackbarFn?.(prevKey);
  }

  // New unique key per instance to avoid timer leakage
  const newKey: SnackbarKey = logicalId
    ? `${logicalId}:${++seq}`
    : `snack:${Date.now()}:${++seq}`;

  const createdKey = enqueueSnackbarFn(message.message, {
    variant: message.severity,
    content: (key, msg) => (
      <SnackBar id={key} message={msg} variant={message.severity} />
    ),
    autoHideDuration: message.durationMs,
    key: newKey,
  });

  if (logicalId) lastKeysByLogicalId.set(logicalId, createdKey);
};
