# Slovak Math Curriculum Scaffold

This document describes the first architecture scaffold for Slovak primary school mathematics inside Math Visual Trainer.

## Scope

This is not a complete official curriculum map. The current data files define only a small starter set of modules so the app has a stable structure for future curriculum work.

No full lessons, exercises, diagnostics, or Firestore collections are added in this block.

## Cycles And Grades

The curriculum model separates official-oriented learning cycles from parent-friendly grade navigation.

Cycles are the primary structure:
- Cycle 1: grades 1 to 3
- Cycle 2: grades 4 to 5
- Cycle 3: grades 6 to 9

Grades are stored as recommended navigation hints. They should help parents find topics that match school expectations, but they should not hard-lock a child into one track.

## Areas And Modules

The scaffold has three initial learning areas:
- Numbers and operations
- Relations and data
- Geometry

Modules belong to a cycle, have recommended grades, list prerequisites, and can point to remediation pathways.

## Visual Arithmetic Remediation

Visual Arithmetic remains a separate core skills pathway. Curriculum modules can later link children back to visual arithmetic when a school topic exposes a weaker underlying concept.

For example, a child working on addition to 20 may need make-10 remediation before moving into faster fluency work.

## Future Recommendations

Later blocks can connect curriculum modules to diagnostics, topic mastery, mistake analysis, and parent recommendations.

The app should stay adaptive. A third-grade child may still need visual number sense support, and a younger child may be ready for selected fluency practice. Grade navigation should explain the school map, not become a rigid gate.
