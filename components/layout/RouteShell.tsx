import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RouteShellProps = {
  children: ReactNode;
  variant?: "public" | "child" | "parent";
};

export function RouteShell({ children, variant = "public" }: RouteShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen px-4 py-6 sm:px-6 lg:px-8",
        variant === "child" && "bg-sky-50",
        variant === "parent" && "bg-slate-50",
        variant === "public" && "bg-white"
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </main>
  );
}
