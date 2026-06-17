---
type: directive
feature: "Code Quality"
status: active
tags: [omnibrain, coding, rules]
---

# Coding Directives (Linter & Anti-Patterns)

## 📌 Core Observations
- Observation: The automated checker (`npm run check-ai-rules`) must be executed before submitting any code for review.
- Observation: Discovered bad practices must be permanently documented in `Vault/Anti_Patterns.md` to prevent recurrence.
- Observation: Complex UI or logical refactors must go through the Safe Refactor Protocol (drafting changes, waiting for Reviewer approval) before writing to disk.

## 🔗 Relations
- Governs:: [[_System_MOC]]

## Banned Operations (Enforcement)
We enforce a strict "Never List" of anti-patterns across the codebase to ensure performance and cross-platform compatibility.

Before submitting any code for review or concluding a development task, you MUST run the automated checker:
`npm run check-ai-rules`

## Anti-Patterns
If you identify a bad practice or recurring architectural error, document it in `Vault/Anti_Patterns.md`. The linter will automatically parse this markdown file to enforce the rule.

If the user corrects a recurring architectural mistake, proactively propose writing a new rule in `Vault/Anti_Patterns.md` to prevent yourself from making it again.

## Doubt-Driven Development
Before writing non-trivial or complex logic, you MUST execute an adversarial "fresh-context" review of your own proposed logic. Double-check your assumptions, edge cases, and architectural constraints. Do not blindly write code without challenging your initial approach.

## The Safe Refactor Protocol (Agent-to-Agent Loop)
For any complex UI or logical refactor (typically edits exceeding 50 lines or structural changes), you are FORBIDDEN from immediately writing the code to the disk.

1. **Draft the Changes:** Prepare the exact code edits you plan to make.
2. **Summon the Reviewer:** Ensure the `Code Reviewer` subagent is active.
3. **Send the Diff:** Pass the Before/After Diff to the Reviewer subagent.
4. **Wait for Approval:** Do NOT write the changes to the disk until the Reviewer replies with an explicit "Approval". If rejected, address their feedback and resubmit the diff.
