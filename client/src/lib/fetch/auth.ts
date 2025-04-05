import { TAuthRegisterForm } from "../types/auth";
import { api } from "./api";

// Queries

// Grabs user details from the server
export const getCurrentUser = async () => {
  const res = await api.me.$get();
  if (res.status == 401) {
    console.log("Is unauthenticated");
    return { user: null };
  }
  const data = await res.json();
  return data;
};

export const registerUser = async (userData: TAuthRegisterForm) => {
  // Store all the data in session
  await api.auth.registrationData.$post({
    json: userData,
  });

  window.location.href = `/api/register/${userData.email}`;
};

// Mutations
