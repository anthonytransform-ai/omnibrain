---
type: feature_documentation
feature: "Installer Isolation"
status: active
tags: [omnibrain, feature, installer, isolation]
---

# Feature: Installer Isolation

Installer Isolation allows OmniBrain to integrate into an existing host application without rewriting the host application's existing configuration or scripts.

## User-Facing Boundary

OmniBrain is installed as an isolated `omnibrain/` subdirectory. The host project keeps ownership of its own build configuration, package scripts, dependencies, and source-code conventions.

Setup may create clearly named OmniBrain integration artefacts when they are absent:

- `Vault/` and its v2 folder structure.
- `omnibrain.config.json`.
- A root `AGENTS.md`, but only when the host project does not already have one.

These are new framework artefacts, not changes to existing host-owned files.

## Protected Host Files

Setup never modifies:

- An existing host `package.json`.
- Any existing file below the host `scripts/` directory.
- An existing root `AGENTS.md`.
- An existing `omnibrain.config.json`.

When `AGENTS.md` already exists, setup leaves it unchanged and writes `omnibrain/AGENTS.omnibrain-snippet.md` for a deliberate manual merge.

## Public and Developer Bootstrap Separation

The installer creates the public local-vault bootstrap from `omnibrain-templates/agents.template.md`. It intentionally contains no J_OS routing.

The framework repository's own root `AGENTS.md` can route to J_OS in developer mode through an untracked `.j_os/project-link.local.md`. That developer behaviour is not copied into public user projects. See [[Project/System/Runtime_Modes_and_JOS_Bridge|Runtime Modes and J_OS Bridge]].

## Update Behaviour

- A normal setup run creates missing templates and does not overwrite existing vault templates or user memory.
- `--force` refreshes framework-owned `Vault/Core_OS/**` and `Vault/Obsidian/**` files.
- `--force` does not overwrite `Vault/Project/**` or `Vault/Dashboard.md`.
- Setup regenerates OmniBrain's own files in `omnibrain/scripts/`; this is separate from the protected host `scripts/` directory.

## Command-Line Usage

For a framework installed in `omnibrain/`, run maintenance utilities from the host project root:

```bash
node omnibrain/scripts/vault-health.js
node omnibrain/scripts/obsidian-check.js
node omnibrain/scripts/vault-autotag.js
node omnibrain/scripts/vault-archive.js
```

Use `--apply` only after reviewing the report from `vault-autotag` or `vault-archive`.

## Non-Goals

Installer Isolation does not initialise Git, add dependencies, edit a host build pipeline, migrate an application database, or merge arbitrary host instructions automatically.
