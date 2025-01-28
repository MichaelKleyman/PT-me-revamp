import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AuthRegister } from "./AuthRegister";
import { AuthLogin } from "./AuthLogin";
import { Route } from "../../routes/(auth)/auth";

export const AuthForm = () => {
  const { authType } = useSearch({ from: Route.id });

  console.log({ authType });

  const isLoggingIn = authType === "login";

  // const handleLoginClick = () => {
  //   console.log("Navigating to login");
  //   navigate({
  //     to: "/auth",
  //     search: {
  //       loggingIn: true,
  //     },
  //     replace: true,
  //   });
  // };

  // const handleRegisterClick = () => {
  //   navigate({
  //     search: (prev) => ({
  //       ...prev,
  //       loggingIn: undefined,
  //       register: true,
  //     }),
  //     replace: true,
  //   });
  // };

  return (
    <Stack textAlign='center' width='95%'>
      {!isLoggingIn ? <AuthRegister /> : <AuthLogin />}
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
          {/* <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, loggingIn: true }) })
            }
          >
            Login here
          </Button> */}
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
