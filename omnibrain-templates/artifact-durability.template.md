---
type: directive
feature: "Artifact Durability"
status: active
tags: [omnibrain, artifacts, inbox]
---

# Artifact Durability

## Why This Exists

AI assistants can lose temporary plans when a chat gets long, a tool changes context, or the user comes back later. OmniBrain prevents that by keeping important work in a simple staging folder before it is archived.

## The Inbox Rule

Before changing topic or ending a session, save important working notes in:

```text
Vault/_inbox/YYYY-MM-DD_HHMM_session-name/
```

Use it for:

- implementation plans
- task lists
- walkthroughs
- review notes
- handoff notes

## Plain-English Workflow

1. Draft the work in the AI chat or temporary files.
2. Save a copy into `Vault/_inbox/`.
3. Ask the human whether to archive and distill it.
4. If approved, move a clean copy into `Vault/Plans/`.
5. Update `Vault/System/` or `Vault/Features/` only with durable truths.

## Artifact Mirroring

If an AI tool stores plans, reviews, or handoffs in a temporary or hidden workspace, mirror the useful content into the vault before it disappears.

Use this prompt:

```text
Please archive the approved artifacts.
```

Mirroring means copying the approved content into OmniBrain. It does not mean trusting every temporary note as permanent truth.

## Rules

- Never delete old plans to make room for new ones.
- Do not depend on a specific AI tool's hidden artifact folder.
- If unsure, save to `_inbox` first. It is safer to preserve a useful note than to lose it.
