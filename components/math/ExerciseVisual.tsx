import type { Exercise } from "@/types";
import { DotModel } from "./DotModel";
import { NumberLine } from "./NumberLine";
import { TenFrame } from "./TenFrame";

type ExerciseVisualProps = {
  exercise: Exercise;
};

export function ExerciseVisual({ exercise }: ExerciseVisualProps) {
  const primary = exercise.operands[0] ?? 0;

  if (exercise.visualModel === "ten_frame") {
    return <TenFrame filled={primary} />;
  }

  if (exercise.visualModel === "number_line") {
    return <NumberLine end={exercise.correctAnswer} start={primary} />;
  }

  return <DotModel count={primary} />;
}
