---
type: directive
feature: "Staged Workflow"
status: active
tags: [omnibrain, workflow, planning]
---

# Staged Workflow

Use this workflow when a task is risky, large, unclear, or likely to affect several parts of the project.

Useful prompt:

```text
Let's do this in stages.
```

## Why This Exists

Large AI changes are safer when they are broken into small approved stages. Each stage should have a clear purpose, a review point, and a verification step.

## The Staged Workflow

### 1. Inspect

- Read the current project context.
- Check the existing state before changing anything.
- Note any failures or risks that already exist.

### 2. Scope One Stage

- Define what this stage will change.
- Define what this stage will not change.
- Keep the stage small enough to review.

### 3. Review The Plan

- Use the Architect or Code Reviewer checklist when relevant.
- Ask the human to approve the stage before implementation unless they already gave clear permission for this exact stage.

### 4. Implement Only The Approved Stage

- Do not mix in unrelated cleanup.
- Do not change public behavior unless it was part of the approved stage.

### 5. Verify

- Run the checks that fit the project.
- Report what was checked and what could not be checked.

### 6. Capture And Update Knowledge

- Save useful working notes to `Vault/_inbox/`.
- Archive approved artifacts into `Vault/Plans/`.
- Update `Vault/System/` or `Vault/Features/` only when future work needs the new truth.

### 7. Decide Next Step

- Continue to the next stage only after the current stage is reviewed.
- Stop if the human wants to pause, review, or change direction.

## Anti-Goals

- Do not turn small tasks into heavy process.
- Do not create long reports that nobody will use.
- Do not use this workflow to skip human approval for risky changes.
