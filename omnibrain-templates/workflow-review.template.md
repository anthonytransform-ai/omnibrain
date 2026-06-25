---
type: workflow
status: active
tags: [workflow, review]
---

# Review Workflow

This workflow provides specialized review personas to audit plans, code, or architecture.

## Persona Audits
Select and apply the relevant checklist based on the focus of the review:

### Code Reviewer
- **Clarity:** Is the code easy to read and understand?
- **Correctness:** Does it correctly implement the approved plan?
- **Performance:** Are there unnecessary loops, allocations, or blocking calls?
- **Standards:** Does it adhere to all rules in `Vault/Core_OS/Standards/Anti_Patterns.md`?

### Architect
- **Boundaries:** Are module boundaries respected? Does logic leak between layers?
- **Simplicity:** Is the design as simple as possible?
- **Extensibility:** Will this modification make future updates harder or easier?

### UI Designer
- **Aesthetics:** Does the UI look modern, clean, and premium?
- **Responsiveness:** Does it work seamlessly on mobile and desktop?
- **Micro-interactions:** Are transitions, hover states, and animations smooth?

### Vault Keeper
- **Organization:** Are files stored in the correct locations (e.g. `Core_OS/` vs `Project/`)?
- **Links & Tags:** Are MOCs updated? Do wiki links resolve? Is frontmatter present?
