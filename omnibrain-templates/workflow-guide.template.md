# OmniBrain Workflow Guide

## Daily Operations
1. **Start the Session**: The AI reads `Vault/Dashboard.md`, `Vault/Project_Context.md`, the latest daily log, and the relevant maps.
2. **Plan**: The AI uses the planning directives and asks for clarification before large work.
3. **Stage Risky Work**: For broad or risky changes, the AI uses `Vault/OS/Staged_Workflow.md`.
4. **Capture Artifacts**: Useful plans, reviews, and handoffs go into `Vault/_inbox/` before they are archived.
5. **Update Knowledge**: Approved durable truths are added to the right `Vault/System/` or `Vault/Features/` note.

## AI Directives
- **Never ask the Human to run terminal commands.** (e.g., `git commit`, `npm install`). You are the AI Manager, run them yourself.
- **Never guess architectural rules.** If a rule is missing, ask the Human to make a decision, then document it in the Vault.
- **Never treat temporary notes as permanent truth.** Archive approved artifacts first, then preserve and enrich durable knowledge.
