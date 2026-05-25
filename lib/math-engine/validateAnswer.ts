import type { AnswerValidationResult, Exercise } from "@/types";

export function validateAnswer(exercise: Exercise, answer: number | string | null): AnswerValidationResult {
  const normalizedAnswer = answer === null || answer === "" ? null : Number(answer);

  if (normalizedAnswer === null || Number.isNaN(normalizedAnswer)) {
    return {
      isCorrect: false,
      normalizedAnswer: null
    };
  }

  return {
    isCorrect: normalizedAnswer === exercise.correctAnswer,
    normalizedAnswer
  };
}
