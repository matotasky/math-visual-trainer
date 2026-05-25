# Math Visual Trainer

Math Visual Trainer is a zero-budget MVP for visual arithmetic learning. It uses Next.js App Router, TypeScript, Tailwind CSS, Firebase Authentication, and Firestore.

This first scaffold contains the repository architecture, documentation, shared types, Firebase abstraction, Firestore rules, and route skeletons. Feature screens are intentionally placeholders so the data model and product architecture stay stable before implementation.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Authentication with Google Sign-In
- Firestore
- Recharts
- React Hook Form
- Zod
- Lucide React

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add Firebase web app values to `.env.local`.

4. Run the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Firebase

Create a Firebase project on the free Spark plan, enable Google Sign-In, create a Firestore database, and deploy the rules from `firestore/firestore.rules`.

## Current Scope

Implemented in this scaffold:

- Project configuration
- Documentation in `docs/`
- App Router route skeletons
- Slovak-first localization with English fallback support
- Shared TypeScript domain types
- Central level and diagnostic data definitions
- Lazy Firebase client getters
- Auth provider shell
- Firestore service placeholders
- PIN hashing and gate placeholders
- Firestore rules and indexes

Not implemented yet:

- Full diagnostic flow
- Full practice/test/challenge flows
- Attempt persistence UI
- Parent analytics charts
- PIN settings UI
- Production-ready child profile management forms

## Architecture Notes

Firestore reads are planned around aggregate documents for dashboard views. Raw attempts are stored for detailed history only and must be paginated. Realtime listeners should be used sparingly and only where the UX clearly needs them.

Slovak is the default UI language. English is selected automatically for likely English-speaking visitors or manually through the SK/EN switcher.
