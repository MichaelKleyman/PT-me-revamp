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
  status?: "active" | "completed" | "pending"; // TODO: consider removing
  difficulty: "beginner" | "intermediate" | "advanced";
  targetArea: string;
  instructions: string[];
  videoUrl: string;
  completedInSession?: boolean; // TODO: consider removing
};
