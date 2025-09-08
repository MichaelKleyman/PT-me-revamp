import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createExercise,
  createPatient,
  deleteExercise,
  deletePatient,
  deletePatients,
  getAllExercises,
  getAllPatients,
  getCurrentUser,
  getExercise,
  getPatient,
  getPatientsExercises,
  getPractice,
} from "./fetch";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useEffect } from "react";
import { WSEvent, WSMessageKind } from "../../types/ws";
import { Patient } from "../../types/auth";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// RQ base keys
export const baseKeys = {
  all: ["practitioner"],
  allPatients: () => [...baseKeys.all, "all_patients"],
  patient: (id: string) => [...baseKeys.all, "patient", id],
  practice: (id: string) => [...baseKeys.all, "practice", id],
  patientsExercises: (patientId: string) => [
    ...baseKeys.all,
    "patients_exercises",
    patientId,
  ],
  exercise: (id: string) => [...baseKeys.all, "exercise", id],
  allExercises: () => [...baseKeys.all, "all_exercises"],
  user: () => [...baseKeys.all, "user"],
};

// WEBSOCKET //

let websocket: ReconnectingWebSocket | null = null;

const getWs = (): ReconnectingWebSocket => {
  if (!websocket) {
    websocket = new ReconnectingWebSocket("ws://localhost:3000/ws");
    setupWebSocketHandlers(websocket);
  }
  return websocket;
};

export const useConnectWebsocket = () => {
  useEffect(() => {
    getWs();
  }, []);
};

const setupWebSocketHandlers = (ws: ReconnectingWebSocket) => {
  ws.onopen = (event) => {
    console.log("WebSocket connection opened:", event);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onRecieveWSMessage(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };
};

const onRecieveWSMessage = (data: WSEvent) => {
  switch (data.kind) {
    // Handle new patient creation
    case WSMessageKind.PatientCreated:
      handleNewPatientCreated(data.patient);
      break;
    case WSMessageKind.PatientsBulkDeleted:
      handlePatientsBulkDeleted(data.patientIds);
      break;
    default:
      console.warn("Unhandled WS message kind:", data);
      break;
  }
};

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
      queryKey: baseKeys.user(),
      queryFn: getCurrentUser,
      staleTime: Infinity,
    })
  );
};

export const useGetPractice = (practiceId: string) => {
  return useQuery(
    queryOptions({
      queryKey: baseKeys.practice(practiceId),
      queryFn: () => getPractice(practiceId),
      enabled: !!practiceId,
    })
  );
};

export const useGetPatient = (patientId: string) => {
  return useQuery(
    queryOptions({
      queryKey: baseKeys.patient(patientId),
      queryFn: () => getPatient(patientId),
      enabled: !!patientId,
    })
  );
};

export const useGetAllPatients = (practiceId: string) => {
  return useSuspenseQuery(
    queryOptions({
      queryKey: baseKeys.allPatients(),
      queryFn: () => getAllPatients(practiceId),
      enabled: !!practiceId,
    })
  );
};

export const useGetPatientsExercises = (patientId: string) => {
  return useSuspenseQuery(
    queryOptions({
      queryKey: baseKeys.patientsExercises(patientId),
      queryFn: () => getPatientsExercises(patientId),
      enabled: !!patientId,
    })
  );
};

export const useGetExercise = (exerciseId: string) => {
  return useQuery(
    queryOptions({
      queryKey: baseKeys.exercise(exerciseId),
      queryFn: () => getExercise(exerciseId),
      enabled: !!exerciseId,
    })
  );
};

export const useGetAllExercises = () => {
  return useQuery(
    queryOptions({
      queryKey: baseKeys.allExercises(),
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

export const useBulkDeletePatients = () => {
  return useMutation({
    mutationFn: deletePatients,
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

// HANDLERS //

const handleNewPatientCreated = (patient: Patient) => {
  queryClient.setQueryData(baseKeys.allPatients(), (oldData: Patient[]) => {
    if (!oldData.length) return [patient];

    return [...oldData, patient];
  });
};

const handlePatientsBulkDeleted = (patientIds: number[]) => {
  queryClient.setQueryData(baseKeys.allPatients(), (oldData: Patient[]) => {
    if (!oldData.length) return [];

    // Remove deleted patients from the cache
    return oldData.filter(
      (patient) => patient.id && !patientIds.includes(patient.id)
    );
  });
};
