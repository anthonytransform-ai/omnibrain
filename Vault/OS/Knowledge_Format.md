---
type: directive
feature: "Knowledge Format"
status: active
tags: [omnibrain, knowledge, memory]
---

# Knowledge Format

This file explains how to keep project memory readable for both humans and AI assistants.

## Core Rule

Project knowledge should be plain Markdown, easy to search, easy to review, and useful to a future AI assistant without needing the original chat.

## Start From The Right Places

For serious work, the AI should read:

1. `Vault/Dashboard.md`
2. `Vault/Project_Context.md`
3. the latest note in `Vault/Daily_Logs/`, if one exists
4. the relevant map files, such as `Vault/System/_System_MOC.md` and `Vault/Features/_Features_MOC.md`
5. only the operating directives needed for the current task

## MOCs As Maps

MOC means "Map of Content." A MOC should help the AI choose what to read next.

A useful MOC should:

- explain what the folder is for
- list the most important active notes first
- separate current truth from old history
- give short descriptions for important links
- warn when a note is old, experimental, or only kept for reference

## Daily Logs As Scope Logs

Daily logs should capture meaningful work without becoming paperwork.

Use headings when they help:

- Session Purpose
- Decisions
- Files Changed
- Validation
- Artifacts
- Follow-Ups

Short sessions can stay short. Important decisions should not live only in chat.

## Preserve Then Enrich

When updating an existing durable note:

1. Keep the note's title, purpose, and useful structure.
2. Add new information near the relevant section.
3. Keep old context if it explains why a decision was made.
4. Mark outdated material as historical instead of deleting it casually.
5. Avoid broad rewrites unless the human asked for a full cleanup.

## Source Discipline

If a note depends on outside information, include a link, filename, command output, or short explanation of where the claim came from.

If the AI is making an inference, it should say so.

## Knowledge Updates

When the human says, "Please update the project knowledge," the AI should:

1. Review approved notes, plans, walkthroughs, or reviews.
2. Extract only durable decisions, rules, and project facts.
3. Update the relevant `Vault/System/` or `Vault/Features/` note.
4. Update MOCs if the location or source of truth changed.
5. Add a short daily-log note when the work was meaningful.
