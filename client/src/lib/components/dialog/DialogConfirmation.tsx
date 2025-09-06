import { ReactNode } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";

export interface DialogConfirmationProps extends Omit<DialogProps, "onClose"> {
  title: string;
  body?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function DialogConfirmation(props: DialogConfirmationProps) {
  const {
    title,
    body,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    ...otherProps
  } = props;

  const bodyContent = body ? (
    <DialogContent>
      <DialogContentText component="div">{body}</DialogContentText>
    </DialogContent>
  ) : null;

  return (
    <Dialog onClose={onCancel} {...otherProps}>
      <DialogTitle>{title}</DialogTitle>
      {bodyContent}
      <DialogActions>
        {onCancel ? (
          <Button color="inherit" onClick={onCancel}>
            {cancelText ?? "Cancel"}
          </Button>
        ) : null}
        <Button autoFocus onClick={onConfirm}>
          {confirmText ?? "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
