---
type: workflow
status: active
tags: [workflow, planning, sdd]
---

# Feature Planning Workflow

This workflow governs feature scoping and planning. It uses the Spec-Driven Development (SDD) Pipeline to eliminate assumptions before code is written.

## Spec-Driven Development Pipeline
Before drafting code changes, you must follow these four steps:

### 1. Specify
- Identify the core user needs, business rules, and user flows.
- Document "what" we are building and "why" in a draft plan.

### 2. Clarify
- Identify any ambiguities, hidden assumptions, or edge cases.
- Ask the user explicit questions to resolve these before moving forward.
- **Wait for their feedback** before proceeding to the technical design.

### 3. Plan
- Define the exact file additions, modifications, or deletions needed.
- Define data structures, interfaces, and dependencies.
- Ensure the plan is structured for incremental, testable delivery.

### 4. Audit
- Audit the proposed plan against the project's Definition of Done (`Vault/Project/Definition_of_Done.md`).
- Ensure all relevant checks are addressed, and note any that are skipped.

## Staged Work Recommendation
If the planned feature is large, touches core logic, or involves high-risk database or styling modifications, recommend moving to the Staged Change workflow:
> "Let's do this in stages."
