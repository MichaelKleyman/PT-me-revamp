import { ExerciseDifficulty } from "@client/lib/types/exercise";
import { formOptions } from "@tanstack/react-form";
import { type } from "arktype";

export const ExerciseForm = type({
  variation: type.enumerated(
    ExerciseDifficulty.BEGINNER,
    ExerciseDifficulty.INTERMEDIATE,
    ExerciseDifficulty.ADVANCED
  ),
  duration: "string",
  dosage: {
    sets: "number",
    reps: "number",
  },
  frequency: "string",
  patientIds: "number[]",
});

export type ExerciseAssignmentFormData = typeof ExerciseForm.infer;

export const exerciseDefaultValues: ExerciseAssignmentFormData = {
  variation: ExerciseDifficulty.BEGINNER,
  duration: "Use Default (2-3 minutes)",
  dosage: {
    sets: 3,
    reps: 10,
  },
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
