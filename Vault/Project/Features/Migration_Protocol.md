---
type: feature_documentation
feature: "Safe Migration Protocol"
status: active
tags: [omnibrain, feature, migration]
---

# Feature: Safe Migration Protocol

This feature provides a guarded migration path from a legacy local OmniBrain v1 Vault to the v2 structure. It does not upgrade, move, or configure J_OS.

## Required Preconditions

- Use this only for a confirmed local OmniBrain v1 Vault.
- Save a separate copy of the project before an applied migration. The tool protects the Vault, but it is not transactional.
- Do not use it on a partly upgraded v2 Vault. The v2 guard detects `Vault/Core_OS/Runtime/Entry.md`; an incomplete v2 structure may not be detected.

## Safe First Step

First run:

```bash
node omnibrain/scripts/omnibrain-migrate.js --from-v1 --dry-run
```

To apply the migration:

```bash
node omnibrain/scripts/omnibrain-migrate.js --from-v1
```

## Core Protections

- **Explicit activation:** The command stops unless `--from-v1` is supplied.
- **Dry-run support:** `--dry-run` reports the intended backup, setup, and validation steps without changing files.
- **V2 guard rail:** Migration stops when `Vault/Core_OS/Runtime/Entry.md` already exists.
- **Collision-safe backups:** Existing backups are retained. A timestamped legacy directory is used when `Vault/_legacy/OmniBrain_v1` already exists.
- **Post-migration validation:** The tool runs `node omnibrain/scripts/vault-health.js` after creating the v2 structure.
- **Public command guidance:** Expected user errors show public `node omnibrain/...` recovery commands, whether files changed, and the next safe action.

## Important Limits

- The tool places every top-level item in the local `Vault/`, except `_legacy`, into the legacy backup area before regenerating the v2 Vault. This can include local Obsidian settings such as `.obsidian`.
- An error during the transfer or later setup ends the command; earlier changes are not automatically reversed.
- After success, reopen the local Vault in Obsidian and enable the Bases core plugin if the Task Board does not display. Use `node omnibrain/scripts/obsidian-check.js` after Obsidian has opened the Vault.
- Review legacy notes before distilling durable facts into the new `Project/System/` and `Project/Features/` records.

## Recovery

When migration stops with an error, inspect the reported paths and the created legacy backup before taking any further action. Restore from the separate project copy where necessary; do not re-run blindly. For a normal v2 refresh, use `node omnibrain/omnibrain-setup.js`; use `--force` only when intentionally refreshing framework-owned files.
