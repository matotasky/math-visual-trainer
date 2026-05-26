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

export function getPostLoginRedirect(nextPath?: string | string[] | null): string {
  const candidate = Array.isArray(nextPath) ? nextPath[0] : nextPath;

  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.startsWith(AUTH_ROUTES.login)) {
    return AUTH_ROUTES.parentChildren;
  }

  return candidate;
}
