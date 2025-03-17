// import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TUserType } from "../../lib/types/auth";
import { Auth } from "../../lib/components/auth/Auth";

export const AuthLogin = (props: TUserType) => {
  const { userType, authType } = props;

  // const theme = useTheme();
  console.log({ userType });

  const isLoggingIn = authType === "login";

  const renderLoginForm = (
    <Auth isLoggingIn={isLoggingIn} userType={userType} />
  );

  return (
    <Stack>
      <Typography variant='h5'>Welcome to PT-ME</Typography>
      {renderLoginForm}
    </Stack>
  );
};
