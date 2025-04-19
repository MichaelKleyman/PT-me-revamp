import { Patient, Practitioner, TAuthRegisterForm } from "../types/auth";
import { api } from "./api";

// Queries

// Grabs user details from the server
export const getCurrentUser = async (): Promise<{
  user: Patient | Practitioner | null;
}> => {
  const res = await api.me.$get();
  if (res.status == 401) {
    console.log("Is unauthenticated");
    return { user: null };
  }
  const data = await res.json();
  return { user: data.user };
};

export const getPractice = async (practiceId: string) => {
  try {
    const res = await api.practice[":practiceId"].$get({
      param: { practiceId },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching practice:", error);
  }
};

// Mutations

export const registerUser = async (userData: TAuthRegisterForm) => {
  // Store all the data in session
  await api.registrationData.$post({
    json: userData,
  });

  window.location.href = `/api/register/${userData.email}`;
};

export const loginUser = (email: string) => {
  window.location.href = `/api/login/${email}`;
};
