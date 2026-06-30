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

## Lesson Blueprints

Lesson blueprints are draft product planning artifacts. They describe possible lesson flow, learning goal, prerequisites, and step intent for future curriculum lessons.

They are not child-facing in the MVP, are not wired into the learning engine, and are not verified curriculum content.

Before release, each lesson blueprint must be manually reviewed against recorded source evidence and the official mathematics PDF. The presence of a blueprint does not move a module to `partially_verified` or `verified`.

## Assessment Blueprints

Assessment blueprints are draft item plans for future checks, diagnostics, or module assessments.

They are not connected to diagnostic scoring, mastery logic, or Firestore attempt persistence. Misconception probes in these files are product hypotheses until reviewed.

Assessment items must be manually reviewed before they become child-facing or affect progression.

## Blueprints And Verification

Blueprint existence does not change `verificationStatus`.

A module should only become `verified` after lesson content and assessment content have evidence, review notes, and an explicit verification decision. For `quantity_and_number_sense`, the module remains `source_identified` even though a lesson blueprint and assessment blueprint now exist.

## Blueprint Review Evidence

Blueprint review evidence is separate from module-level evidence.

Module-level evidence can support the general curriculum scope, but lesson and assessment blueprint content needs its own review evidence before it can move toward release.

`evidence_needed` means the blueprint must not become child-facing. It signals that final examples, wording, prompts, and any remediation or misconception language still need manual review.

Lesson blueprint evidence should check whether each lesson step is supported by the recorded source evidence and whether the child-facing draft wording avoids overclaiming official curriculum alignment.

Assessment blueprint evidence should check whether item intents match recorded evidence, whether prompts are age-appropriate, and whether misconception probes are treated as product hypotheses until reviewed.

## Blueprint Readiness Gates

Blueprint readiness gates prevent accidental child-facing release.

`blocked` means a lesson blueprint is not ready for child preview and an assessment blueprint is not ready for diagnostic or scoring use.

Gates are read-only scaffold data. They do not write to Firestore, do not change `verificationStatus`, do not change blueprint status, and do not imply official verification.

Readiness can move forward only after explicit review evidence is recorded and a later implementation block intentionally changes the relevant gate or blueprint status.

## Diagnostics Boundary

Assessment blueprints are not diagnostic scoring logic.

They are draft item plans and must remain disconnected from diagnostic scoring, mastery calculation, Firestore attempts, and child progression until a later explicit scoring or diagnostic implementation step.

No assessment blueprint item should influence child placement, parent analytics, or progression without a separate implementation and review pass.

## Internal Previews

Internal previews are for parent/product review only.

They provide a compact way to inspect how draft lesson steps and draft assessment items might look conceptually, but they are not child-facing, not scored, and not verified lesson content.

Internal previews should not be linked from general child curriculum navigation until a later explicit release step changes the relevant gates and implementation.

The presence of an internal preview does not mean the lesson is ready, the assessment can be scored, or the curriculum module is verified.

## Visible Child Preview

The first visible child preview route is `/child/curriculum/quantity-and-number-sense`.

This route can be opened directly for internal and manual testing. It is visible, but it is read-only and clearly labeled as a preview lesson.

The visible child preview:
- does not score
- does not write to Firestore
- does not update mastery or progression
- does not connect assessment blueprint items to diagnostic scoring
- does not mean the module is verified
- does not change blueprint status, readiness gates, release plan status, or module verification status

The route is linked only from the parent/product verification detail page for `quantity_and_number_sense`. It is not linked from the general child curriculum navigation yet.

The preview guard intentionally allows rendering while blocking scoring, progress writes, and verified claims.

## Interactive Preview Boundary

The visible child preview can use local React state for simple manual testing.

Interactive preview activities may show local feedback after button clicks, but they must not persist attempts, create sessions, update aggregates, update mastery, or write to Firestore.

The preview does not score diagnostics and does not affect parent dashboard data.

Interactive prompts are for manual testing only. They are not assessment items, are not connected to diagnostic scoring, and do not change module verification status.

## First Linked Child Preview

`quantity_and_number_sense` is the first curriculum module linked from the child curriculum page.

It remains a preview learning activity, not a scored lesson, test, diagnostic, or verified ŠVP-aligned lesson.

The preview has a local completion flow so the child can finish the mini-module activities and see a friendly completion message.

Completion persistence is intentionally local-only for now. It does not write attempts, sessions, aggregates, mastery, streaks, or parent dashboard data.

If persistence is added later, it should be saved as preview-only learning completion and must not affect diagnostic scoring, mastery, or curriculum verification claims.

## First Interactive Mini-Module

The first linked lesson now behaves like a small local-only mini-module with six activities.

It shows one activity at a time, uses Back/Next navigation, and tracks local completion as `Hotové: X / 6`.

