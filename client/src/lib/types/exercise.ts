export enum ExerciseDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

// TODO: fix these null additions to the fields
export type Exercise = {
  id: string;
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
