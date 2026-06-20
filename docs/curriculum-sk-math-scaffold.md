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

## Identified Official Documents

The current metadata identifies these source pages and documents for future manual verification:

- Ministry ŠVP 2023 page: `https://www.minedu.sk/statny-vzdelavaci-program-pre-zakladne-vzdelavanie/`
- Ministry Matematika a informatika page: `https://www.minedu.sk/matematika-a-informatika/`
- Matematika PDF listed on the ministry page, dated 03.01.2024
- Vzdelávanie 21 page as contextual implementation information: `https://vzdelavanie21.sk/novy-statny-vzdelavaci-program/`

Identifying the PDF is not the same as verifying module content. Later manual verification must compare each module against the mathematics standard before alignment claims are made.

The direct PDF URL should be confirmed when possible. Until then, the PDF metadata points to the Ministry Matematika a informatika page where the PDF is listed.

## Official Verification Workflow

Modules currently remain a scaffold. The verification metadata tracks how far each module has moved toward official alignment, but it does not turn the draft map into a certified curriculum implementation.

Verification statuses:
- `draft`: internal draft with no source mapping work completed
- `source_identified`: official source pages are known, but the module is not fully verified
- `partially_verified`: part of the module has been manually compared with official materials
- `verified`: the module has been manually checked against the official mathematics standard

`source_identified` means that official source pages are stored as metadata. It does not mean the module title, scope, prerequisites, or future lesson content are fully verified.

`verified` should only be used after manual comparison with the official mathematics standard and related Slovak curriculum documents.

Public marketing claims must not say that Math Visual Trainer is fully aligned with ŠVP or the Slovak national curriculum until the relevant modules and content have been verified.

## Manual Verification Matrix

The manual verification matrix exists to avoid accidental false alignment claims. It gives every Cycle 1 draft module a structured row for manual review against the identified official sources.

Each row tracks:
- module id
- cycle and area
- current verification status
- source references
- manual checks still needed
- evidence notes
- public claim risk
- next action

High-risk modules should be manually checked before any public-facing wording suggests curriculum alignment. This is especially important for broad areas such as word problems, data, geometry, measurement, and cross-topic reasoning.

`evidenceNotes` must be filled only after manual comparison with official documents. Notes should record what was checked, where the evidence appears, and what wording is safe to show.

`verificationStatus` should stay `source_identified` until manual review is complete. Do not move a module to `partially_verified` or `verified` based on assumptions, module names, or general curriculum familiarity.

## UI Separation

The child-facing school curriculum page should stay simple, encouraging, and non-technical. It can show cycles, draft module previews, planned status, recommended grades, and remediation pathways, but it should not show source URLs, verification workflow counters, public claim risk, or other internal metadata.

Verification details live in the parent/product UI at `/parent/curriculum-verification`. That page is read-only scaffold data for now. It exists to help product review and future manual curriculum verification without turning the child experience into an internal checklist.

The verification matrix and source metadata are not editable from the app and do not write to Firestore in the MVP scaffold.

## Visual Arithmetic Remediation

Visual Arithmetic remains a separate core skills pathway. Curriculum modules can later link children back to visual arithmetic when a school topic exposes a weaker underlying concept.

For example, a child working on addition to 100 may still need make-10 remediation before moving into faster fluency work.

Arithmetic Fluency also remains separate. It supports accuracy, response stability, and automation after the visual concept is understood.

## Future Verification

Official verification will happen in a later block. Before the app makes public claims about alignment with the Slovak national curriculum, the module map and content must be validated against official Slovak curriculum documents.

Until that verification is complete, all curriculum UI should use language such as scaffold, draft, preview, planned, or coming soon.

## Adaptive Grade Philosophy

The app should stay adaptive. A third-grade child may still need visual number sense support, and a younger child may be ready for selected fluency practice. Grade navigation should explain the school map, not become a rigid gate.