The activities cover quantity recognition, comparison, same quantity in different layouts, number after, number before, and a reflection step.

All state stays in local React state. The module does not persist completion, score diagnostics, update mastery, create attempts, create sessions, update aggregates, or affect parent dashboard data.

## Second Interactive Mini-Module

`number_line_and_comparison` is the second linked child curriculum preview lesson.

It has six local-only activities covering number line position, bigger/smaller comparison, ordering, before/after neighbors, and a reflection step.

It does not persist completion, score diagnostics, update mastery, create attempts, create sessions, update aggregates, or affect parent dashboard data.

The module remains preview content, not verified curriculum content.

## Third Interactive Mini-Module

`addition_subtraction_to_20` is the third linked child curriculum preview lesson.

It has six local-only activities introducing joining groups, number-line addition, taking away, number-line subtraction, make-10 thinking, and a reflection step.

It does not persist completion, score diagnostics, update mastery, create attempts, create sessions, update aggregates, or affect parent dashboard data.

The module remains preview content, not verified curriculum content.

## First Child Learning Path

The child curriculum page now shows a three-step local-only preview path.

The path links the first three preview mini-modules: `quantity_and_number_sense`, `number_line_and_comparison`, and `addition_subtraction_to_20`.

This path is a child-friendly navigation aid. It does not represent verified curriculum progression and must not be described as official ŠVP sequencing.

It does not persist account progress, score diagnostics, update mastery, create attempts, create sessions, update aggregates, or affect parent dashboard data.

## Child-Facing Cycle Wording

Cycles may be shown in child-facing curriculum UI, but they must be explained as broader learning stages.

The UI should not make cycles look like equal-length blocks or hard grade locks. Cycle labels and grade ranges are orientation aids for parents and children.

Child-facing wording must not imply official verified sequencing or full ŠVP alignment.

The preview learning path is practical navigation only. It does not represent verified curriculum progression.

No progress, scoring, mastery, Firestore, sessions, attempts, aggregates, or parent dashboard behavior is changed by cycle wording.

## Local Preview Progress

Completed preview lessons in the first child learning path are stored only in browser `localStorage`.

This is not account progress, Firestore data, diagnostic scoring, mastery, progression, attempts, sessions, aggregates, or parent dashboard data.

The local progress can disappear when browser storage is cleared or when the child uses another browser or device.

This exists only as a lightweight UX helper for private/manual MVP testing of the preview mini-modules.

## Preview Completion Navigation

Next-step navigation for the first preview learning path is shown only after the child completes a mini-module locally and clicks `Dokončiť lekciu`.

The completion action can mark the preview lesson complete in browser `localStorage`, then show the next recommended lesson or the return-to-path action.

This remains local-only. It does not write to account progress, Firestore, diagnostics, mastery, sessions, attempts, aggregates, or parent dashboard data.

## Internal Preview Safety Checks

Internal preview safety checks record whether specific release risks are currently satisfied, blocked, or need attention.

`blocked` checks prevent accidental release and must stop child-facing or diagnostic use.

`warning` checks identify wording or product risks that need manual review before release.

`pass` does not mean the module or content is verified. It only means one specific safety condition is currently satisfied.

## Release Boundary

Internal previews do not change lesson blueprint status, assessment blueprint status, readiness gate status, module verification status, or module mapping status.

They also do not write to Firestore and do not connect assessment items to diagnostic scoring.

Child-facing release requires a later explicit release implementation block. Until then, internal preview data must stay inside parent/product verification UI.

## Internal Preview Review Resolutions

Internal preview review resolutions record product-review findings after an internal preview exists.

`issues_recorded` means the preview has been reviewed enough to capture useful findings, open issues, and release blockers. It does not mean the preview is ready for children.

Accepted findings can confirm that the internal preview is useful for product planning. Open issues and release blockers must remain visible until a later block explicitly resolves them.

Resolution data is read-only scaffold data. It does not change blueprint readiness gates, lesson or assessment blueprint status, module verification status, mapping status, or child-facing behavior.

## Child-Facing Release Plans

Child-facing release plans are planning artifacts only.

`plannedRoute` describes where a future child-facing shell might live, but the route must not be created, linked, or enabled by the release plan itself.

`mustRemainDisabled` protects against accidental route creation or linking while lesson wording, visual examples, readiness gates, and public wording are still unresolved.

Release plans do not write to Firestore, do not connect assessment content to diagnostic scoring, and do not make curriculum content visible to children.

## Release Discipline

`ready_for_internal_review` is not the same as `ready_for_child_preview`.

Internal review can continue while child release remains blocked. A child-facing release requires a later explicit implementation block that creates or links a route on purpose.

Diagnostic scoring, mastery progression, Firestore attempt writes, and child-facing curriculum navigation remain out of scope for internal preview and release-plan scaffold work.

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
