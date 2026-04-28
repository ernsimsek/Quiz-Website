export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface CategoryData {
  easy: Question[];
  medium: Question[];
  hard: Question[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  questions: CategoryData;
}

export interface QuizData {
  categories: Category[];
}
