import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TLoginForm } from "../../types/auth";
import { authClient } from "../../auth/auth-client";

const defaultValues: TLoginForm = {
  email: "",
  password: "",
};

type TProps = {
  isLoggingIn: boolean;
  isRegistering: boolean;
};

export const useHandleAuth = (props: TProps) => {
  const { isLoggingIn, isRegistering } = props;
  const [showPassword, setShowPassword] = useState(false);

  const resolver = zodResolver(loginSchema);

  const { control, formState, getValues } = useForm<TLoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
    resolver,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const { email, password } = getValues();
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          //show loading
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          //redirect to the dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
    console.log({ data, error });
  };

  return {
    handleLogin,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    showPassword,
    control,
    formState,
  };
};

const loginSchema = z.object({
  email: z.string().email().min(1, "Email address field ie required"),
  password: z.string().min(6, "Password must be at least 4 characters"),
}) satisfies z.ZodType<TLoginForm>;
