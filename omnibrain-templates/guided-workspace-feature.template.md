---
type: feature
feature: "Guided Workspace"
status: active
tags: [omnibrain, guided_workspace, bases, tasks]
---

# Guided Workspace

Guided Workspace is the v2.1 human-facing OmniBrain experience.

## Durable Product Rules

- `Vault/Start_Here.md` is the framework-owned home page.
- `Vault/Help/User_Guide.en.md` and `Vault/Help/User_Guide.zh-Hant.md` are framework-owned installed guides.
- `Vault/Work/Tasks/Task_Board.base` is the framework-owned Obsidian Bases task board.
- Task Markdown files under `Vault/Work/Tasks/` are user-owned.
- Files under `Vault/Work/Archive/` are user-owned.
- `Vault/Project/**` remains user-owned project knowledge.
- The legacy `Vault/Dashboard.md` remains protected and must not be overwritten by setup or `--force`.

## Task Model

Each task is one local Markdown file with `type: omnibrain_task`, `stage`, `needs_user_decision`, and `summary` frontmatter.

The canonical stage values are `Ideas`, `Planning`, `Ready`, `In progress`, `Check and decide`, and `Done`.

## Obsidian Boundary

The primary Guided Workspace requires Obsidian Desktop and the Bases core plugin only. It does not require Dataview, community plugins, Templates, Daily Notes, hosted services, API keys or telemetry.

Official Obsidian documentation lists table view support from Obsidian 1.9.

## Accepted Limitations

- Do not claim drag-and-drop Kanban.
- A new task may appear under `None` until a stage is selected.
- Stage is edited through visible Obsidian properties.
- Automated tests validate Base structure statically; final visual behaviour remains user UAT.

