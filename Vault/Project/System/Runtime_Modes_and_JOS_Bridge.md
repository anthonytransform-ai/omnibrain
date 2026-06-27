---
type: system_doc
feature: "Runtime Modes and J_OS Bridge"
status: active
tags: [omnibrain, system, runtime, j_os, bridge]
---

# Runtime Modes and J_OS Bridge

This document defines how the OmniBrain framework repository chooses between its public local-vault route and its private J_OS maintainer route.

## Why Two Modes Exist

Public OmniBrain must remain portable and self-contained. Maintainers of the framework also need access to the wider J_OS workspace without copying private workflows into this repository. These are separate needs, so they use separate boot routes.

## Public Local-Vault Mode

This is the default when `.j_os/project-link.local.md` is absent.

The public bootstrap reads only the local Vault route:

1. `Vault/Core_OS/Runtime/Entry.md`
2. `Vault/Project/Current_State.md`
3. `Vault/Project/System/_System_MOC.md`
4. `Vault/Project/Features/_Features_MOC.md`
5. `Vault/Core_OS/Registries/Workflow_Registry.md`

The public installer template at `omnibrain-templates/agents.template.md` intentionally contains this route only. It must remain free of J_OS references, local J_OS paths, and maintainer-only instructions.

## Developer J_OS Bridge Mode

This mode is active only when the local, untracked file `.j_os/project-link.local.md` exists.

The bridge file supplies:

- `project_id`: the lower-case identifier matching a J_OS project registry record.
- `j_os_root`: the absolute path to the local J_OS root.
- `bridge_mode`: currently `standard`.

When the bridge exists, the repository root `AGENTS.md` must:

1. Read the bridge file.
2. Read `<j_os_root>/Core_OS/Runtime/Entry.md`.
3. Read `<j_os_root>/Core_OS/Registries/Projects/<project_id>.md`.
4. Follow the J_OS runtime route.

Developer J_OS Bridge Mode has priority over the local-vault route for that workspace.

## Privacy and Repository Boundary

- `.j_os/project-link.local.md` is local-only and must remain ignored by Git.
- The example bridge file may show field names and placeholder values but must not include a real local path or project identifier.
- Do not copy J_OS workflow files into this public repository.
- Repository-local code, tests, and public documentation remain in this repository; J_OS supplies the wider maintainer workflow only when the bridge is explicitly configured.

## Maintainer Change Rules

When changing runtime routing:

- Keep the framework root `AGENTS.md` and the public installer template intentionally distinct.
- Update this document and [[Project/System/OmniBrain_Architecture|OmniBrain System Architecture]].
- Confirm the public generated bootstrap contains no J_OS wording.
- Confirm the developer bootstrap continues to fail safely when no verified local bridge exists.
