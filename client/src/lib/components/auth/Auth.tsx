import { Stack, TextField, Button, Typography, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { TUserType } from "@client/lib/types/auth";
import { useHandleAuthRegister } from "@client/lib/hooks/auth/useHandleAuthRegister";
import { useHandleAuthLogin } from "@client/lib/hooks/auth/useHandleAuthLogin";
import { ReactElement, useState } from "react";

type TAuthProps = {
  userType: TUserType["userType"];
  isRegistering?: boolean;
  isLoggingIn?: boolean;
  registerStep?: number;
  onChangeStep?: (val: number) => void;
};

export const Auth = (props: TAuthProps) => {
  const {
    userType,
    isRegistering = false,
    isLoggingIn = false,
    registerStep,
    onChangeStep,
  } = props;
  const [error, setError] = useState(false);

  const handleError = (val: boolean) => {
    setError(val);
  };

  const { handleRegister, validateStep, registerForm } = useHandleAuthRegister({
    isRegistering,
    handleError,
    userType,
  });

  const { handleLogin, loginForm } = useHandleAuthLogin(
    isLoggingIn,
    handleError
  );

  const practiceName = registerForm.watch("practiceName") ?? "";
  const email = isRegistering
    ? registerForm.watch("email")
    : loginForm.watch("email");

  const renderNextStepButton = (
    <StyledAuthButton
      onClick={async () => {
        const isValid = await validateStep(registerStep ?? 1);
        if (isValid) {
          onChangeStep?.(2);
        }
      }}
    >
      Next Step
    </StyledAuthButton>
  );

  const renderPreviousStepButton = (
    <StyledAuthButton onClick={() => onChangeStep?.(1)}>
      Go Back
    </StyledAuthButton>
  );

  const renderSubmitButton = (
    <StyledAuthButton onClick={isLoggingIn ? handleLogin : handleRegister}>
      {isRegistering ? "Register" : "Log In"}
    </StyledAuthButton>
  );

  const renderAuthLoginForm = isLoggingIn ? (
    <>
      <Controller
        name="email"
        control={loginForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter your email"
            label="Email"
            fullWidth
            error={!!loginForm.formState.errors.email}
            helperText={
              loginForm.formState.errors.email
                ? loginForm.formState.errors.email.message
                : ""
            }
          />
        )}
      />
    </>
  ) : null;

  const renderStep1 = (
    <>
      <Controller
        name="email"
        control={registerForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter your email"
            label="Email"
            fullWidth
            error={!!registerForm.formState.errors.email}
            helperText={
              registerForm.formState.errors.email
                ? registerForm.formState.errors.email.message
                : ""
            }
          />
        )}
      />
      <Controller
        name="practiceName"
        control={registerForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter your practice name"
            label="Practice Name"
            fullWidth
            error={!!registerForm.formState.errors.practiceName}
            helperText={
              registerForm.formState.errors.practiceName
                ? registerForm.formState.errors.practiceName.message
                : ""
            }
          />
        )}
      />
      <Controller
        name="address"
        control={registerForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter address"
            label="Address"
            fullWidth
            error={!!registerForm.formState.errors.address}
            helperText={
              registerForm.formState.errors.address
                ? registerForm.formState.errors.address.message
                : ""
            }
          />
        )}
      />
    </>
  );

  const renderStep2 = (
    <>
      <Controller
        name="practitionerName"
        control={registerForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter admin practitioner username"
            label="Admin Practitioner Username"
            fullWidth
            error={!!registerForm.formState.errors.practitionerName}
            helperText={
              registerForm.formState.errors.practitionerName
                ? registerForm.formState.errors.practitionerName.message
                : ""
            }
          />
        )}
      />
      <Controller
        name="licenseNumber"
        control={registerForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder="Enter license number"
            label="Practitioner License Number"
            fullWidth
            error={!!registerForm.formState.errors.licenseNumber}
            helperText={
              registerForm.formState.errors.licenseNumber
                ? registerForm.formState.errors.licenseNumber.message
                : ""
            }
          />
        )}
      />
    </>
  );

  const renderSubmitError = error ? (
    <Typography color="error">Please complete all fields*</Typography>
  ) : null;

  const registerPageSteps: Record<number, ReactElement> = {
    1: renderStep1,
    2: renderStep2,
  };

  return (
    <Stack mt={2} gap={2}>
      {/* Register page steps */}
      {isRegistering && registerStep ? (
        <>
          {registerPageSteps[registerStep]}
          {registerStep < 2 ? (
            renderNextStepButton
          ) : (
            <Stack direction="row" justifyContent="center" gap={2}>
              {renderPreviousStepButton}
              {renderSubmitButton}
            </Stack>
          )}
        </>
      ) : null}
      {/* Login page */}
      {isLoggingIn ? (
        <>
          {renderAuthLoginForm}
          {isLoggingIn ? renderSubmitButton : null}
        </>
      ) : null}
      {renderSubmitError}
    </Stack>
  );
};

const StyledAuthButton = styled(Button)(() => ({
  marginTop: 1,
  background: "#0957DE",
  width: "100%",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    background: "#007FFF",
  },
}));
