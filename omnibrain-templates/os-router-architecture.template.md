---
type: memory_architecture
feature: "Agent Operating System"
status: active
tags: [omnibrain, architecture, router]
---

# Agent OS Router Architecture

## Philosophy
OmniBrain uses an "Agent-First" memory architecture. To prevent context bloat and hallucination, agents do not carry the entire project's operational rules in their default prompt. Instead, they use a **Modular Router Pattern**.

The default prompt (`AGENT_PROMPT.md`) acts exclusively as an event router, tying specific conversational triggers and tasks to modular instruction files (Directives) located in this `OS/` directory.

## Directory Structure
- `System/`: Contains the architecture and design logic for the *application*.
- `OS/`: Contains the operational directives, protocols, and workflows for the *AI Agents*.

## Maintenance Guide
If you need to add new operational rules, coding guidelines, or agent instructions:
1. **Never** append them blindly to `AGENT_PROMPT.md` or prompt instructions.
2. Find the relevant Directive in this `OS/` folder and update it.
3. If a new domain of instructions is created, add it as a new modular file in this folder and add a single routing line to `AGENT_PROMPT.md`.

## Memory Checkpoints

Global prompts should say what kind of task is happening. The exact steps should live in the matching directive.

Use these checkpoints:

- Session start -> `Vault/OS/Vault_Directives.md`
- Feature planning -> `Vault/OS/Planning_Directives.md`
- Risky or multi-part work -> `Vault/OS/Staged_Workflow.md`
- Knowledge updates -> `Vault/OS/Knowledge_Format.md` and `Vault/OS/Vault_Directives.md`
- Coding and quality -> `Vault/OS/Coding_Directives.md`
- Review roles -> `Vault/OS/Subagent_Directives.md`

This keeps the main prompt small while still giving the AI a clear path to the right instructions.
