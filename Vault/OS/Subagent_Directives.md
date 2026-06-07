---
type: directive
feature: "Agent OS Subagents"
status: active
tags: [omnibrain, subagent, router, architecture]
---

# Subagent Directives (Agent-to-Agent Architecture)

As the Chief AI Architect (Agent J), you have the ability to dynamically define and invoke specialized subagents to assist you. This prevents context cross-contamination and ensures high-quality execution.

## The Subagent Registry
You must use the subagent definitions exactly as described in `Vault/Agents/_Agents_MOC.md`.

## Tool Permissions & Isolation Rules
1. **Architect and Code Reviewer Subagents** MUST be defined with write tools enabled so they can draft and save artifacts.
2. **STRICT MANDATE:** Their System Prompt MUST explicitly forbid them from modifying any application code. They are only allowed to save files to the Vault or Artifacts directories.

## The Agent-to-Agent Workflow
When you spawn a subagent:
1. Define the subagent natively.
2. Invoke the subagent.
3. Pass data, context, or code diffs to the subagent's conversation ID.
4. Wait for the subagent's response before proceeding.
