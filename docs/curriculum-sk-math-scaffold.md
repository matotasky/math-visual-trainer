# Slovak Math Curriculum Scaffold

This document describes the current architecture scaffold for Slovak primary school mathematics inside Math Visual Trainer.

## Scope

This is not a complete official curriculum map. It is a working product scaffold that gives the app a stable module structure for future curriculum work.

No full lessons, exercises, diagnostics, Firestore collections, or official curriculum claims are added in this block.

## Cycles And Grades

The curriculum model separates official-oriented learning cycles from parent-friendly grade navigation.

Cycles are the primary structure:
- Cycle 1: grades 1 to 3
- Cycle 2: grades 4 to 5
- Cycle 3: grades 6 to 9

Grades are stored as recommended navigation hints. They help parents find topics that match school expectations, but they should not hard-lock a child into one track.

## Areas And Modules

The scaffold has three initial learning areas:
- Numbers and operations
- Relations and data
- Geometry

Modules belong to a cycle, have recommended grades, list prerequisites, can point to remediation pathways, and may include skill tags.

## Expanded Cycle 1 Draft Modules

Numbers and operations:
- Quantity and number sense
- Number line and comparison
- Addition and subtraction to 20
- Make 10 and bridge through 10
- Addition and subtraction to 100
- Multiplication as groups
- Division as sharing
- Word problems for cycle 1
- Number patterns for cycle 1

Relations and data:
- Basic data tables
- Patterns and sequences for cycle 1
- Simple charts for cycle 1

Geometry:
- Shapes and measurement intro
- Plane shapes for cycle 1
- Solids and spatial orientation
- Length, mass, time, and money intro
- Symmetry intro

## Source Notes

Each Cycle 1 module can include:

`sourceNote: "Draft scaffold aligned with Slovak Cycle 1 math structure. Not a complete official curriculum map."`

The note exists so future UI, exports, or parent-facing explanations can distinguish draft scaffolding from verified curriculum content.

## Visual Arithmetic Remediation

Visual Arithmetic remains a separate core skills pathway. Curriculum modules can later link children back to visual arithmetic when a school topic exposes a weaker underlying concept.

For example, a child working on addition to 100 may still need make-10 remediation before moving into faster fluency work.

Arithmetic Fluency also remains separate. It supports accuracy, response stability, and automation after the visual concept is understood.

## Future Verification

Official verification will happen in a later block. Before the app makes public claims about alignment with the Slovak national curriculum, the module map and content must be validated against official Slovak curriculum documents.

Until that verification is complete, all curriculum UI should use language such as scaffold, draft, preview, planned, or coming soon.

## Adaptive Grade Philosophy

The app should stay adaptive. A third-grade child may still need visual number sense support, and a younger child may be ready for selected fluency practice. Grade navigation should explain the school map, not become a rigid gate.
