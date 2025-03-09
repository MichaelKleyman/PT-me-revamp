import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../fetch/auth";

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

//TODO: Move to a more categorized location so more RQ hooks can be added
export const useGetUser = () => {
  return useQuery(userQueryOptions);
};
