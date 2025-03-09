import { api } from "./api";

// Grabs user details from the server
export const getCurrentUser = async () => {
  const res = await api.me.$get();
  if (!res.ok) throw new Error("Server Error");
  const data = await res.json();
  return data;
};
