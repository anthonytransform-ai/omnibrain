---
type: system_architecture
feature: "OmniBrain System Architecture"
status: active
tags: [omnibrain, system, architecture]
---

# OmniBrain System Architecture

This document records the durable architectural and operational facts of OmniBrain v2. For the developer/public routing boundary, see [[Project/System/Runtime_Modes_and_JOS_Bridge|Runtime Modes and J_OS Bridge]].

## 1. Control Plane and Memory Plane

- **Core_OS (control plane):** Framework-owned operating rules, workflow definitions, quality standards, and validation guidance at `Vault/Core_OS/`.
- **Project (memory plane):** User-owned project facts, decisions, plans, daily logs, and System/Features documentation at `Vault/Project/`.
- The separation prevents operational rules from being mixed into durable product and project knowledge.

## 2. Two Runtime Modes

OmniBrain has two intentionally different runtime routes.

- **Public Local-Vault Mode:** Used when `.j_os/project-link.local.md` is absent. The public bootstrap reads the local `Vault/Core_OS/Runtime/Entry.md`, current state, System and Features MOCs, and workflow registry. Public mode is self-contained and contains no J_OS dependency.
- **Developer J_OS Bridge Mode:** Used only when the untracked local bridge file exists. The repository bootstrap reads the bridge's `project_id` and `j_os_root`, then follows the J_OS runtime entry and the matching J_OS project registry record. This route takes precedence over the local vault route.
- The framework repository's root `AGENTS.md` is a mode router. The public installer template is deliberately a simpler, J_OS-free local-vault bootstrap. They must not be made identical.

## 3. Task-Scoped Knowledge Loading

- The selected runtime reads the initial maps and current state, then loads only the workflow and System/Features records relevant to the task.
- Detailed planning, implementation, review, and standards files are loaded only when their workflow requires them.
- This keeps context bounded while retaining a traceable route to durable project knowledge.

## 4. File Ownership and Update Boundaries

### Host-owned files

Setup does not modify an existing host `package.json`, anything in the host `scripts/` directory, or an existing root `AGENTS.md`. When a root `AGENTS.md` already exists, setup writes an integration snippet inside `omnibrain/` instead.

### Explicit OmniBrain artefacts

Setup may create the local `Vault/` structure, `omnibrain.config.json` when it is absent, and a root `AGENTS.md` only when one does not already exist. These creations are intentional framework integration points; they are not host-file rewrites.

### Framework-owned files

- `Vault/Core_OS/**` and `Vault/Obsidian/**` template files refresh with `--force`.
- Framework scripts inside `omnibrain/scripts/` are regenerated during setup so that installed maintenance utilities match the framework version.
- The local `Vault/Project/**` memory files and `Vault/Dashboard.md` are not overwritten by `--force`.
- The Dashboard query at `Vault/Obsidian/Queries/Dashboard.md` is framework-owned and refreshed with `--force`; the Dashboard page itself remains user-protected.

## 5. Migration and Maintenance Safety

- The v1-to-v2 migration utility requires `--from-v1`, supports `--dry-run`, refuses to proceed when a v2 entry file already exists, and creates a unique backup directory below `Vault/_legacy/`.
- Migration is for a local OmniBrain v1 vault. It is not a J_OS migration procedure.
- The migration moves top-level local Vault items into the backup before rebuilding v2. It is therefore a guarded, file-moving operation rather than a transactional upgrade; a separate project backup is recommended before applying it.
- `vault-autotag` and `vault-archive` report first and need `--apply` before writing to Project plans.

## 6. Human Interface

- `Vault/` is designed to open directly in Obsidian Desktop.
- The Dashboard transcludes Dataview query views for plans, features, and daily logs from `Vault/Obsidian/Queries/Dashboard.md`.
- The `obsidian-check` utility verifies that the Vault has an `.obsidian` directory and that Dataview is enabled. It does not verify that Obsidian is currently running or that all preferred core-plugin settings are configured.

## 7. Validation and CI

- `vault-health` checks required files, including the Dashboard query, Markdown frontmatter shape, local Markdown and wiki links, embedded query targets, and selected operational-language leakage patterns.
- It is a structural integrity check. It does not confirm that active documentation is complete, non-template, or current with code.
- GitHub Actions runs `npm test` on pushes to `main` and pull requests targeting `main`, using Node 18.
