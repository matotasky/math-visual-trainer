import { getLevelDefinition } from "@/data/levels";
import type { Exercise, ExerciseMode, GenerateExerciseParams, LevelDefinition, Locale, MathOperator, MathTopic, VisualModel } from "@/types";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)] ?? items[0];
}

function selectTopic(level: LevelDefinition, preferredTopic?: MathTopic): MathTopic {
  if (preferredTopic && level.topics.includes(preferredTopic)) {
    return preferredTopic;
  }

  return randomFrom(level.topics);
}

function isQuantityTopic(topic: MathTopic): boolean {
  return topic === "quantity_recognition" || topic === "quantity_to_10" || topic === "number_matching";
}

function selectVisualModel(
  level: LevelDefinition,
  topic: MathTopic,
  mode: ExerciseMode,
  preferredVisualModel?: VisualModel
): VisualModel {
  if (preferredVisualModel && level.visualModels.includes(preferredVisualModel)) {
    return preferredVisualModel;
  }

  if (!isQuantityTopic(topic) && level.visualModels.includes("none")) {
    if (mode === "test" || mode === "challenge") {
      return "none";
    }

    if (mode === "practice" && (level.timePressure === "medium" || level.timePressure === "high")) {
      return "none";
    }
  }

  return level.visualModels[0];
}

function promptForTopic(locale: Locale, topic: MathTopic, operands: number[], operator?: MathOperator): string {
  const [a = 0, b = 0] = operands;

  if (topic === "quantity_recognition" || topic === "quantity_to_10") {
    return locale === "sk" ? "Koľko ich vidíš?" : "How many do you see?";
  }

  if (topic === "number_matching") {
    return locale === "sk" ? "Aké číslo patrí k obrázku?" : "Which number matches the picture?";
  }

  if (topic === "make_10") {
    return `${a} + ? = 10`;
  }

  if (operator === "-") {
    return `${a} - ${b} = ?`;
  }

  return `${a} + ${b} = ?`;
}

function getQuestionType(topic: MathTopic, operator?: MathOperator): Exercise["questionType"] {
  if (topic === "make_10") {
    return "make_10";
  }

  if (topic === "bridge_through_10") {
    return "bridge_through_10";
  }

  return operator === "-" ? "subtraction" : "addition";
}

function buildArithmeticExercise({
  id,
  level,
  locale,
  mode,
  operands,
  operator,
  topic,
  visualModel
}: {
  id: string;
  level: LevelDefinition;
  locale: Locale;
  mode: ExerciseMode;
  operands: number[];
  operator: MathOperator;
  topic: MathTopic;
  visualModel: VisualModel;
}): Exercise {
  const [a = 0, b = 0] = operands;
  const correctAnswer = operator === "-" ? a - b : a + b;

  return {
    id,
    topic,
    levelId: level.id,
    mode,
    questionType: getQuestionType(topic, operator),
    operands,
    operator,
    correctAnswer,
    visualModel,
    prompt: promptForTopic(locale, topic, operands, operator),
    timePressure: level.timePressure
  };
}

function createSubtractionTo10(): number[] {
  const a = randomInt(2, 10);
  const b = randomInt(1, a);

  return [a, b];
}

function createSubtractionTo20(): number[] {
  const a = randomInt(11, 20);
  const b = randomInt(1, Math.min(12, a));

  return [a, b];
}

function createAdditionToMax(maxTotal: number): number[] {
  const a = randomInt(1, Math.min(9, maxTotal - 1));
  const b = randomInt(1, maxTotal - a);

  return [a, b];
}

function createBridgeThrough10(): number[] {
  const a = randomInt(6, 9);
  const bridgePart = 10 - a;
  const extraPart = randomInt(1, 8);

  return [a, bridgePart + extraPart];
}

function createTensTo100(): { operands: number[]; operator: MathOperator } {
  const operator: MathOperator = Math.random() < 0.5 ? "+" : "-";

  if (operator === "+") {
    const a = randomInt(1, 8) * 10;
    const b = randomInt(1, 10 - a / 10) * 10;

    return { operands: [a, b], operator };
  }

  const a = randomInt(3, 10) * 10;
  const b = randomInt(1, a / 10 - 1) * 10;

  return { operands: [a, b], operator };
}

