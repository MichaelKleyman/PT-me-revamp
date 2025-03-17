import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TAuthForm } from "../../types/auth";

const defaultValues: TAuthForm = {
  email: "",
  practiceName: "",
};

type TProps = {
  isLoggingIn: boolean;
  isRegistering: boolean;
};

export const useHandleAuth = (props: TProps) => {
  const { isLoggingIn, isRegistering } = props;

  const resolver = zodResolver(loginSchema);

  const { control, formState, getValues, watch } = useForm<TAuthForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
    resolver,
  });

  const handleLogin = async () => {
    if (!isLoggingIn) return;

    const { email, practiceName } = getValues();
    console.log({ email, practiceName });
  };

  const handleRegister = async () => {
    if (!isRegistering) return;

    const { email, practiceName } = getValues();
    console.log({ email, practiceName });
  };

  return {
    handleLogin,
    handleRegister,
    control,
    formState,
    watch,
  };
};

const loginSchema = z.object({
  email: z.string().email().min(1, "Email address field is required"),
  practiceName: z.string().min(1, "Practice name field is required"),
}) satisfies z.ZodType<TAuthForm>;
