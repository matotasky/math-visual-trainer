import type { MathTopic, QuestionType, VisualModel } from "@/types";

export type ExerciseTemplate = {
  id: string;
  topic: MathTopic;
  questionType: QuestionType;
  visualModels: VisualModel[];
  promptTemplate: string;
};

export const EXERCISE_TEMPLATES = [
  {
    id: "quantity-recognition-basic",
    topic: "quantity_recognition",
    questionType: "quantity_recognition",
    visualModels: ["dots", "groups"],
    promptTemplate: "Ko\u013eko ich vid\u00ed\u0161?"
  },
  {
    id: "number-matching-basic",
    topic: "number_matching",
    questionType: "number_matching",
    visualModels: ["dots", "ten_frame"],
    promptTemplate: "Ktor\u00fd obr\u00e1zok ukazuje \u010d\u00edslo {answer}?"
  },
  {
    id: "addition-to-5-basic",
    topic: "addition_to_5",
    questionType: "addition",
    visualModels: ["dots", "groups"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "addition-to-10-ten-frame",
    topic: "addition_to_10",
    questionType: "addition",
    visualModels: ["ten_frame", "number_line"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "make-10-complement",
    topic: "make_10",
    questionType: "make_10",
    visualModels: ["ten_frame"],
    promptTemplate: "{a} + ? = 10"
  },
  {
    id: "subtraction-to-10-basic",
    topic: "subtraction_to_10",
    questionType: "subtraction",
    visualModels: ["number_line", "groups"],
    promptTemplate: "{a} - {b} = ?"
  },
  {
    id: "subtraction-to-20-basic",
    topic: "subtraction_to_20",
    questionType: "subtraction",
    visualModels: ["number_line", "none"],
    promptTemplate: "{a} - {b} = ?"
  },
  {
    id: "bridge-through-10-basic",
    topic: "bridge_through_10",
    questionType: "bridge_through_10",
    visualModels: ["ten_frame", "number_line"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "tens-to-100-basic",
    topic: "tens_to_100",
    questionType: "addition",
    visualModels: ["none"],
    promptTemplate: "{a} ± {b} = ?"
  },
  {
    id: "two-digit-addition-no-regroup",
    topic: "two_digit_addition_no_regroup",
    questionType: "addition",
    visualModels: ["none"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "two-digit-subtraction-no-regroup",
    topic: "two_digit_subtraction_no_regroup",
    questionType: "subtraction",
    visualModels: ["none"],
    promptTemplate: "{a} - {b} = ?"
  },
  {
    id: "two-digit-addition-with-regroup",
    topic: "two_digit_addition_with_regroup",
    questionType: "addition",
    visualModels: ["none"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "two-digit-subtraction-with-regroup",
    topic: "two_digit_subtraction_with_regroup",
    questionType: "subtraction",
    visualModels: ["none"],
    promptTemplate: "{a} - {b} = ?"
  },
  {
    id: "three-digit-addition-strategies",
    topic: "three_digit_addition_strategies",
    questionType: "addition",
    visualModels: ["none"],
    promptTemplate: "{a} + {b} = ?"
  },
  {
    id: "three-digit-subtraction-strategies",
    topic: "three_digit_subtraction_strategies",
    questionType: "subtraction",
    visualModels: ["none"],
    promptTemplate: "{a} - {b} = ?"
  }
] satisfies ExerciseTemplate[];
