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
    promptTemplate: "How many do you see?"
  },
  {
    id: "number-matching-basic",
    topic: "number_matching",
    questionType: "number_matching",
    visualModels: ["dots", "ten_frame"],
    promptTemplate: "Which picture matches {answer}?"
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
    id: "bridge-through-10-basic",
    topic: "bridge_through_10",
    questionType: "bridge_through_10",
    visualModels: ["ten_frame", "number_line"],
    promptTemplate: "{a} + {b} = ?"
  }
] satisfies ExerciseTemplate[];
