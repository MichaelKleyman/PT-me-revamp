import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useHandleAuth } from "../../hooks/auth/useHandleAuth";

type TAuthProps = {
  isRegistering?: boolean;
  isLoggingIn?: boolean;
};

export const Auth = (props: TAuthProps) => {
  const { isRegistering = false, isLoggingIn = false } = props;

  const {
    handleLogin,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    showPassword,
    control,
    formState,
  } = useHandleAuth({ isLoggingIn, isRegistering });

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
      {isRegistering ? "Register" : "Log In"}
    </Button>
  );

  const renderLoginForm = (
    <>
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
    </>
  );

  return (
    <Stack mt={2} gap={2}>
      {renderLoginForm}
      {renderLoginButton}
    </Stack>
  );
};
