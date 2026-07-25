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
    id: "first_run_child_profile",
    label: "First-run child profile",
    route: "/child",
    status: "ready",
    notes: "Create optional browser-local child profile and continue without login."
  },
  {
    id: "continue_next_lesson_cta",
    label: "Continue next lesson CTA",
    route: "/child",
    status: "ready",
    notes: "Local preview summary links to the next incomplete lesson."
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
    id: "return_after_lesson_completion",
    label: "Return after lesson completion",
    route: "/child/curriculum?previewCompleted=1",
    status: "ready",
    notes: "Shows local-only completion notice and recommended next step."
  },
  {
    id: "parent_entry",
    label: "Parent entry",
    route: "/parent",
    status: "ready",
    notes: "Parent-facing public MVP entry with local profile summary."
  },
  {
    id: "local_data_page",
    label: "Local data page",
    route: "/about/local-data",
    status: "ready",
    notes: "Public explanation of browser-local profile and preview progress boundaries."
  },
  {
    id: "friendly_not_found",
    label: "Friendly 404",
    route: "/this-route-does-not-exist",
    status: "manual_check",
    notes: "Unknown route should show the Slovak 404 page with safe public links."
  },
  {
    id: "global_error_ui",
    label: "Global error UI",
    status: "manual_check",
    notes: "Reset UI must not expose details or send error data externally."
  },
  {
    id: "curriculum_loading_state",
    label: "Curriculum loading state",
    route: "/child/curriculum",
    status: "manual_check",
    notes: "Loading shell should render without writing progress or reading Firebase."
  },
  {
    id: "static_mvp_route_validation",
    label: "Static MVP route validation",
    status: "ready",
    notes: "Run npm run validate:mvp."
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
