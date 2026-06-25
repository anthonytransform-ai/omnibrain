---
type: plan
status: completed
tags: [omnibrain, plan, installer, isolation]
---

# Implementation Plan: OmniBrain v2.0.2 Installer Isolation & Public Bootstrap Repair

This plan outlines the implementation of OmniBrain v2.0.2, focusing on isolating the OmniBrain installer and scripts from the host application's package.json, scripts/ folder, and configs, and repairing the public bootstrap files.

---

## User Review Required

> [!IMPORTANT]
> **Key Isolation Decisions:**
> 1. **Zero Host Project Intrusion:** Setup and scripts will never modify or create the host's `package.json`, `scripts/` folder, or overwrite existing project memory / `AGENTS.md`.
> 2. **Project Root Resolution:** All scripts resolve the project root using a default hierarchy: an explicit `--project-root <path>` argument, the parent directory if located in an `omnibrain` folder, or the repository folder itself during self-development.
> 3. **Public Bootstrap Repair:** The public template `agents.template.md` will contain only public-safe markdown and no J_OS references. The repository's own `AGENTS.md` will use visible conditional markdown routing instead of HTML comments.
> 4. **Limited Force Boundaries:** The `--force` flag in setup will refresh only framework-owned operational files (`Vault/Core_OS/**` and `Vault/Obsidian/**`) and will never overwrite user-owned files like `Vault/Project/**`.

---

## Open Questions

None. The requirements are fully detailed in the request.

---

## Proposed Changes

### 1. Build Tools & Configuration
We will bump the version to `2.0.2` in framework configuration files.

#### [MODIFY] [package.json](../../../package.json)
- Bump version to `2.0.2`.

#### [MODIFY] [omnibrain.config.json](../../../omnibrain.config.json)
- Bump vault_version to `2.0.2`.

---

### 2. Project Root Resolution & Safety Refactor

#### [MODIFY] [omnibrain-setup.js](../../../omnibrain-setup.js)
- Refactor project root resolution (support `--project-root <path>`, default to parent of `omnibrain` folder, fallback to repo root).
- Clearly print the resolved target project root.
- Never write to or create `<project-root>/package.json` or `<project-root>/scripts/**`.
- If `<project-root>/AGENTS.md` is missing, copy the public template there. If it exists, do not modify (even with `--force`), and instead write the integration snippet to `<project-root>/omnibrain/AGENTS.omnibrain-snippet.md`.
- Ensure `--force` only overwrites files in `Vault/Core_OS/**` and `Vault/Obsidian/**`. It must not overwrite `Vault/Project/**`, `Vault/Dashboard.md`, or configurations.

#### [MODIFY] [scripts/omnibrain-migrate.js](../../../scripts/omnibrain-migrate.js) & [omnibrain-templates/omnibrain-migrate.template.js](../../../omnibrain-templates/omnibrain-migrate.template.js)
- Resolve target root using the same rules.
- Invoke `omnibrain-setup.js` and `vault-health.js` pointing to the target root via `--project-root`.

#### [MODIFY] all maintenance scripts (and their templates under `omnibrain-templates/`)
Modify `vault-health.js`, `vault-autotag.js`, `vault-archive.js`, `obsidian-check.js`, `check-ai-rules.js` and `run-tests.js`:
- Incorporate target project root resolution.
- Print target project root clearly.

---

### 3. Bootstrap & Documentation Repair

#### [MODIFY] [omnibrain-templates/agents.template.md](../../../omnibrain-templates/agents.template.md)
- Set public-only bootstrap text (no J_OS mentions).

#### [MODIFY] [AGENTS.md](../../../AGENTS.md)
- Update repo root AGENTS.md to have visible conditional routing (J_OS route vs local route) with no HTML comments.

#### [MODIFY] [README.md](../../../README.md) & [INSTRUCTIONS_FOR_HUMANS.md](../../../INSTRUCTIONS_FOR_HUMANS.md)
- Update instructions to reflect isolated `omnibrain/` framework location and direct `node omnibrain/scripts/...` commands instead of host-level npm scripts.

#### [MODIFY] [CHANGELOG.md](../../../CHANGELOG.md)
- Add concise v2.0.2 changelog entry.

---

### 4. Tests

#### [MODIFY] [scripts/run-tests.js](../../../scripts/run-tests.js) & [omnibrain-templates/run-tests.template.js](../../../omnibrain-templates/run-tests.template.js)
- Reorganize sandbox creation to construct:
  ```text
  sandbox/project/
  ├─ package.json (mock user app package)
  ├─ scripts/vault-health.js (mock user app script)
  ├─ AGENTS.md (mock user AGENTS.md)
  └─ omnibrain/
  ```
- Run the setup from `sandbox/project/` using `node omnibrain/omnibrain-setup.js`.
- Add test assertions for package protection, script protection, AGENTS snippet generation/non-overwrite, fresh AGENTS creation when missing, `--force` boundaries (overwrites Core_OS/Entry.md but keeps Project/Project_Overview.md), and clean health pass.

---

## Verification Plan

### Automated Tests
- Run the modified test suite:
  `npm test`
- Verify lint rules check:
  `npm run check-ai-rules`
- Verify local vault health check:
  `npm run vault-health`

### Manual Verification
- Run setup in mock subfolder to verify console outputs and generated snippet.
