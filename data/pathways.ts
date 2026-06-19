import type { LearningPathway } from "@/types";

export const LEARNING_PATHWAYS = [
  {
    id: "visual_arithmetic",
    title: "Visual Arithmetic",
    description: "Foundational visual number sense and arithmetic.",
    route: "/child/visual-arithmetic",
    status: "active",
    recommendedFor:
      "Children who need to build number understanding, make-10, quantity recognition, and early arithmetic concepts."
  },
  {
    id: "arithmetic_fluency",
    title: "Arithmetic Fluency",
    description: "Practice and automate arithmetic facts and strategies.",
    route: "/child/fluency",
    status: "active",
    recommendedFor: "Children who understand the concepts and need speed, stability, and accuracy."
  },
  {
    id: "school_curriculum",
    title: "School Curriculum",
    description:
      "Future curriculum pathway organized by Slovak primary school cycles and parent-friendly grade navigation.",
    route: "/child/curriculum",
    status: "coming_soon",
    recommendedFor: "Future structured school math practice."
  }
] as const satisfies readonly LearningPathway[];

export function getLearningPathway(pathwayId: LearningPathway["id"]): LearningPathway {
  const pathway = LEARNING_PATHWAYS.find((item) => item.id === pathwayId);

  if (!pathway) {
    throw new Error(`Unknown learning pathway: ${pathwayId}`);
  }

  return pathway;
}
