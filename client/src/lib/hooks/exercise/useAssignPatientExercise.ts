import {
  exerciseDefaultValues,
  exerciseOpts,
} from "@client/features/exercise-page/utils/exerciseForm";
import { useAppForm } from "@client/lib/components/form/contexts/form";
import { AssignmentStep, Exercise } from "@client/lib/types/exercise";
import { useState } from "react";
import { useAssignExercise } from "@client/lib/api/practitioner/query";
import {
  getPromiseMessages,
  wrapPromiseWithSnack,
} from "@client/lib/utils/wrapPromiseWithSnack";

type TAssignExerciseProps = {
  exercise?: Exercise;
};

export const useAssignPatientExercise = (props: TAssignExerciseProps) => {
  const { exercise } = props;

  const [assignmentStep, setAssignmentStep] =
    useState<AssignmentStep>("select");

  const { mutateAsync: assignExercise } = useAssignExercise();

  const form = useAppForm({
    ...exerciseOpts,
    defaultValues: exerciseDefaultValues,
    onSubmit: async ({ value }) => {
      if (!exercise?.id) return;

      const callback = () =>
        assignExercise({ data: value, exerciseId: exercise?.id });

      const { error } = await wrapPromiseWithSnack({
        callback,
        messages: getPromiseMessages("Exercise", "Assigned"),
      });

      if (error) return;

      setAssignmentStep("select");
    },
  });

  const handleAssign = async () => {
    if (assignmentStep === "select") {
      setAssignmentStep("configure");
    } else if (assignmentStep === "configure") {
      setAssignmentStep("patients");
    } else {
      await form.handleSubmit();
    }
  };

  const handleBack = () => {
    if (assignmentStep === "configure") {
      setAssignmentStep("select");
    } else if (assignmentStep === "patients") {
      setAssignmentStep("configure");
    }
  };

  const getStepNumber = () => {
    switch (assignmentStep) {
      case "select":
        return "1 of 3";
      case "configure":
        return "2 of 3";
      case "patients":
        return "3 of 3";
    }
  };

  const getButtonText = () => {
    switch (assignmentStep) {
      case "select":
        return "Select Variation";
      case "configure":
        return "Configure";
      case "patients":
        return "Assign Exercise";
    }
  };

  return {
    form,
    assignmentStep,
    handleAssign,
    handleBack,
    getStepNumber,
    getButtonText,
  };
};
