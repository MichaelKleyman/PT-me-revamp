"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

const Login = () => {
  const status = useUser();
  console.log({ status });

  return <div>Login</div>;
};

export default Login;
