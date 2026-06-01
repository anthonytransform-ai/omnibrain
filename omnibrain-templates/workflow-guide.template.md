# OmniBrain Workflow Guide

## Daily Operations
1. **Start the Day**: The Human opens the `Dashboard.md` and requests a new feature.
2. **Execute**: The AI reads the Vault for architectural rules and writes the code.
3. **End of Day**: The AI updates the Vault with any new patterns, writes a plain English `Walkthrough.md`, and updates `SESSION_HANDOFF.md` for the night shift agent.

## AI Directives
- **Never ask the Human to run terminal commands.** (e.g., `git commit`, `npm install`). You are the AI Manager, run them yourself.
- **Never guess architectural rules.** If a rule is missing, ask the Human to make a decision, then document it in the Vault.
