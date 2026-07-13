---
type: runtime_entry
status: active
tags: [runtime, boot, guided_workspace]
---

# Runtime Entry

This is the central boot controller for the OmniBrain vault.

## Session Start Protocol

When starting a session:
1. Read the project root `AGENTS.md`.
2. Read `Vault/Core_OS/Runtime/Entry.md`.
3. Read `Vault/Project/Current_State.md`.
4. Read `Vault/Project/System/_System_MOC.md`.
5. Read `Vault/Project/Features/_Features_MOC.md`.
6. Read `Vault/Core_OS/Registries/Workflow_Registry.md`.
7. Stop. Do not load every task, plan or detailed workflow during boot.

## Named Task Handling

When the user names a task:
1. Search `Vault/Work/Tasks/` for a matching filename.
2. Select the exact or closest matching task file.
3. If more than one plausible match exists, ask the user which one they mean.
4. Do not infer a different task.
5. Use that task Markdown file as the current working record.

## Minimum Sufficient Process

Choose the least complicated safe way to complete the task. Consider setup, execution, verification, future maintenance, handover, cleanup, time and AI usage. Add branches, documents, services, workflows or approval steps only when they reduce a real risk or coordination problem.

For ordinary work, use the current task file. Do not automatically create a separate plan, branch or independent review. Use validation proportionate to the change.

## Task Continuity

While working:
- keep "What happens next" current in the task note;
- record real user decisions;
- keep technical detail proportional;
- avoid extra plans or handoff files unless they solve a genuine need.

## Completion And Lasting Knowledge

When work is complete, ask:

> Is there anything from this task that should be kept as lasting project knowledge?

If the answer is no, leave the task as a working record and move it to Done or Archive only when instructed.

If the answer is yes, update the owning System or Feature document, preserve and enrich existing knowledge, and update the relevant index where needed. Archive the task only when instructed.

Completed task files are working records. They are not automatically permanent project knowledge.

## Workflow Expansion

When a workflow is required:
1. Match the user request against `Vault/Core_OS/Registries/Workflow_Registry.md`.
2. Load the matched workflow file from `Vault/Core_OS/Workflows/`.
3. Load only the project memory files linked in the System or Features MOCs that are relevant to the task.
4. Execute the workflow's specific steps.
5. Run validation checks when the workflow or risk level requires them.
