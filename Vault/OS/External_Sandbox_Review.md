---
type: directive
feature: "External Sandbox Review"
status: active
tags: [omnibrain, review, sandbox]
---

# External Sandbox Review

## Purpose

Sometimes an outside AI service or automated check can review the project in a clean environment and suggest fixes or tests. OmniBrain treats this as optional help, not as a required vendor or platform.

## What An External Reviewer Can Do

- inspect code from a shared repository
- run tests in an isolated environment
- suggest fixes
- suggest or add tests
- report risks in plain English

## Important Boundary

External review output is advice. The main AI assistant must still:

1. compare suggestions against the project rules
2. reject unsafe or irrelevant changes
3. explain the recommendation to the human
4. get approval before large changes

## Vendor-Neutral Rule

Do not require a specific AI company, cloud platform, editor, or coding assistant. If the user's tool cannot run external review, skip this capability and continue with the normal review checklist.
