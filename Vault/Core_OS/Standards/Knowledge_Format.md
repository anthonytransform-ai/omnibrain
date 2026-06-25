---
type: standard
status: active
tags: [standards, formatting]
---

# Knowledge Format Standards

To maintain compatibility with both AI agents and Obsidian Desktop, all Markdown files must adhere to these standards.

## YAML Frontmatter
Every markdown file (except root `AGENTS.md`) must begin with a YAML frontmatter block containing at least the `type` field:
```markdown
---
type: plan | daily_log | system_doc | feature_doc | standard | workflow
status: active | completed | archived
tags: [tag1, tag2]
---
```

## Links
- **Wiki Links:** Prefer Obsidian-style wiki links `[[LinkTarget]]` or `[[LinkTarget|Display Text]]` for internal vault references.
- **Paths:** Wiki link targets are relative to the Obsidian vault root (which is the `Vault/` directory).
- **Lowercase Basenames:** Ensure filenames are unique so that short base links `[[My Note]]` resolve reliably.

## Structure
- Use single `<h1>` headers per file.
- Group related metadata inside the YAML frontmatter instead of embedding it in markdown text.
- Do not store AI-specific instructions in project memory files.
