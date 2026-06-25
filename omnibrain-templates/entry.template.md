---
type: runtime_entry
status: active
tags: [runtime, boot]
---

# Runtime Entry

This is the central operating boot controller for the OmniBrain vault.

## Session Start Protocol
When starting a session or receiving a task:
1. Read the Project root `AGENTS.md` (the workspace bootstrap).
2. Read `Vault/Core_OS/Runtime/Entry.md` (this entry).
3. Read `Vault/Project/Current_State.md`.
4. Read `Vault/Project/System/_System_MOC.md`.
5. Read `Vault/Project/Features/_Features_MOC.md`.
6. Read `Vault/Core_OS/Registries/Workflow_Registry.md`.
7. Stop. Do not load detailed planning, implementation, or standards files until a workflow requires them.

## Task Expansion & Workflow Execution
1. Match the user request or task against the triggers in `Vault/Core_OS/Registries/Workflow_Registry.md`.
2. Load the matched workflow file from `Vault/Core_OS/Workflows/`.
3. Load only the specific project memory files linked in the System or Features MOCs that are relevant to the task.
4. Execute the workflow's specific steps.
5. Conclude by running validation checks if required by the workflow.
