export enum ExerciseDifficulty {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

// TODO: fix these null additions to the fields
export type Exercise = {
  id: number; // TODO: Change to string
  name: string;
  description: string;
  duration: string | null;
  benefits: string[] | null;
  equipment: string | null;
  difficulty: ExerciseDifficulty;
  targetArea: string;
  instructions: string[];
  videoUrl: string;
};

export type AssignmentStep = "select" | "configure" | "patients";
