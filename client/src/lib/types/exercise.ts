export enum ExerciseDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export type Exercise = {
  id: string;
  name: string;
  description: string;
  duration: string;
  benefits: string[];
  equipment: string;
  difficulty: ExerciseDifficulty;
  targetArea: string;
  instructions: string[];
  videoUrl: string;
};
