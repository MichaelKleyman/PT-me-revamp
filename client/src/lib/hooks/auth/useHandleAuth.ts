import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TAuthForm } from "../../types/auth";
import { authClient } from "../../auth/auth-client";
import { useNavigate } from "@tanstack/react-router";

const defaultValues: TAuthForm = {
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

  const navigate = useNavigate();

  const resolver = zodResolver(loginSchema);

  const { control, formState, getValues } = useForm<TAuthForm>({
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
    if (!isLoggingIn) return;

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
          navigate({ to: "/" });
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
    console.log({ data, error });
  };

  const handleRegister = async () => {
    if (!isRegistering) return;

    const { email, password, practiceName } = getValues();
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name: practiceName ?? "",
        // callbackURL: "/dashboard", // a url to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          //show loading
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          navigate({ to: "/" });
        },
        onError: (ctx) => {
          console.log("ERROR", ctx);
          alert(ctx.error.message);
        },
      }
    );
    console.log({ data, error });
  };

  return {
    handleLogin,
    handleRegister,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    showPassword,
    control,
    formState,
  };
};

const loginSchema = z.object({
  email: z.string().email().min(1, "Email address field is required"),
  practiceName: z.string().min(1, "Practice name field is required"),
  password: z.string().min(6, "Password must be at least 4 characters"),
}) satisfies z.ZodType<TAuthForm>;
