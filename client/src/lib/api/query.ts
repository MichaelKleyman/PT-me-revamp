import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./fetch";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

// QUERIES //

export const useGetUser = () => {
  return useQuery(userQueryOptions);
};

export const useGetPractice = () => {
  return useQuery({
    queryKey: ["practice"],
  });
};

// MUTATIONS //
