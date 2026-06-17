---
type: directive
feature: "Vault Operations"
status: active
tags: [omnibrain, vault, memory, kdp]
---

# Vault Directives (Memory & Documentation)

## Core Observations

- Observation: The Dashboard is the session starting point.
- Observation: Important temporary work must be captured in `Vault/_inbox/` before context changes.
- Observation: The Knowledge Distillation Protocol moves durable truths from temporary notes into `Vault/System/` and `Vault/Features/`.
- Observation: Old plans are archived, not deleted.
- Observation: The framework must work in plain Markdown without a required plugin or vendor-specific tool.

## Session Start Protocol

When the user starts a session:

1. Read `Vault/Dashboard.md`.
2. Read the relevant MOC files.
3. Read `Vault/Definition_of_Done.md` and `Vault/Anti_Patterns.md`.
4. Load only the directive files needed for the current task.

## Knowledge Base Handshake Protocol

At the end of a task, present a short summary and ask:

> Would you like me to archive these notes and update the project knowledge base?

Only archive or distill knowledge after the user approves, unless the user has already delegated that exact maintenance task.

## Artifact Inbox Protocol

Before ending a session or switching tasks, save important notes in:

```text
Vault/_inbox/YYYY-MM-DD_HHMM_session-name/
```

Recommended files:

- `implementation_plan.md`
- `task_list.md`
- `walkthrough.md`
- `review.md`
- `handoff.md`

## Knowledge Distillation Protocol

1. Read the completed walkthrough or review.
2. Extract durable decisions, rules, and architecture facts.
3. Update the specific `Vault/System/` or `Vault/Features/` note.
4. Keep `Vault/Plans/` as history, not the source of truth.

## Archive Rules

- Use filenames like `YYYY-MM-DD_HHMM_Implementation_Plan_Feature_Name.md`.
- Keep frontmatter at the top of durable notes.
- Never delete older plans during normal work.
- Link to specific notes where possible.

## Project Isolation Rule

Agents and maintenance scripts must stay inside the local project workspace. Do not scan or modify sibling projects unless the human explicitly asks.
