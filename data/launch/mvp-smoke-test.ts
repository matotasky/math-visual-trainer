export type MvpSmokeTestStatus = "ready" | "manual_check" | "blocked";

export type MvpSmokeTestItem = {
  id: string;
  label: string;
  route?: string;
  status: MvpSmokeTestStatus;
  notes: string;
};

export const mvpSmokeTestItems: MvpSmokeTestItem[] = [
  {
    id: "landing_page",
    label: "Landing page",
    route: "/",
    status: "ready",
    notes: "Public MVP entry with child and parent CTAs."
  },
  {
    id: "child_home",
    label: "Child home",
    route: "/child",
    status: "ready",
    notes: "Local profile, local progress summary, and preview path CTA."
  },
  {
    id: "child_curriculum",
    label: "Child curriculum",
    route: "/child/curriculum",
    status: "ready",
    notes: "Active number foundations path with five local-only lessons."
  },
  {
    id: "lesson_1_quantity",
    label: "Lesson 1 quantity",
    route: "/child/curriculum/quantity-and-number-sense",
    status: "ready",
    notes: "Local-only interactive preview lesson."
  },
  {
    id: "lesson_2_number_line",
    label: "Lesson 2 number line",
    route: "/child/curriculum/number-line-and-comparison",
    status: "ready",
    notes: "Local-only interactive preview lesson."
  },
  {
    id: "lesson_3_to_20",
    label: "Lesson 3 to 20",
    route: "/child/curriculum/addition-subtraction-to-20",
    status: "ready",
    notes: "Local-only interactive preview lesson."
  },
  {
    id: "lesson_4_make_10",
    label: "Lesson 4 make 10",
    route: "/child/curriculum/make-10-and-bridge-through-10",
    status: "ready",
    notes: "Local-only interactive preview lesson."
  },
  {
    id: "lesson_5_to_100",
    label: "Lesson 5 to 100",
    route: "/child/curriculum/addition-subtraction-to-100",
    status: "ready",
    notes: "Local-only interactive preview lesson."
  },
  {
    id: "parent_entry",
    label: "Parent entry",
    route: "/parent",
    status: "ready",
    notes: "Parent-facing public MVP entry with local profile summary."
  },
  {
    id: "internal_preview_path_index",
    label: "Internal preview path index",
    route: "/internal/preview-paths",
    status: "manual_check",
    notes: "Read-only developer/product overview. Must not be linked from child-facing UI."
  },
  {
    id: "official_curriculum_claims",
    label: "Official curriculum claims",
    status: "blocked",
    notes: "Do not claim full official SVP alignment until manual verification is complete."
  },
  {
    id: "account_dashboard_analytics",
    label: "Account dashboard analytics",
    status: "manual_check",
    notes: "Separate protected area; not part of local preview completion."
  }
];
