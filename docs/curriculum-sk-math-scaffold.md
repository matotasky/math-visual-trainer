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
- Matematika PDF listed on the ministry page, dated 03.01.2024: `https://www.minedu.sk/data/att/490/28441.a209a3.pdf`
- Vzdelávanie 21 page as contextual implementation information: `https://vzdelavanie21.sk/novy-statny-vzdelavaci-program/`

Identifying the PDF is not the same as verifying module content. Later manual verification must compare each module against the mathematics standard before alignment claims are made.

The direct PDF URL is now stored in source metadata. This still does not verify module-level mapping.

## Official Cycle 1 Outline

The official Cycle 1 outline stores the three main content components listed for Cycle 1 in the mathematics PDF:

- Čísla a operácie s číslami
- Závislosti, vzťahy a práca s údajmi
- Geometria

These outline sections are separate from product modules. They provide a read-only scaffold for future manual mapping work and are visible in the parent/product verification page.

`mappingStatus: "not_mapped"` means product modules have not yet been manually mapped to the official component. It must not be interpreted as module verification or curriculum alignment.

Later verification work should compare each product module against the official mathematics PDF, decide which official component it belongs to, record evidence notes, and only then move mapping or verification statuses forward.

## Candidate Module-To-Official Mapping

Candidate mapping links draft product curriculum modules to official Cycle 1 outline sections. It is a product planning aid, not a verification result.

`candidate` means the product module appears to belong under an official outline component based on its draft scope. It does not mean the module is aligned with the Slovak curriculum, and it does not support public claims about official ŠVP alignment.

`confirmed` should only be used after manual comparison with the official mathematics PDF and after evidence notes explain what was checked.

`rejected` can be used later if manual review shows that a product module does not belong to a proposed official component.

The current scaffold keeps most module-to-official mappings as `candidate`. `quantity_and_number_sense` has a confirmed mapping with recorded evidence notes, but that still does not mark the module as verified.

## Manual Review Evidence

Manual review evidence rows prepare a place to record actual source references during future curriculum verification work.

Evidence rows should contain source quotes, page references, or review notes only after manual comparison with the official mathematics PDF. Do not add fake quotes, inferred evidence, or generic assumptions.

`sourcePageHint` is a future convenience field for locating evidence in the PDF. It should stay empty until a reviewer manually identifies a useful page, section, or table location.

`officialWordingReference` should contain exact manually checked wording or a safe source reference, not guesses or inferred wording.

`decisionRecommendation` remains `no_decision` until evidence is reviewed. It should not be used to imply verification by itself.

Review evidence is not the same as module verification. A module can have a review evidence row and still remain `source_identified`.

Statuses such as `verified`, `confirmed`, or `mapped` should only be used after evidence exists, the evidence has been reviewed, and the reviewer can explain what official source material supports the decision.

## Manual Review Checklist

Manual review checklist items guide a reviewer before evidence is recorded. They break a module review into smaller questions so future verification work can be careful and repeatable.

`open` means nothing has been reviewed yet. It is the only status used in the current scaffold.

`sourceReference` and `reviewerNote` must remain empty until a reviewer has manually compared the product module with the official mathematics PDF.

Checklist `sourcePageHint` and `officialWordingReference` follow the same rule: they are placeholders for real manual PDF references and must not contain guessed source text.

Checklist `decisionRecommendation` remains `no_decision` while the checklist item is still `open`.

`checked` should only be used after a reviewer has inspected the official source, added a real source reference, and written a reviewer note explaining the decision.

## Review Detail Pages

Review detail pages are read-only in the MVP. They help manual reviewers inspect a draft module, candidate mapping, review evidence, and checklist in one place.

They do not change module verification status, candidate mapping status, official outline mapping status, review evidence status, or checklist status.

They do not write to Firestore and do not implement editing in the MVP scaffold.

## First Recorded Evidence: `quantity_and_number_sense`

The first review evidence was recorded from the official mathematics PDF JSON for `quantity_and_number_sense`.

The evidence supports the candidate mapping to Cycle 1 numbers and operations, especially early number meaning, quantity, ordering, comparison, number line work, and multiple number representations.

This is not final verification. The module `verificationStatus` remains `source_identified`.

The module-to-official mapping remains `candidate` until a separate decision step confirms or rejects the mapping.

## First Confirmed Mapping: `quantity_and_number_sense`

The module-to-official mapping for `quantity_and_number_sense` was confirmed from the recorded review evidence.

Confirmed mapping is not the same as module verification. It only means the draft product module belongs under the official Cycle 1 numbers and operations component.

The module `verificationStatus` remains `source_identified`, and the official outline `mappingStatus` remains `not_mapped`.

Future content and lesson verification is still required before this module can be marked `verified`.

## Module Verification Decisions

Module verification decisions separate evidence and mapping from final verification.

`needs_lesson_content` means module scope or mapping can be supported, but the module cannot be verified until actual lesson and assessment content exists.

`source_identified` remains the module status until a later explicit verification update.

`approved_for_verification` should only be used after content evidence exists and lesson or assessment material has been manually compared with the official mathematics PDF.

## Public Wording Guardrails

Public wording must not claim full ŠVP alignment until modules and content are verified.

Confirmed mapping can be communicated only as mapping. It must not be described as final verification or official approval.

Visual Arithmetic remediation must be described as a product learning path, not an official curriculum requirement.

## Verification Progress Summary

The verification progress summary is computed from read-only scaffold data.

It helps product review by counting modules, recorded evidence, confirmed mappings, verification decisions, and wording guardrails.

The summary does not update statuses, write to Firestore, or create curriculum claims.

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
