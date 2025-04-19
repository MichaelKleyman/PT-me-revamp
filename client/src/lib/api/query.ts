import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUser, getPractice } from "./fetch";

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

export const getPracticeQueryOptions = (practiceId: string) =>
  queryOptions({
    queryKey: ["practice"],
    queryFn: () => getPractice(practiceId),
    enabled: !!practiceId,
  });

// QUERIES //

export const useGetUser = () => {
  return useQuery(userQueryOptions);
};

export const useGetPractice = (practiceId: string) => {
  return useQuery(getPracticeQueryOptions(practiceId));
};

// MUTATIONS //
