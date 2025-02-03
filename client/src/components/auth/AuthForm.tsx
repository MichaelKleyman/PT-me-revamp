import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link, useSearch } from "@tanstack/react-router";
import { AuthRegister } from "./AuthRegister";
import { AuthLogin } from "./AuthLogin";
import { Route } from "../../routes/(auth)/auth";

export const AuthForm = () => {
  const { authType, userType } = useSearch({ from: Route.id });

  const isLoggingIn = authType === "login";

  return (
    <Stack textAlign='center' width='95%'>
      {!isLoggingIn ? (
        <AuthRegister userType={userType} authType={authType} />
      ) : (
        <AuthLogin userType={userType} authType={authType} />
      )}
      {!isLoggingIn ? (
        <Stack
          mt={3}
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={1}
        >
          <Typography>Already a registered user?</Typography>
          <Link
            to='/auth'
            search={{ authType: isLoggingIn ? "register" : "login" }}
          >
            Login here
          </Link>
        </Stack>
      ) : (
        <Stack
          mt={3}
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={1}
        >
          <Typography>Not registered yet?</Typography>
          <Link
            to='/auth'
            search={{ authType: isLoggingIn ? "register" : "login" }}
          >
            Sign up
          </Link>
        </Stack>
      )}
    </Stack>
  );
};
