---
type: plan
status: completed
tags: [omnibrain, walkthrough, installer, isolation]
---

# Walkthrough: OmniBrain v2.0.2 Isolation & Bootstrap Release

This walkthrough documents the corrective release **v2.0.2**, which implements complete installer isolation and repairs the public bootstrap routing.

---

## 🛠️ Changes Made

### 1. Isolated Installer & Setup (`omnibrain-setup.js`)
- **Target Root Resolution:** The setup script resolves the target project root using either the explicit `--project-root <path>` parameter, the parent directory if placed in an `omnibrain/` folder, or the repository folder itself during self-development.
- **Zero Host Intrusion:** Setup never modifies or creates the host project's `package.json` or its `scripts/` folder.
- **Force Boundaries:** The `--force` flag now exclusively refreshes framework-owned operational files (`Vault/Core_OS/**` and `Vault/Obsidian/**`). It never overwrites user-owned project memory files (`Vault/Project/**`), configurations, or custom `AGENTS.md`.
- **Bootstrap Snippet Generator:** If the target project already has an `AGENTS.md` file, the installer skips overwriting it and generates a merge-helper snippet at `omnibrain/AGENTS.omnibrain-snippet.md`.

### 2. Public vs. Developer Bootstrap Routing
- **Public Template:** [agents.template.md](../../../omnibrain-templates/agents.template.md) is now clean and public-only, with no references to J_OS or private developer routing.
- **Developer Bootstrap:** Root [AGENTS.md](../../../AGENTS.md) uses fully visible conditional markdown routing to choose between the Developer mode J_OS bridge and the local vault route based on whether `.j_os/project-link.local.md` exists. HTML comments are no longer used for routing directives.

### 3. Isolated Scripts Path Resolution
- Modified all utility scripts (and their template counterparts under `omnibrain-templates/`):
  - [check-ai-rules.js](../../../scripts/check-ai-rules.js) / [check-ai-rules.template.js](../../../omnibrain-templates/check-ai-rules.template.js)
  - [obsidian-check.js](../../../scripts/obsidian-check.js) / [obsidian-check.template.js](../../../omnibrain-templates/obsidian-check.template.js)
  - [vault-archive.js](../../../scripts/vault-archive.js) / [vault-archive.template.js](../../../omnibrain-templates/vault-archive.template.js)
  - [vault-autotag.js](../../../scripts/vault-autotag.js) / [vault-autotag.template.js](../../../omnibrain-templates/vault-autotag.template.js)
  - [vault-health.js](../../../scripts/vault-health.js) / [vault-health.template.js](../../../omnibrain-templates/vault-health.template.js)
  - [omnibrain-migrate.js](../../../scripts/omnibrain-migrate.js) / [omnibrain-migrate.template.js](../../../omnibrain-templates/omnibrain-migrate.template.js)
- Each script resolves the target project root dynamically using the same logic as the setup installer and supports `--project-root <path>`.

### 4. Comprehensive Documentation Updates
- Updated [README.md](../../../README.md) and [INSTRUCTIONS_FOR_HUMANS.md](../../../INSTRUCTIONS_FOR_HUMANS.md) in English and Traditional Chinese to direct users to execute maintenance scripts directly via `node omnibrain/scripts/...` commands rather than host npm scripts.
- Updated [obsidian-install.template.md](../../../omnibrain-templates/obsidian-install.template.md) to reference direct node execution paths.
- Added release notes for `v2.0.2` in [CHANGELOG.md](../../../CHANGELOG.md).

---

## 🧪 Verification & Sandbox Tests

The sandbox test suite has been extended in [run-tests.js](file:///c:/App/OmniBrain_Staging/scripts/run-tests.js) and [run-tests.template.js](file:///c:/App/OmniBrain_Staging/omnibrain-templates/run-tests.template.js) to mock a realistic host project structure. All 11 tests pass successfully:

```text
===============================================
   OmniBrain v2.0.2 Test Suite                 
===============================================

[TEST 1] Existing package protection...
  [PASS] Setup runs idempotently and protects target package.json.

[TEST 2] Existing scripts protection...
  [PASS] Setup and setup --force left host scripts/vault-health.js unchanged.

[TEST 3] Existing AGENTS protection...
  [PASS] Existing AGENTS.md is unchanged and snippet exists.

[TEST 4] Fresh project bootstrap...
  [PASS] Setup creates public OmniBrain-only bootstrap with no J_OS wording.

[TEST 5] Force boundary check...
  [PASS] Force boundary protects Project_Overview.md while refreshing Entry.md.

[TEST 6] Clean health pass...
  [PASS] Newly generated vault passes vault-health check cleanly.

[TEST 7] Health Check Broken Link Detection...
  [PASS] Health check correctly catches and reports broken links.

[TEST 8] Health Check Instruction Leakage Detection...
  [PASS] Health check correctly catches instruction leakage in project memory.

[TEST 9] Obsidian Check Plugin Validation...
  [PASS] Correctly catches missing .obsidian folder.
  [PASS] Correctly catches missing community-plugins.json.
  [PASS] Correctly catches disabled Dataview plugin.
  [PASS] Correctly passes when Dataview is enabled.

[TEST 10] Migration Refusal on Existing v2...
  [PASS] Migration correctly refuses to execute on a v2 vault.

[TEST 11] Non-destructive Maintenance checks...
  [PASS] vault-autotag is report-only by default.
  [PASS] vault-archive is report-only by default.

-----------------------------------------------
✔ All OmniBrain v2 tests completed successfully!
```
