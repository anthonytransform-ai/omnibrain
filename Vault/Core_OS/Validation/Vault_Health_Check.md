---
type: validation
status: active
tags: [validation, health_check]
---

# Vault Health Check Validation

This document defines the rules for verifying the vault's integrity.

## Health Parameters
Before completing any major development work or migration, run the automated health check:
`node omnibrain/scripts/vault-health.js`

The health check validates:
1. **Required Files:** Verifies core layout files, Start Here, both user guides, the Task Board Base, and required legacy Obsidian query files are present.
2. **Broken Links and Embeds:** Identifies and reports any wiki links, Base embeds, embedded queries or standard markdown links that do not resolve.
3. **YAML Frontmatter:** Verifies frontmatter starts with `---` and specifies a valid `type`.
4. **Instruction Leakage:** Checks that no AI operational rules have leaked into `Vault/Project/` documentation files.
