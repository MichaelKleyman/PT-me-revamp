import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TAuthRegisterForm } from "../../types/auth";
import { useEffect } from "react";

type TProps = {
  isRegistering: boolean;
  handleError: (val: boolean) => void;
};

const defaultValues: TAuthRegisterForm = {
  email: "",
  practiceName: "",
  address: "",
  practitionerName: "",
  licenseNumber: null,
};

export const useHandleAuthRegister = (props: TProps) => {
  const { isRegistering, handleError } = props;
  const resolver = zodResolver(registerSchema);

  const form = useForm<TAuthRegisterForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
    resolver,
  });

  useEffect(() => {
    if (!isRegistering) return;
  }, [isRegistering]);

  const handleRegister = async () => {
    const { email, practiceName } = form.getValues();
    if (!form.formState.isValid) {
      handleError(true);
      return;
    }
    console.log({ email, practiceName });
  };

  const validateStep = async (currentStep: number) => {
    if (currentStep === 1) {
      // Trigger validation for just the step 1 fields
      const isValid = await form.trigger(["email", "practiceName", "address"]);
      return isValid;
    }
  };

  return {
    handleRegister,
    validateStep,
    registerForm: form,
  };
};

const registerSchema = z.object({
  email: z.string().email().min(1, "Email address field is required"),
  practiceName: z.string().min(1, "Practice name field is required"),
  address: z
    .string()
    .min(5, "Address is too short")
    .max(255, "Address is too long")
    .refine((address) => address.trim().length > 0, "Address cannot be empty"),
  practitionerName: z.string().min(1, "Practitioner name field is required"),
  licenseNumber: z
    .string()
    .min(4)
    .max(15)
    .regex(
      /^[a-zA-Z0-9\.\-]*$/,
      "License must contain only letters, numbers, periods, or hyphens"
    )
    .refine(
      (val) => {
        // At least one digit in the license number
        return /\d/.test(val);
      },
      {
        message: "License number must contain at least one digit",
      }
    ),
}) satisfies z.ZodType<TAuthRegisterForm>;
