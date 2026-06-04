import type { Exercise } from "@/types";
import { DotModel } from "./DotModel";
import { NumberLine } from "./NumberLine";
import { TenFrame } from "./TenFrame";

type ExerciseVisualProps = {
  exercise: Exercise;
};

export function ExerciseVisual({ exercise }: ExerciseVisualProps) {
  const [primary = 0, secondary = 0] = exercise.operands;

  if (exercise.visualModel === "none") {
    return (
      <div className="rounded-lg bg-white px-6 py-5 text-center text-4xl font-black text-slate-950 shadow-sm ring-1 ring-slate-200 sm:text-5xl">
        {exercise.prompt}
      </div>
    );
  }

  if (exercise.visualModel === "ten_frame") {
    if (exercise.operator === "+" && secondary > 0 && primary + secondary <= 10) {
      return <TenFrame added={secondary} filled={primary} />;
    }

    if (exercise.questionType === "make_10") {
      return <TenFrame added={exercise.correctAnswer} filled={primary} />;
    }

    return <TenFrame filled={primary} />;
  }

  if (exercise.visualModel === "number_line") {
    return <NumberLine end={exercise.correctAnswer} start={primary} />;
  }

  if (exercise.operator === "+" && secondary > 0) {
    return <DotModel count={primary} secondaryCount={secondary} />;
  }

  return <DotModel count={primary} />;
}
