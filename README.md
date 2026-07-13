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
- Node.js. The repository workflow tests OmniBrain with Node.js 18.
- An AI assistant that can work with local files.
- Obsidian Desktop with the Bases core plugin enabled.

Official Obsidian documentation lists Bases table view support from Obsidian 1.9. OmniBrain v2.1 uses the table view.

## Recommended Installation

Ask your AI assistant to install OmniBrain. The full copyable instruction is in both user guides.

The installation journey has two parts:

1. Put the official OmniBrain framework files from `https://github.com/anthonytransform-ai/omnibrain` under your project as `omnibrain/`.
2. Run setup from the host project root.

Before setup, confirm these paths exist:

```text
omnibrain/omnibrain-setup.js
omnibrain/omnibrain-templates/
```

If you are using GitHub manually, use **Code -> Download ZIP**, extract the ZIP, rename the extracted folder to `omnibrain`, and move it into your project folder. Do not leave a nested `.git` repository inside your project.

For technical users, the safe setup command from the host project root is:

```bash
node omnibrain/omnibrain-setup.js
```

To refresh framework-owned files later:

> [!warning]
> `--force` can overwrite framework-owned OmniBrain files. It must preserve host files, host configuration, `Vault/Project/**`, `Vault/Work/Tasks/**`, `Vault/Work/Archive/**` and the legacy `Vault/Dashboard.md`.

```bash
node omnibrain/omnibrain-setup.js --force
```

When setup preserves an existing root `AGENTS.md`, it may create `omnibrain/AGENTS.omnibrain-snippet.md`. A capable AI assistant should propose a merge that preserves all existing instructions, then integrate the OmniBrain snippet only after approval.

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
