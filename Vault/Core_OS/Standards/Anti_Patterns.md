---
type: registry
tags: [omnibrain, system, anti-patterns]
---

# Anti-Pattern Registry

This is the centralized "Never List" for the project. It documents banned architectural patterns, why they are banned, and the correct approach to use instead. 
Agents MUST review this registry during their MOC Pre-Flight checks.

## Active Linter Rules
The built-in `npm run check-ai-rules` script actively parses this list. 
To add a new rule, create a bullet point starting with `- [LINT]`. Place the exact code snippet or regex pattern you want to ban inside backticks, followed by the reason.

- [LINT] `\.scrollIntoView\(` : Breaks mobile scrolling physics.
- [LINT] `console\.log` : Example rule: do not leave console logs in production.
