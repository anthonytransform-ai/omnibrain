---
type: directive
feature: "Vault Operations"
status: active
tags: [omnibrain, vault, memory, kdp]
---

# Vault Directives (Memory & Documentation)

## 📌 Core Observations
- Observation: Before modifying any file, the agent must check the maps of content and execute the Knowledge Base Handshake Protocol.
- Observation: Upon session start, the Dashboard must be reviewed.
- Observation: The Knowledge Distillation Protocol extracts rules from temporary plans and moves them to the permanent System rules.
- Observation: Files in the Vault must contain YAML frontmatter and use semantic inline links (e.g., `Modifies:: [[Specific_Document_Name]]`).
- Observation: Old plans are archived, not deleted.

## 🔗 Relations
- Governs:: [[Router_Architecture]]

You are operating with a connected Obsidian knowledge base located in the `Vault/` directory.
Whenever you are tasked with creating, updating, or revising a project plan or artifact, you must adhere to the following workflow to ensure permanent, interlinked knowledge tracking.

## Core Action Protocols

### Session Start Protocol (Good Morning)
- Read `Vault/Dashboard.md` to establish daily priorities.
- Review the MOCs (`_System_MOC.md`, `_Features_MOC.md`) to map the structural architecture of the project.

### Knowledge Base Handshake Protocol
To ensure the user remains in the loop:
- **Confirmation Checklist**: At the end of every task, present a short verification summary and explicitly ask:
  > **"Would you like me to run the Knowledge Distillation Protocol to update the core system docs, and then archive these artifacts?"**
- **Action Trigger**: Only execute vault write operations AFTER the user has explicitly approved.

### The Knowledge Distillation Protocol (KDP)
We must shift from "Archiving Plans" to "Distilling Truths". 
- **The Protocol**: Before archiving any `Walkthrough.md` or `Implementation_Plan.md`, analyze the completed task for new architectural patterns. 
- **The Execution**: Update the definitive `System/` or `Features/` documents with this distilled knowledge.
- **The Result**: The `Plans/` files become an archive for tracing history, while the `System/` folders remain the single, up-to-date source of truth.

### The /sync Protocol
If the user types `/sync`, you must:
1. Re-read the router file to refresh your memory.
2. Perform a full update of the `Vault/Dashboard.md` to reflect the current state of the project.

### Session Close Protocol (Handover)
At the end of your session, you MUST execute the vault maintenance suite to tag orphans, check link health, and roll older plans into the archive:
`npm run vault-maintenance`

## Vault Management Rules

### Project Isolation Rule
Agent maintenance scripts or vault commands MUST be strictly scoped to the local project workspace. Do not scan, modify, or interact with files outside the local project directory. This prevents cross-project health-check bleeding.

### Vault-wide Git Version Control Safeguard
The project workspace should be tracked via a local Git repository. This acts as the ultimate safeguard against AI mass-overwrites. Ensure `.gitignore` rules prevent temporary artifacts or tool configurations from being tracked if necessary.

### Vault Handoff Protocol
The primary AI must NOT manually copy transient plans to the `Vault/Plans/` directory to prevent context window bloat. Instead, delegate the archiving and formatting to the Vault Keeper subagent.
1. Draft the `implementation_plan.md` in your temporary artifact directory.
2. Upon completion, invoke the `vault-keeper` subagent.
3. Pass the paths of the transient artifacts to the Vault Keeper, who will format the YAML frontmatter and save them to the Vault.

### Pre-Archive Validation Checklist
Before executing any vault write operations, the agent MUST run this verification check:
1. **Frontmatter**: Does the note begin with a `---` properties block?
2. **Wiki-Link Check**: Are cross-references written using Obsidian double brackets (`[[`WikiLink`]]`)?
3. **Naming Check**: Does the filename exactly match `YYYY-MM-DD_HHMM_[ArtifactType]_[FeatureName].md`?

### Obsidian YAML Frontmatter
Every note in the vault must begin with a YAML frontmatter block:
```yaml
---
type: implementation_plan # [implementation_plan | task_list | walkthrough]
feature: "Feature Name"
date: YYYY-MM-DD HH:MM
status: proposed # [proposed | active | completed | superseded]
tags: [omnibrain, planning]
---
```

### Internal Wiki-Linking
- **Modifies Link:** Every plan MUST start by explicitly linking to the specific architectural document it alters using the standard semantic format: `Modifies: [[Specific_Document_Name]]`. 
  - **CRITICAL:** You are FORBIDDEN from linking to root files like `[[_System_MOC]]`. You must link to the specific leaf node.

### Maps of Content (MOCs)
- **Link to MOCs**: When creating a new feature or system note, add a link to it inside the appropriate MOC file (e.g., `_Features_MOC.md`).
- **Global Tags**: Include descriptive tags in the YAML frontmatter without `#` prefixes.

## Execution Rules
- Use file-system writing tools to save these files directly. Do not simply output the markdown into the chat window.
- Never delete or modify older plans in `Vault/Plans/`. All revisions must result in a new sequential file.
