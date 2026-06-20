---
type: directive
feature: "Vault Operations"
status: active
tags: [omnibrain, vault, memory, kdp]
---

# Vault Directives (Memory & Documentation)

## Core Observations

- Observation: The Dashboard is the session starting point.
- Observation: `Project_Context.md`, the latest daily log, and MOCs keep the AI anchored before major work.
- Observation: Important temporary work must be captured in `Vault/_inbox/` before context changes.
- Observation: The Knowledge Distillation Protocol moves durable truths from temporary notes into `Vault/System/` and `Vault/Features/`.
- Observation: Old plans are archived, not deleted.
- Observation: The framework must work in plain Markdown without a required plugin or vendor-specific tool.

## Session Start Protocol

When the user starts a session:

1. Read `Vault/Dashboard.md`.
2. Read `Vault/Project_Context.md`.
3. Read the latest note in `Vault/Daily_Logs/`, if one exists.
4. Read the relevant MOC files.
5. Read `Vault/Definition_of_Done.md` and `Vault/Anti_Patterns.md`.
6. Load only the directive files needed for the current task.

If the task changes user-facing behavior, product direction, onboarding, or design, also read `Vault/System/Product_Vision.md`.

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

When the user says "Please update the project knowledge":

1. Read the approved walkthrough, review, plan, or handoff.
2. Extract durable decisions, rules, and architecture facts.
3. Preserve then enrich the specific `Vault/System/` or `Vault/Features/` note that owns the topic.
4. Update MOCs if the source of truth or read order changed.
5. Add a short daily-log note when the work was meaningful.
6. Keep `Vault/Plans/` as history, not the source of truth.

Use `Vault/OS/Knowledge_Format.md` for the detailed knowledge maintenance rules.

## Archive Rules

- Use filenames like `YYYY-MM-DD_HHMM_Implementation_Plan_Feature_Name.md`.
- Keep frontmatter at the top of durable notes.
- Never delete older plans during normal work.
- Link to specific notes where possible.

## Artifact Mirroring

Some AI tools create useful notes in hidden or temporary places. If the user approves saving them, copy the useful content into `Vault/_inbox/` or `Vault/Plans/` before the tool loses context.

Do not depend on any specific AI platform's artifact folder. Ask the user for the artifact text or file location when the AI cannot access it directly.

## Project Isolation Rule

Agents and maintenance scripts must stay inside the local project workspace. Do not scan or modify sibling projects unless the human explicitly asks.
