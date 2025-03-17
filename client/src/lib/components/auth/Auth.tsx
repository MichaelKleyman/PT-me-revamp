import { Stack, TextField, Button, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { useHandleAuth } from "../../hooks/auth/useHandleAuth";
import { TUserType } from "@client/lib/types/auth";

type TAuthProps = {
  userType: TUserType["userType"];
  isRegistering?: boolean;
  isLoggingIn?: boolean;
};

export const Auth = (props: TAuthProps) => {
  const { userType, isRegistering = false, isLoggingIn = false } = props;

  const { handleLogin, handleRegister, control, formState, watch } =
    useHandleAuth({
      isLoggingIn,
      isRegistering,
    });

  const practiceName = watch("practiceName") ?? "";
  const email = watch("email");

  const renderSubmitButton = (
    <Box
      component='a'
      href={`/api/register?email=${email}&practicename=${practiceName}&userType=${userType}`}
      sx={{
        marginTop: 1,
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
      <Button
        color='inherit'
        onClick={isLoggingIn ? handleLogin : handleRegister}
      >
        {isRegistering ? "Register" : "Log In"}
      </Button>
    </Box>
  );

  const renderAuthForm = (
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
      {isRegistering ? (
        <Controller
          name='practiceName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              placeholder='Enter your practice name'
              label='Practice Name'
              fullWidth
              error={!!formState.errors.practiceName}
              helperText={
                formState.errors.practiceName
                  ? formState.errors.practiceName.message
                  : ""
              }
            />
          )}
        />
      ) : null}
    </>
  );

  return (
    <Stack mt={2} gap={2}>
      {renderAuthForm}
      {renderSubmitButton}
    </Stack>
  );
};
