import { TAuthLoginForm } from "@client/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const defaultValues: TAuthLoginForm = {
  email: "",
  practitionerName: "",
};

export const useHandleAuthLogin = (
  isLoggingIn: boolean,
  handleError: (val: boolean) => void
) => {
  const resolver = zodResolver(loginSchema);

  const form = useForm<TAuthLoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
    resolver,
  });

  useEffect(() => {
    if (!isLoggingIn) return;
  }, [isLoggingIn]);

  const handleLogin = async () => {
    const { email, practitionerName } = form.getValues();
    // if (!form.formState.isValid) {
    //   handleError(true);
    //   return;
    // }
    window.location.href = `/api/login/${email}`;
  };

  return {
    handleLogin,
    loginForm: form,
  };
};

const loginSchema = z.object({
  email: z.string().email().min(1, "Email address field is required"),
  practitionerName: z.string().min(1, "Practitioner name field is required"),
}) satisfies z.ZodType<TAuthLoginForm>;
