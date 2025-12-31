import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./formContext";
import { TsfTextfield } from "../components/TsfTextfield";
import { TsfExercisePageVariation } from "../components/TsfExercisePageVariation";
import { TsfSelectField } from "../components/TsfSelectField";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TsfTextfield,
    TsfExercisePageVariation,
    TsfSelectField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
