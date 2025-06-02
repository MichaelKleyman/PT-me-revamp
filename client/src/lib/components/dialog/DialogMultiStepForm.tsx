import { Fragment, ReactNode, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export type DialogMultiStepFormProps = {
  title?: string;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  renderError?: ReactNode;
  renderTopComponent?: JSX.Element | null;
  disableSubmit?: boolean;
  steps: {
    label: string;
    render: ReactNode;
    requiredFields?: string[];
    onValidate?: () => Promise<boolean> | boolean;
    onNext?: () => Promise<void> | void;
    onPrev?: () => Promise<void> | void;
  }[];
} & DialogProps;

export const DialogMultiStepForm = ({
  open,
  title,
  steps,
  onClose,
  onSubmit,
  renderError,
  renderTopComponent,
  disableSubmit,
  ...restProps
}: DialogMultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = steps.length - 1;
  const { onPrev, onNext, onValidate, render } = steps?.[currentStep] ?? {};

  const prev = () => {
    setCurrentStep((step) => {
      if (step <= 0) return 0;

      return step - 1;
    });
  };

  const next = () => {
    setCurrentStep((step) => {
      if (step >= totalSteps) return totalSteps;

      return step + 1;
    });
  };

  const handleValidate = () => (onValidate ? onValidate() : true);

  const handlePrev = () => onPrev?.() ?? prev();

  const handleNext = async () => {
    const isValid = await handleValidate();
    if (!isValid) return;

    if (onNext) await onNext();

    next();
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(0);
  };

  const handleSubmit = async () => {
    const isValid = await handleValidate();
    if (!isValid) return;

    await onSubmit();
    setCurrentStep(0);
  };

  const renderStepper = (
    <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
      {steps.map(({ label }) => (
        <Step key={`step-${label}`}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  const renderCancel = <Button onClick={handleClose}>Cancel</Button>;

  const renderPrevious = currentStep > 0 && (
    <Button variant="outlined" onClick={handlePrev}>
      Previous
    </Button>
  );

  const renderNext =
    currentStep < totalSteps ? (
      <Button variant="outlined" onClick={handleNext}>
        Next
      </Button>
    ) : (
      <Button
        variant="outlined"
        onClick={handleSubmit}
        disabled={disableSubmit}
      >
        Submit
      </Button>
    );

  return (
    <Dialog open={open} {...restProps}>
      {title && (
        <DialogTitle component="div">
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ my: 2 }} />
        </DialogTitle>
      )}
      <DialogContent>
        {renderTopComponent}
        {renderStepper}
        <Fragment key={`step-${currentStep}`}>{render}</Fragment>
        {renderError}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", p: [2, 3] }}>
        {renderCancel}
        <Stack direction="row" columnGap={2}>
          {renderPrevious}
          {renderNext}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
