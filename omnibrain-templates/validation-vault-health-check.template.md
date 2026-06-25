---
type: validation
status: active
tags: [validation, health_check]
---

# Vault Health Check Validation

This document defines the rules for verifying the vault's integrity.

## Health Parameters
Before completing any major development work or migration, run the automated health check:
`npm run vault-health`

The health check validates:
1. **Required Files:** Verifies all core layout files are present in `Core_OS/` and `Project/`.
2. **Broken Links:** Identifies and reports any wiki links or standard markdown links that do not resolve.
3. **YAML Frontmatter:** Verifies frontmatter starts with `---` and specifies a valid `type`.
4. **Instruction Leakage:** Checks that no AI operational rules have leaked into `Vault/Project/` documentation files.
