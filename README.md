# OmniBrain v2.1.0

OmniBrain is a local, Markdown-first workspace for people who work with an AI assistant.

It turns one project folder into a guided Obsidian workspace with:

- `Vault/Start_Here.md` as the human home page;
- a simple Obsidian Bases task board at `Vault/Work/Tasks/Task_Board.base`;
- local Markdown task files under `Vault/Work/Tasks/`;
- project knowledge under `Vault/Project/`;
- framework guidance under `Vault/Core_OS/`;
- English and Traditional Chinese user guides.

OmniBrain remains local, vendor-neutral and transparent. It does not require API keys, hosted services, telemetry, MCP, Docker, Python, Dataview or a custom Obsidian plugin.

## User Guides

- [English User Guide](docs/User_Guide.en.md)
- [Traditional Chinese User Guide](docs/User_Guide.zh-Hant.md)

## What You Need

- A project folder.
- An AI assistant that can work with local files.
- Obsidian Desktop with the Bases core plugin enabled.

Official Obsidian documentation lists Bases table view support from Obsidian 1.9. OmniBrain v2.1 uses the table view.

## Recommended Installation

Ask your AI assistant to install OmniBrain. The full copyable instruction is in both user guides.

For technical users, the safe setup command from the host project root is:

```bash
node omnibrain/omnibrain-setup.js
```

To refresh framework-owned files later:

```bash
node omnibrain/omnibrain-setup.js --force
```

`--force` refreshes framework-owned files only. It must preserve host files, host configuration, `Vault/Project/**`, `Vault/Work/Tasks/**`, `Vault/Work/Archive/**` and the legacy `Vault/Dashboard.md`.

## Guided Workspace

Fresh setup creates:

```text
Vault/
├─ Start_Here.md
├─ Help/
│  ├─ User_Guide.en.md
│  └─ User_Guide.zh-Hant.md
├─ Work/
│  ├─ Tasks/
│  │  └─ Task_Board.base
│  └─ Archive/
├─ Core_OS/
├─ Project/
└─ Obsidian/
```

Tasks are Markdown files with a small frontmatter model:

```yaml
---
type: omnibrain_task
stage: Ideas
needs_user_decision: false
summary:
---
```

Accepted limitations:

- OmniBrain does not claim drag-and-drop Kanban.
- A new task may appear under `None` until a stage is selected.
- Stage is edited through visible Obsidian properties.
- All task information remains in local Markdown files.

## Framework Development

The npm scripts in this repository are for OmniBrain framework development. Public installations should use direct `node omnibrain/...` commands from the host project root.

Run the framework test suite in this repository with:

```bash
npm test
```
