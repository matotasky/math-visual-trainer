import type { ExerciseAttempt, MistakeCategory } from "@/types";

export function getOperandKey(operands: number[], operator?: string): string {
  return operator ? `${operands.join(operator)}` : operands.join(",");
}

export function classifyMistake(attempt: ExerciseAttempt): MistakeCategory {
  if (attempt.isCorrect && attempt.responseTimeMs > 8000) {
    return "slow_but_correct";
  }

  if (attempt.isCorrect) {
    return "unknown";
  }

  if (attempt.responseTimeMs < 1500) {
    return "fast_guessing";
  }

  if (attempt.topic === "make_10") {
    return "weak_make_10";
  }

  if (attempt.operator === "+" && attempt.operands.reduce((sum, operand) => sum + operand, 0) === 10) {
    return "weak_make_10";
  }

  if (attempt.topic === "quantity_recognition" || attempt.topic === "quantity_to_10") {
    return "weak_quantity_recognition";
  }

  return "wrong_pair_combination";
}
