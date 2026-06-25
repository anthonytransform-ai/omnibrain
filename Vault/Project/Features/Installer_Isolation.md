---
type: feature_documentation
feature: "Installer Isolation"
status: active
tags: [omnibrain, feature, installer, isolation]
---

# Feature: Installer Isolation

This feature allows users to integrate OmniBrain into an existing host application project without structural interference.

## User Experience
- **Isolated Directory:** OmniBrain resides completely inside the `omnibrain/` subdirectory.
- **No package.json Collisions:** Setup and framework scripts never touch or create the target project's `package.json`.
- **Scripts Folder Protection:** The installer never touches, creates, or overwrites files under the host project's `scripts/` folder.
- **Config & AGENTS Protection:** Existing target project configurations (`omnibrain.config.json` and `AGENTS.md`) are never overwritten. If `AGENTS.md` exists, setup outputs a merge-helper block to `omnibrain/AGENTS.omnibrain-snippet.md`.
- **Command Line Usage:** Users execute all maintenance tasks via direct Node.js calls:
  - `node omnibrain/scripts/vault-health.js`
  - `node omnibrain/scripts/obsidian-check.js`
  - `node omnibrain/scripts/vault-autotag.js`
  - `node omnibrain/scripts/vault-archive.js`
