import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TAuthRegisterForm, TUserType } from "../../types/auth";
import { useEffect } from "react";
import { registerUser } from "@client/lib/api/fetch";

type TProps = {
  isRegistering: boolean;
  handleError: (val: boolean) => void;
  userType?: TUserType["userType"];
};

const defaultValues: TAuthRegisterForm = {
  email: "",
  practiceName: "",
  address: "",
  practitionerName: "",
  licenseNumber: null,
  userType: undefined,
};

export const useHandleAuthRegister = (props: TProps) => {
  const {
    isRegistering,
    //  handleError,
    userType,
  } = props;

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
    const userData = form.getValues();
    // if (!form.formState.isValid) {
    //   handleError(true);
    //   return;
    // }

    await registerUser({ ...userData, userType });
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
  userType: z.enum(["patient", "practitioner"]),
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
      /^[a-zA-Z0-9\\.\\-]*$/,
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
