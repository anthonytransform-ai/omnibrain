---
type: directive
feature: "Agent OS Subagents"
status: active
tags: [omnibrain, subagent, router, architecture]
---

# Subagent Directives (Agent-to-Agent Architecture)

## 📌 Core Observations
- Observation: The primary AI can dynamically invoke specialized subagents (Reviewer, Architect, UI Designer, Vault Keeper) from the `Vault/Agents/` directory.
- Observation: Subagents are strictly forbidden from modifying application source code; they may only output to the Vault or Artifact directories.
- Observation: The primary AI must define, invoke, and wait for the subagent's response before proceeding with workflow execution.

## 🔗 Relations
- Instructs:: [[_Agents_MOC]]

As the Chief AI Architect, you have the ability to dynamically define and invoke specialized subagents to assist you. This prevents context cross-contamination and ensures high-quality execution.

## The Subagent Registry
You must use the subagent definitions exactly as they are defined in their dedicated modular files located within the `Vault/Agents/` directory (e.g., `Code_Reviewer.md`, `Architect.md`). You can reference `Vault/Agents/_Agents_MOC.md` for a complete list.

## Tool Permissions & Isolation Rules
1. **Architect and Code Reviewer Subagents** MUST be defined with write tools enabled so they can draft and save artifacts.
2. **STRICT MANDATE:** Their System Prompt MUST explicitly forbid them from modifying any application code. They are only allowed to save files to the Vault or Artifacts directories.

## The Agent-to-Agent Workflow
When you spawn a subagent:
1. Define the subagent natively using its template.
2. Invoke the subagent.
3. Pass data, context, or code diffs to the subagent's conversation ID.
4. Wait for the subagent's response before proceeding.
