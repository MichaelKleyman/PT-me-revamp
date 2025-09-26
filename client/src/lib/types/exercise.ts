export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  frequency: string;
  status: "active" | "completed" | "pending";
  difficulty: "beginner" | "intermediate" | "advanced";
  targetArea: string;
  instructions: string[];
  videoUrl: string;
  completedInSession: boolean;
};
