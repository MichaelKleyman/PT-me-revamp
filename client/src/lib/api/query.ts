import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createExercise,
  createPatient,
  deleteExercise,
  deletePatient,
  getAllExercises,
  getAllPatients,
  getCurrentUser,
  getExercise,
  getPatient,
  getPatientsExercises,
  getPractice,
} from "./fetch";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// QUERIES //

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getPracticeQueryOptions = (practiceId: string) =>
  queryOptions({
    queryKey: ["practice", practiceId],
    queryFn: () => getPractice(practiceId),
    enabled: !!practiceId,
  });

export const useGetUser = () => {
  return useQuery(
    queryOptions({
      queryKey: ["current-user"],
      queryFn: getCurrentUser,
      staleTime: Infinity,
    })
  );
};

export const useGetPractice = (practiceId: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["practice"],
      queryFn: () => getPractice(practiceId),
      enabled: !!practiceId,
    })
  );
};

export const useGetPatient = (patientId: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["patient"],
      queryFn: () => getPatient(patientId),
      enabled: !!patientId,
    })
  );
};

export const useGetAllPatients = (practiceId: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["allPatients"],
      queryFn: () => getAllPatients(practiceId),
      enabled: !!practiceId,
    })
  );
};

export const useGetPatientsExercises = (patientId: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["patientExercises"],
      queryFn: () => getPatientsExercises(patientId),
      enabled: !!patientId,
    })
  );
};

export const useGetExercise = (exerciseId: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["exercise"],
      queryFn: () => getExercise(exerciseId),
      enabled: !!exerciseId,
    })
  );
};

export const useGetAllExercises = () => {
  return useQuery(
    queryOptions({
      queryKey: ["allExercises"],
      queryFn: () => getAllExercises(),
    })
  );
};

// MUTATIONS //

export const useCreatePatient = () => {
  return useMutation({
    mutationFn: createPatient,
  });
};

export const useDeletePatient = () => {
  return useMutation({
    mutationFn: deletePatient,
  });
};

export const useCreateExercise = () => {
  return useMutation({
    mutationFn: createExercise,
  });
};

export const useDeleteExercise = () => {
  return useMutation({
    mutationFn: deleteExercise,
  });
};
