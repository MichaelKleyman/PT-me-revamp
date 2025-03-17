type TAuthLinkWrapper = {
  children: React.ReactNode;
  isLoggingIn?: boolean;
  isRegistering?: boolean;
};

export const AuthLinkWrapper = (props: TAuthLinkWrapper) => {
  const { isLoggingIn, isRegistering, children } = props;

  let authType = "register"; // Default to register

  if (isLoggingIn) {
    authType = "login";
  } else if (isRegistering) {
    authType = "register";
  }

  const redirectAuthUrl = `/api/${authType}`;

  return (
    <a href={redirectAuthUrl} style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};
