---
type: feature_documentation
feature: "Safe Migration Protocol"
status: active
tags: [omnibrain, feature, migration]
---

# Feature: Safe Migration Protocol

This feature provides a safe, non-destructive pathway for migrating a legacy v1 vault structure into the v2 structure.

## Core Protections
- **Dry Run Support:** Run with `--dry-run` to log all proposed actions without altering any files.
- **Backup Safeguards:** All legacy files are moved to `Vault/_legacy/OmniBrain_v1`. Existing backups are never overwritten; backups are timestamped dynamically if a collision is detected.
- **V2 Guard Rails:** The migration script refuses to run if an existing v2 vault is already configured (detected by the presence of `Vault/Core_OS/Runtime/Entry.md`).
- **Required Option:** Must be explicitly called with `--from-v1` to run.
