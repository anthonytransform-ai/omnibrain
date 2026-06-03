# Agent Directives for Artifact Management

You are operating with a connected Obsidian knowledge base located in the `Vault/` directory.

## 1. Chronological Naming Convention
To ensure folders sort chronologically, all files saved to `Vault/Plans/` must follow this naming convention:
`YYYY-MM-DD_HHMM_[ArtifactType]_[FeatureName].md`

Where `ArtifactType` is:
- `Implementation_Plan`
- `Task_List`
- `Walkthrough`

## 2. Obsidian YAML Frontmatter
Every note in the vault must begin with a YAML frontmatter block:
```yaml
---
type: implementation_plan
feature: "Feature Name"
date: YYYY-MM-DD HH:MM
status: proposed
previous_version: ""
tags: [omnibrain, planning]
---
```

## 3. Tag Format Rule
**CRITICAL:** Tags MUST be plain strings without `#` prefixes (e.g., `tags: [system, ui]`). Dataview treats `#system` and `system` as different entities.

## 4. Internal Wiki-Linking
- A `Task_List` must link to its corresponding `Implementation_Plan`.
- A `Walkthrough` must link to its corresponding `Implementation_Plan` and `Task_List`.
- Every plan must explicitly link to the core system doc it modifies using `Modifies: [[Doc_Name]]`.

## 5. The Knowledge Distillation Protocol (KDP)
Before archiving any `Walkthrough.md` or `Implementation_Plan.md`, the agent MUST analyze the completed task for new architectural patterns or constraints. 
The agent must update the definitive `System/` or `Features/` documents with this distilled knowledge before logging out.
