export type LearningPathwayId =
  | "visual_arithmetic"
  | "arithmetic_fluency"
  | "school_curriculum";

export type LearningPathway = {
  id: LearningPathwayId;
  title: string;
  description: string;
  route: string;
  status: "active" | "coming_soon";
  recommendedFor: string;
};
