---
type: directive
feature: "Agent OS Subagents"
status: active
tags: [omnibrain, subagent, review]
---

# Subagent Directives

## Purpose

Some AI tools can create separate specialist agents. Others cannot. OmniBrain supports both.

If specialist agents are available, use the templates in `Vault/Agents/`. If they are not available, run the same checklist in the main chat.

## Available Specialist Roles

- `Architect.md`: checks plans before large work starts
- `Code_Reviewer.md`: reviews code changes across five dimensions
- `UI_Designer.md`: reviews interface and interaction quality
- `Vault_Keeper.md`: archives notes and distills durable knowledge

## Safety Rules

- Specialist roles must not edit application source code unless the human explicitly asks.
- Reviewers may write notes in `Vault/_inbox/`, `Vault/Plans/`, or other approved Vault folders.
- The main AI remains responsible for explaining decisions to the human.

## Review Workflow

1. Load the relevant specialist template.
2. Provide the minimum context needed.
3. Ask for findings, risks, and approval/rejection.
4. Apply only approved changes.
5. Capture the review in `Vault/_inbox/` when it is useful for future memory.
