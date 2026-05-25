export const AUTH_ROUTES = {
  login: "/login",
  landing: "/landing",
  childHome: "/child",
  diagnostic: "/child/diagnostic",
  parentChildren: "/parent/children",
  parentPin: "/parent/pin",
  parentDashboard: "/parent/dashboard"
} as const;

export function getLoginRedirect(nextPath?: string): string {
  return nextPath ? `${AUTH_ROUTES.login}?next=${encodeURIComponent(nextPath)}` : AUTH_ROUTES.login;
}