function createTwoDigitAdditionNoRegroup(): number[] {
  const aTens = randomInt(1, 8);
  const bTens = randomInt(1, 9 - aTens);
  const aOnes = randomInt(0, 9);
  const bOnes = randomInt(0, 9 - aOnes);

  return [aTens * 10 + aOnes, bTens * 10 + bOnes];
}

function createTwoDigitSubtractionNoRegroup(): number[] {
  const aTens = randomInt(2, 9);
  const bTens = randomInt(1, aTens - 1);
  const aOnes = randomInt(0, 9);
  const bOnes = randomInt(0, aOnes);

  return [aTens * 10 + aOnes, bTens * 10 + bOnes];
}

function createTwoDigitAdditionWithRegroup(): number[] {
  const aTens = randomInt(1, 7);
  const bTens = randomInt(1, 8 - aTens);
  const aOnes = randomInt(5, 9);
  const bOnes = randomInt(10 - aOnes, 9);

  return [aTens * 10 + aOnes, bTens * 10 + bOnes];
}

function createTwoDigitSubtractionWithRegroup(): number[] {
  const aTens = randomInt(2, 9);
  const bTens = randomInt(1, aTens - 1);
  const aOnes = randomInt(0, 8);
  const bOnes = randomInt(aOnes + 1, 9);

  return [aTens * 10 + aOnes, bTens * 10 + bOnes];
}

function createThreeDigitAdditionStrategy(): number[] {
  const a = randomInt(100, 799);
  const b = randomInt(20, Math.min(199, 999 - a));

  return [a, b];
}

function createThreeDigitSubtractionStrategy(): number[] {
  const a = randomInt(200, 999);
  const b = randomInt(20, Math.min(199, a - 100));

  return [a, b];
}

function createArithmeticOperands(topic: MathTopic): { operands: number[]; operator: MathOperator } {
  if (topic === "subtraction_to_10") {
    return { operands: createSubtractionTo10(), operator: "-" };
  }

  if (topic === "subtraction_to_20") {
    return { operands: createSubtractionTo20(), operator: "-" };
  }

  if (topic === "bridge_through_10") {
    return { operands: createBridgeThrough10(), operator: "+" };
  }

  if (topic === "addition_to_5") {
    return { operands: createAdditionToMax(5), operator: "+" };
  }

  if (topic === "addition_to_20") {
    return { operands: createAdditionToMax(20), operator: "+" };
  }

  if (topic === "tens_to_100") {
    return createTensTo100();
  }

  if (topic === "two_digit_addition_no_regroup") {
    return { operands: createTwoDigitAdditionNoRegroup(), operator: "+" };
  }

  if (topic === "two_digit_subtraction_no_regroup") {
    return { operands: createTwoDigitSubtractionNoRegroup(), operator: "-" };
  }

  if (topic === "two_digit_addition_with_regroup") {
    return { operands: createTwoDigitAdditionWithRegroup(), operator: "+" };
  }

  if (topic === "two_digit_subtraction_with_regroup") {
    return { operands: createTwoDigitSubtractionWithRegroup(), operator: "-" };
  }

  if (topic === "three_digit_addition_strategies") {
    return { operands: createThreeDigitAdditionStrategy(), operator: "+" };
  }

  if (topic === "three_digit_subtraction_strategies") {
    return { operands: createThreeDigitSubtractionStrategy(), operator: "-" };
  }

  return { operands: createAdditionToMax(10), operator: "+" };
}

export function generateExercise(params: GenerateExerciseParams): Exercise {
  const level = getLevelDefinition(params.levelId);
  const topic = selectTopic(level, params.topic);
  const visualModel = selectVisualModel(level, topic, params.mode, params.preferredVisualModel);
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
      prompt: promptForTopic(locale, topic, [known], "+"),
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

  const { operands, operator } = createArithmeticOperands(topic);

  return buildArithmeticExercise({
    id,
    level,
    locale,
    mode: params.mode,
    operands,
    operator,
    topic,
    visualModel
  });
}
