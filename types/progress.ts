export interface StoryProgress {
  id: number;
  completed: boolean;
  questionsAnswered: number;
  correctAnswers: number;
  lastAttempted?: Date;
  timeSpent: number; // in seconds
}

export interface UserProgress {
  completed: number[];
  current: number;
  stories: Record<number, StoryProgress>;
  totalTimeSpent: number;
}
