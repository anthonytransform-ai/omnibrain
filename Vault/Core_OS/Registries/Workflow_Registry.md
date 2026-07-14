---
type: workflow_registry
status: active
tags: [registry, workflow, routing]
---

# Workflow Registry

Match the user task or intent to load the correct workflow. Do not load workflow files until the intent is matched.

| User Intent or Task | Active Workflow | Purpose |
| :--- | :--- | :--- |
| Plan a feature or substantial change | `Vault/Core_OS/Workflows/Feature_Planning.md` | Define scope, assumptions, approach, and acceptance criteria using Spec-Driven Development |
| Implement an approved change | `Vault/Core_OS/Workflows/Implementation.md` | Make the smallest coherent change, apply Doubt-Driven Development, and run validations |
| Handle a large or high-risk change | `Vault/Core_OS/Workflows/Staged_Change.md` | Work through defined stages with user review and approval points |
| Update project knowledge base | `Vault/Core_OS/Workflows/Knowledge_Update.md` | Distill approved walkthroughs/notes into durable project memory |
| Review code or architecture | `Vault/Core_OS/Workflows/Review.md` | Review boundaries, quality, and risks using specialized profiles |
| OmniBrain Quick Calls | `Vault/Core_OS/Runtime/Entry.md` | Route short conversational calls by intent without exact-string parsing |
| `Keep as knowledge.` | `Vault/Core_OS/Workflows/Knowledge_Update.md` | Preserve approved lasting learning in the owning project knowledge document |
