export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
export type ExamType = "DIAGNOSTIC" | "DTM" | "PRACTICE";
export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface QuestionView {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer?: string; // faqat natija sahifasida ko'rsatiladi
  explanation?: string;
  topic?: string | null;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  order: number;
}

export interface TestView {
  id: string;
  subjectName: string;
  examType: "DIAGNOSTIC" | "DTM" | "PRACTICE";
  questions: QuestionView[];
}

export interface ResultView {
  id: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  weakTopics: string[];
  strongTopics: string[];
  aiAnalysis: string | null;
}
