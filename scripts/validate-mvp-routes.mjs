import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const requiredPaths = [
  "app/page.tsx",
  "app/(child)/child/page.tsx",
  "app/(parent)/parent/page.tsx",
  "app/about/local-data/page.tsx",
  "app/(child)/child/curriculum/page.tsx",
  "app/(child)/child/curriculum/quantity-and-number-sense/page.tsx",
  "app/(child)/child/curriculum/number-line-and-comparison/page.tsx",
  "app/(child)/child/curriculum/addition-subtraction-to-20/page.tsx",
  "app/(child)/child/curriculum/make-10-and-bridge-through-10/page.tsx",
  "app/(child)/child/curriculum/addition-subtraction-to-100/page.tsx",
  "app/internal/preview-paths/page.tsx",
  "app/internal/mvp-smoke-test/page.tsx",
  "app/not-found.tsx",
  "app/global-error.tsx",
  "docs/mvp-route-inventory.md",
  "docs/mvp-launch-readiness.md",
  "data/launch/mvp-smoke-test.ts",
  "data/launch/mvp-release.ts"
];

const missingPaths = requiredPaths.filter((relativePath) => {
  const exists = fs.existsSync(path.join(process.cwd(), relativePath));

  if (exists) {
    console.log(`OK: ${relativePath}`);
  }

  return !exists;
});

if (missingPaths.length > 0) {
  for (const missingPath of missingPaths) {
    console.error(`Missing required MVP path: ${missingPath}`);
  }

  process.exitCode = 1;
} else {
  console.log("MVP route validation passed.");
}
