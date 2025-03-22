import { api } from "./api";

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
