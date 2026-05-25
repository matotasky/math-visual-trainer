import type { MathTopic, QuestionType, VisualModel } from "@/types";

export type DiagnosticStep = {
  id: string;
  label: string;
  topic: MathTopic;
  questionType: QuestionType;
  visualModel: VisualModel;
  targetCount: number;
};

export const DIAGNOSTIC_STEPS = [
  {
    id: "quantity-to-5",
    label: "Small groups",
    topic: "quantity_recognition",
    questionType: "quantity_recognition",
    visualModel: "dots",
    targetCount: 6
  },
  {
    id: "quantity-to-10",
    label: "Ten-frame groups",
    topic: "quantity_to_10",
    questionType: "quantity_recognition",
    visualModel: "ten_frame",
    targetCount: 6
  },
  {
    id: "number-matching",
    label: "Match numbers",
    topic: "number_matching",
    questionType: "number_matching",
    visualModel: "dots",
    targetCount: 6
  },
  {
    id: "addition-to-5",
    label: "Add to 5",
    topic: "addition_to_5",
    questionType: "addition",
    visualModel: "dots",
    targetCount: 6
  },
  {
    id: "make-10",
    label: "Make 10",
    topic: "make_10",
    questionType: "make_10",
    visualModel: "ten_frame",
    targetCount: 6
  },
  {
    id: "addition-to-10",
    label: "Add to 10",
    topic: "addition_to_10",
    questionType: "addition",
    visualModel: "ten_frame",
    targetCount: 6
  },
  {
    id: "subtraction-to-10",
    label: "Subtract to 10",
    topic: "subtraction_to_10",
    questionType: "subtraction",
    visualModel: "number_line",
    targetCount: 4
  }
] satisfies DiagnosticStep[];
