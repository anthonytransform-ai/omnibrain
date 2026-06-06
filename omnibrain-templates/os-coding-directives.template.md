---
type: directive
feature: "Code Quality"
status: active
tags: [omnibrain, coding, rules]
---

# Coding Directives (Linter & Anti-Patterns)

## Banned Operations (Enforcement)
We enforce a strict "Never List" of anti-patterns across the codebase to ensure performance and cross-platform compatibility.

Before submitting any code for review or concluding a development task, you MUST run the automated checker:
`npm run check-ai-rules`

## Anti-Patterns
If you identify a bad practice or recurring architectural error, document it in `Vault/Anti_Patterns.md`. The linter will automatically parse this markdown file to enforce the rule.

If the human user corrects a recurring architectural mistake, proactively propose writing a new rule in `Vault/Anti_Patterns.md` to prevent yourself from making it again.
