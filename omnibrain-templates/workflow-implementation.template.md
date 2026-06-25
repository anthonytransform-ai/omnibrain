---
type: workflow
status: active
tags: [workflow, implementation, coding]
---

# Implementation Workflow

This workflow governs active development and coding tasks.

## Pre-Flight Check
Before writing any code, execute the pre-flight checks:
1. Ensure the user has approved the plan or stage.
2. Load any architectural rules from `Vault/Core_OS/Standards/Anti_Patterns.md` to avoid banned practices.

## Doubt-Driven Development
Before writing complex or non-trivial logic:
1. Run a "fresh-context" mental simulation of your proposed code.
2. Interrogate your own design: What could fail? Where is state duplicated? Is there a simpler approach?
3. Avoid "vibe coding" — ensure every line has a clear purpose and handles edge cases.

## Incremental Coding
1. Write the minimum amount of code to achieve the goal.
2. Run the lint rule checker regularly:
   `npm run check-ai-rules`
3. Run the vault health check to verify links:
   `npm run vault-health`
4. If tests exist, run the test suite:
   `npm test`

## Post-Implementation Handshake
Once verified, summarize changes made and ask:
> "Would you like me to archive these notes and update the project knowledge base?"
