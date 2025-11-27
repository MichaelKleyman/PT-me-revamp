export enum ExerciseStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  PENDING = "pending",
  SKIPPED = "skipped",
}

export type PatientExerciseMetaData = {
  id: string;
  patientId: string;
  exerciseId: string;
  sets: number;
  reps: string;
  frequency: string;
  status: "active" | "completed" | "pending" | "skipped";
  lastCompletedDate: string; // TODO: Bring in dayjs
};
