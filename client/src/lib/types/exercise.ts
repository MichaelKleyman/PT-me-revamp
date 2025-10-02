export enum ExerciseDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum ExerciseStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  PENDING = "pending",
  SKIPPED = "skipped",
}

export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  duration: string;
  benefits: string[];
  equipment: string;
  frequency: string;
  status:
    | ExerciseStatus.ACTIVE
    | ExerciseStatus.COMPLETED
    | ExerciseStatus.PENDING
    | ExerciseStatus.SKIPPED; // TODO: consider removing
  difficulty: ExerciseDifficulty;
  targetArea: string;
  instructions: string[];
  videoUrl: string;
};
