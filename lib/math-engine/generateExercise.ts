import { LEVELS } from "@/data/levels";
import type { Exercise, GenerateExerciseParams, LevelDefinition, Locale, MathTopic, VisualModel } from "@/types";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectTopic(level: LevelDefinition, preferredTopic?: MathTopic): MathTopic {
  if (preferredTopic && level.topics.includes(preferredTopic)) {
    return preferredTopic;
  }

  return level.topics[0];
}

function selectVisualModel(level: LevelDefinition, preferredVisualModel?: VisualModel): VisualModel {
  if (preferredVisualModel && level.visualModels.includes(preferredVisualModel)) {
    return preferredVisualModel;
  }

  return level.visualModels[0];
}

function promptForTopic(locale: Locale, topic: MathTopic, operands: number[]): string {
  const [a = 0, b = 0] = operands;

  if (topic === "quantity_recognition" || topic === "quantity_to_10") {
    return locale === "sk" ? "Ko\u013eko ich vid\u00ed\u0161?" : "How many do you see?";
  }

  if (topic === "number_matching") {
    return locale === "sk" ? "Ak\u00e9 \u010d\u00edslo patr\u00ed k obr\u00e1zku?" : "Which number matches the picture?";
  }

  if (topic === "make_10") {
    return `${a} + ? = 10`;
  }

  if (topic === "subtraction_to_10") {
    return `${a} - ${b} = ?`;
  }

  return `${a} + ${b} = ?`;
}

export function generateExercise(params: GenerateExerciseParams): Exercise {
  const level = LEVELS.find((candidate) => candidate.id === params.levelId) ?? LEVELS[0];
  const topic = selectTopic(level, params.topic);
  const visualModel = selectVisualModel(level, params.preferredVisualModel);
  const locale = params.locale ?? "sk";
  const id = `${params.childProfileId}-${Date.now()}`;

  if (topic === "make_10") {
    const known = randomInt(1, 9);

    return {
      id,
      topic,
      levelId: level.id,
      mode: params.mode,
      questionType: "make_10",
      operands: [known],
      operator: "+",
      correctAnswer: 10 - known,
      visualModel,
      prompt: promptForTopic(locale, topic, [known]),
      timePressure: level.timePressure
    };
  }

  if (topic === "subtraction_to_10") {
    const a = randomInt(2, 10);
    const b = randomInt(1, a);

    return {
      id,
      topic,
      levelId: level.id,
      mode: params.mode,
      questionType: "subtraction",
      operands: [a, b],
      operator: "-",
      correctAnswer: a - b,
      visualModel,
      prompt: promptForTopic(locale, topic, [a, b]),
      timePressure: level.timePressure
    };
  }

  if (topic === "quantity_recognition" || topic === "quantity_to_10" || topic === "number_matching") {
    const upperBound = topic === "quantity_recognition" ? 5 : 10;
    const amount = randomInt(1, upperBound);

    return {
      id,
      topic,
      levelId: level.id,
      mode: params.mode,
      questionType: topic === "number_matching" ? "number_matching" : "quantity_recognition",
      operands: [amount],
      correctAnswer: amount,
      visualModel,
      prompt: promptForTopic(locale, topic, [amount]),
      options: [amount, Math.max(0, amount - 1), amount + 1].sort((a, b) => a - b),
      timePressure: level.timePressure
    };
  }

  const maxTotal = topic === "addition_to_5" ? 5 : topic === "addition_to_20" || topic === "bridge_through_10" ? 20 : 10;
  const a = randomInt(1, Math.min(9, maxTotal - 1));
  const b = randomInt(1, maxTotal - a);

  return {
    id,
    topic,
    levelId: level.id,
    mode: params.mode,
    questionType: topic === "bridge_through_10" ? "bridge_through_10" : "addition",
    operands: [a, b],
    operator: "+",
    correctAnswer: a + b,
    visualModel,
    prompt: promptForTopic(locale, topic, [a, b]),
    timePressure: level.timePressure
  };
}
