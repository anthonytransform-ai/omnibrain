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
- Observation: Complex UI or logical refactors must go through the staged workflow before implementation.

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

## Staged Review Protocol
For any complex UI or logical refactor, read `Vault/OS/Staged_Workflow.md` before implementation.

1. **Scope One Stage:** Define what will change and what will not change.
2. **Review The Stage:** Use the `Code Reviewer` or `Architect` checklist when risk is meaningful.
3. **Confirm Approval:** Wait for human approval unless the human already delegated that exact stage.
4. **Implement Narrowly:** Apply only the approved stage.
5. **Verify:** Run the checks that fit the project before reporting completion.
