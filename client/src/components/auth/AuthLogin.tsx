import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { LoginForm } from "../../lib/types/login";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { authClient } from "../../lib/auth/auth-client";

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

export const AuthLogin = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const resolver = zodResolver(loginSchema);

  const { control, formState, getValues } = useForm<LoginForm>({
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
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
    console.log({ data, error });
  };

  const renderLoginForm = (
    <>
      <Typography
        variant='h4'
        fontWeight='bold'
        mt={2}
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        Login
      </Typography>
      <Stack mt={2} gap={2}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              placeholder='Enter your email'
              label='Email'
              fullWidth
              error={!!formState.errors.email}
              helperText={
                formState.errors.email ? formState.errors.email.message : ""
              }
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id='outlined-adornment-password'
              placeholder='Enter your password'
              type={showPassword ? "text" : "password"}
              label='Password'
              error={!!formState.errors.password}
              helperText={
                formState.errors.email ? formState.errors.email.message : ""
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Stack>
    </>
  );

  const renderLoginButton = (
    <Button
      color='inherit'
      onClick={handleLogin}
      sx={{
        marginTop: 4,
        background: "#0957DE",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          background: "#007FFF",
        },
      }}
    >
      Log In
    </Button>
  );

  return (
    <Stack>
      <Typography variant='h5'>Welcome to PT-ME</Typography>
      {renderLoginForm}
      {renderLoginButton}
    </Stack>
  );
};

const loginSchema = z.object({
  email: z.string().email().min(1, "Email address field ie required"),
  password: z.string().min(6, "Password must be at least 4 characters"),
}) satisfies z.ZodType<LoginForm>;
