---
type: workflow
status: active
tags: [workflow, staged_change]
---

# Staged Change Workflow

Use this workflow for large, risky, or complex architectural modifications.

Use the current task Markdown file under `Vault/Work/Tasks/` as the working record when the user has named a task. Keep "What happens next" current and avoid creating extra planning documents unless they reduce a real coordination risk.

## Process
1. **Scope One Stage:** Break down the overall change into small, reviewable, self-contained stages. Focus on one stage at a time.
2. **Review The Stage:** Use the review profiles (Code Reviewer, Architect, UI Designer) to audit the stage's design.
3. **Confirm Approval:** Wait for the user's explicit approval before writing code.
4. **Implement Narrowly:** Apply code changes *only* for the approved stage. Do not wander into future stages.
5. **Verify:** Run OmniBrain validations (`node omnibrain/scripts/check-ai-rules.js` and `node omnibrain/scripts/vault-health.js`) for this stage. Inspect the host application for its own test command or documented validation, run it only when relevant and safe, and do not assume a default npm test script.
6. **Obtain Feedback:** Show the results to the user, and wait for approval before moving to the next stage.
