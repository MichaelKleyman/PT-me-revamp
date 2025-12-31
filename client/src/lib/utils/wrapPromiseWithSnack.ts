import { XOR } from "../types/types";
import { pushSnack } from "./snackbar";
import { v4 as uuidV4 } from "uuid";

type ProcessErrorArgs = {
  error: unknown;
  interruptId?: string;
  rejectedMsg?: string;
  rejectedMs?: number;
};

export type WrapMessages = {
  /** Info message to show while the promise is executed */
  pendingMsg?: string;

  /** Success message to show when the promise is resolved */
  resolvedMsg?: string;

  /** Error message to show when the promise is rejected */
  rejectedMsg?: string;
};

type WrapPromise<T> = {
  /** A function that returns a promise */
  callback: () => Promise<T>;

  /** Info messages to show while the promise is executed */
  messages?: WrapMessages;

  /** Duration of each message */
  duration?: {
    pendingMs?: number;
    resolvedMs?: number;
    rejectedMs?: number;
  };

  /** Optional ID to allow interrupting other snack messages */
  interruptId?: string;
};

/**
 * Creates the messages for `wrapPromiseWithSnack`. Be sure to pass
 * in the capitalized entity and a past tense verb.
 *
 * Example: `getPromiseMessages("Media", "deleted")`
 */
export const getPromiseMessages = (entity: string, verb: string) => ({
  resolvedMsg: `${entity} successfully ${verb}.`,
  rejectedMsg: `${entity} could not be ${verb}.`,
  pendingMsg: `${entity} is being ${verb}...`,
});

export const processError = ({
  error,
  interruptId,
  rejectedMsg,
  rejectedMs,
}: ProcessErrorArgs) => {
  let apiError: string | undefined;

  if (error instanceof Error) {
    apiError = error.message;
  }

  if (typeof error === "string") {
    apiError = error;
  }

  const finalErrorMsg = rejectedMsg ?? apiError;

  if (finalErrorMsg) {
    pushSnack({
      interruptId,
      message: finalErrorMsg,
      severity: "error",
      durationMs: rejectedMs,
    });
  }

  return {
    error: new Error(finalErrorMsg),
  };
};

export const wrapPromiseWithSnack = async <T>({
  callback,
  messages,
  duration,
  interruptId = uuidV4(),
}: WrapPromise<T>): Promise<XOR<{ result: T }, { error: Error }>> => {
  const { pendingMsg, resolvedMsg, rejectedMsg } = messages ?? {};
  const {
    pendingMs = 4000,
    resolvedMs = 8000,
    rejectedMs = 8000,
  } = duration ?? {};

  if (pendingMsg) {
    pushSnack({
      interruptId,
      message: pendingMsg,
      severity: "info",
      durationMs: pendingMs,
    });
  }

  try {
    const result = await callback();

    if (resolvedMsg) {
      pushSnack({
        interruptId,
        message: resolvedMsg,
        severity: "success",
        durationMs: resolvedMs,
      });
    }

    return {
      result,
    };
  } catch (error) {
    return processError({ error, interruptId, rejectedMsg, rejectedMs });
  }
};
