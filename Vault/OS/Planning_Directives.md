---
type: directive
feature: "Feature Planning"
status: active
tags: [omnibrain, planning, DoD, sdd]
---

# Planning Directives (Definition of Done)

## 📌 Core Observations
- Observation: All feature planning must follow the 4-step Spec-Driven Development (SDD) Pipeline: Specify, Clarify, Plan, Audit.
- Observation: The Coverage Audit acts as a checklist, not an absolute enforcement; irrelevant checks can be marked as skipped.

## 🔗 Relations
- Governs:: [[_System_MOC]]
- Instructs:: [[_Agents_MOC]]

Whenever you (the Primary AI) or the Architect Subagent are scoping out a new feature or auditing an implementation plan, you must strictly follow the **Spec-Driven Development (SDD) Pipeline** and ensure the project's Definition of Done is evaluated as a final execution checklist.

## Context Engineering (Pre-Flight)
Before any planning or implementation can begin, you MUST actively read the project's memory files: `Vault/Project_Context.md`, `Vault/Dashboard.md`, `Vault/Anti_Patterns.md`, the latest daily log if one exists, and relevant MOCs or architecture docs. This prevents context starvation and ensures you are aware of existing constraints before drafting a plan.

## Pre-Flight Identity Check
Before any significant planning or architecture work, you must output a confirmation block to prove you have correctly anchored to the project's technical context (read from `Vault/Dashboard.md`):

═══════════════════════════════════════
PRE-FLIGHT IDENTITY CHECK
═══════════════════════════════════════
Project:           [Project Name]
Tech Stack:        [Key Frameworks]
Database:          [DB Tech]
Deployment Target: [Hosting Platform]
Product Direction: [Short product goal]
═══════════════════════════════════════

If the values are missing or unclear, ask the user to clarify before proceeding.

## The Spec-Driven Development (SDD) Pipeline
All new features must be planned using the SDD methodology to prevent assumption-based "vibe coding."
1. **Specify**: Define the business rules and user flows (What & Why).
2. **Clarify**: Interrogate the user to resolve ambiguity and edge cases BEFORE planning the technical architecture. Wait for their response.
3. **Plan**: Define the exact architectural changes and data structures (How).
4. **Audit**: Run the QA checklist located in `Vault/Definition_of_Done.md` against the generated tasks.

## Staged Work Trigger

If a task is large, risky, unclear, or touches several parts of the project, route to `Vault/OS/Staged_Workflow.md` before implementation.

Useful prompt:

```text
Let's do this in stages.
```

## Knowledge Format Check

When a plan changes durable project memory, public documentation, product direction, MOCs, or daily-log expectations:

1. Identify the owning `Vault/System/` or `Vault/Features/` note.
2. Plan a preserve-then-enrich update instead of a broad rewrite.
3. Update the relevant MOC if the source of truth changes.
4. Capture validation, artifacts, and follow-ups in a daily log.
