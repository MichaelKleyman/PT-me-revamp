import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthRegister } from "./AuthRegister";
import { AuthLogin } from "./AuthLogin";

export const AuthForm = () => {
  const [loggingIn, setLoggingIn] = useState(false);

  return (
    <Stack textAlign='center' width='95%'>
      {!loggingIn ? <AuthRegister /> : <AuthLogin />}
      {!loggingIn ? (
        <Stack
          mt={3}
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={1}
        >
          <Typography>Already a registered user?</Typography>
          <Link to='/auth/login' onClick={() => setLoggingIn(true)}>
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
          <Link to='/auth' onClick={() => setLoggingIn(false)}>
            Sign up
          </Link>
        </Stack>
      )}
    </Stack>
  );
};
