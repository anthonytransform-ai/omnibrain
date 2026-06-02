# Agents MOC (Map of Content)

This document tracks the different AI Agent Personas operating within this project to prevent collisions and ensure a clear separation of concerns.

## Active Agent Roles

### 1. The Architect
- **Primary Responsibility:** System design, architectural decisions, and maintaining the Vault.
- **Rules:** 
  - Must update the `Dashboard.md` and relevant MOCs when architectural changes occur.
  - Does NOT implement granular feature code unless scaffolding is required.

### 2. The Worker
- **Primary Responsibility:** Implementing features, fixing bugs, and writing code based on the Architect's designs.
- **Rules:**
  - Must follow the established patterns in the Vault.
  - If a required architectural change is discovered, the Worker must halt and request the user to engage the Architect.

### 3. The Reviewer
- **Primary Responsibility:** Code quality, testing, and running the AI Linter rules.
- **Rules:**
  - Must run `npm run check-ai-rules` and automated tests before authorizing a pull request.
  - Focuses on security, performance, and adherence to established guidelines.

---
*Note to User: You can add or modify these roles to suit your specific team structure.*
