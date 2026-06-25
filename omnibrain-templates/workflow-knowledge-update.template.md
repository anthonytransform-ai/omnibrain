---
type: workflow
status: active
tags: [workflow, knowledge, distillation]
---

# Knowledge Update Workflow

This workflow governs how project knowledge is distilled and updated.

## Knowledge Distillation Protocol
When the user approves updating project knowledge:
1. **Read Sources:** Read the approved implementation plans, walkthroughs, or daily notes from the completed task.
2. **Identify Targets:** Locate the owning document under `Vault/Project/System/` or `Vault/Project/Features/`. If none exists, create a new one and register it in the appropriate MOC.
3. **Preserve then Enrich:**
   - Avoid wiping out existing document histories or definitions.
   - Append or merge new facts, rules, or system details.
4. **Update MOCs:** If a new document was created, update the corresponding `_System_MOC.md` or `_Features_MOC.md`.
5. **Clean Up Inbox:** Move temporary draft notes from `Vault/Project/_inbox/` into the `Vault/Project/Plans/` archive folder.
6. **Log Activity:** Ensure a daily log entry exists in `Vault/Project/Daily_Logs/` capturing a summary of what changed.
