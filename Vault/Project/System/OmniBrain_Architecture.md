---
type: system_architecture
feature: "OmniBrain System Architecture"
status: active
tags: [omnibrain, system, architecture]
---

# OmniBrain System Architecture

This document outlines the core architectural and operational facts of OmniBrain v2.

## 1. Control Plane vs. Memory Plane Separation
- **Core_OS (Control Plane):** Houses all AI operating instructions, system directives, workflows (planning, implementation, review, knowledge updates), and quality linting standards (`Vault/Core_OS/`).
- **Project (Memory Plane):** Houses all project-specific facts, history, plans, daily logs, and features MOCs (`Vault/Project/`).

## 2. Agent Bootstrap & Task-Scoped Loading
- **Lightweight AGENTS.md:** Agents boot from a minimal 10-line file that links only to the runtime entry.
- **Task-Scoped Context:** Agents load files dynamically based on workflow paths (e.g. scoping, planning) rather than importing the entire vault, saving context tokens and reducing hallucinations.

## 3. Isolated Installer & Non-Destructive Boundaries
- **Path Resolution:** Supports `--project-root <path>`, automatically resolving if nested within an `omnibrain/` directory.
- **Zero Host Intrusion:** The setup script never modifies or creates target host project `package.json` or `scripts/` directories.
- **Strict Force Boundaries:** The `--force` flag in setup refreshes only framework-owned operational files (`Vault/Core_OS/**` and `Vault/Obsidian/**`) and never overwrites user project memory (`Vault/Project/**`).
- **Bootstrap Snippets:** If a root `AGENTS.md` already exists, setup leaves it intact and writes a manual integration block to `omnibrain/AGENTS.omnibrain-snippet.md`.

## 4. Migration & Maintenance Safety
- **Migration Guards:** The migration script requires `--from-v1`, supports `--dry-run`, refuses to run on existing v2 vaults, and creates timestamped backups to protect legacy files under `Vault/_legacy/`.
- **Maintenance Safety:** Command line maintenance utilities (`vault-archive.js` and `vault-autotag.js`) run in report-only mode by default. They require an explicit `--apply` flag to write modifications.

## 5. Human Interface: Obsidian & Dataview Onboarding
- **Obsidian Vault:** The `Vault/` directory is designed to be opened directly as a vault in Obsidian Desktop.
- **Dataview Dashboard:** The dashboard (`Vault/Dashboard.md`) embeds Dataview queries to dynamically construct indexes of active plans, features, and logs for human review.

## 6. Lints, Validation & CI Behaviour
- **Vault Health Check:** `vault-health.js` scans all links, checks frontmatter presence, and checks for operational rule leakage in project memory.
- **Continuous Integration:** GitHub Actions CI configuration (`.github/workflows/test.yml`) executes the sandbox test suite validating setup safety on every push/pull request.
