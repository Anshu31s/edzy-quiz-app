export type QuizSubject =
  | "Class 10 - English"
  | "Class 10 - Mathematics"
  | "Class 10 - Science"
  | "Class 10 - Social Science";

export type QuizPayload = {
  examSubjectName: QuizSubject;
  numberOfQuestions: 5 | 10 | 15;
};

export type QuizOption = {
  optionId: string | number;
  optionText: string;
  isCorrect?: boolean;
};

export type QuizQuestion = {
  questionId: string | number;
  questionText: string;
  options: QuizOption[];
};
