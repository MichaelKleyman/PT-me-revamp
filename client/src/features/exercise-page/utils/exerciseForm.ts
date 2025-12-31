import { formOptions } from "@tanstack/react-form";
import { type } from "arktype";

export const ExerciseForm = type({
  variation: "string",
  duration: "string",
  frequency: "string",
  patientIds: "string[]",
});

type ExerciseAssignmentFormData = typeof ExerciseForm.infer;

export const exerciseDefaultValues: ExerciseAssignmentFormData = {
  variation: "var-1",
  duration: "default",
  frequency: "3x weekly",
  patientIds: [],
};

export const exerciseOpts = formOptions({
  defaultValues: exerciseDefaultValues,
  validators: {
    onChange: ExerciseForm,
    onSubmit: ({ value }) => {
      const errors: string[] = [];

      if (!value.variation) {
        errors.push("Please select a variation");
      }
      if (!value.patientIds || value.patientIds.length === 0) {
        errors.push("Please select at least one patient");
      }

      return errors.length > 0 ? errors.join(", ") : undefined;
    },
  },
});
