import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TAuthForm } from "../../types/auth";

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
    console.log({ email, password });
  };

  const handleRegister = async () => {
    if (!isRegistering) return;

    const { email, password, practiceName } = getValues();
    console.log({ email, password, practiceName });
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
