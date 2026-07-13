# OmniBrain v2.1.0

OmniBrain is a local, Markdown-first workspace for people who work with an AI coding assistant.

It turns one project folder into a guided Obsidian workspace with:

- `Vault/Start_Here.md` as the home page;
- a simple Obsidian Bases task board at `Vault/Work/Tasks/Task_Board.base`;
- local Markdown task files under `Vault/Work/Tasks/`;
- project knowledge under `Vault/Project/`;
- framework guidance under `Vault/Core_OS/`;
- English and Traditional Chinese Markdown source guides.

OmniBrain remains local, vendor-neutral and transparent. It does not require API keys, hosted services, telemetry, MCP, Docker, Python, Dataview or a custom Obsidian plugin.

## Install With An AI Coding Assistant

Copy this repository URL:

```text
https://github.com/anthonytransform-ai/omnibrain
```

Paste it into Codex, Antigravity or another capable AI coding assistant that is already working in your project, then say:

```text
Install this in my current project. Preserve my existing files and guide me through anything that needs my decision.
```

The AI assistant should inspect the repository, install OmniBrain under your project as `omnibrain/`, run setup, preserve your existing files, and tell you what needs your decision.

You should not need to clone this repository, download a ZIP, create folders, run terminal commands or merge Markdown instructions before asking the AI assistant to install OmniBrain.

## What The AI Assistant Uses

Agent-facing installation instructions live in [INSTALL_WITH_AI.md](INSTALL_WITH_AI.md).

The Markdown files in `docs/`, `Vault/` and `omnibrain-templates/` are contributor and AI-readable sources. Future approved human PDF guides will be produced separately and integrated later.

## What You Need

- A project folder.
- An AI coding assistant that can work with local files.
- Node.js available to the assistant for setup.
- Obsidian Desktop with the Bases core plugin enabled for the visual workspace.

Official Obsidian documentation lists Bases table view support from Obsidian 1.9. OmniBrain v2.1 uses the table view.

## Advanced Technical Fallback

Technical users may install manually by placing the official OmniBrain framework contents under a host project as `omnibrain/`, then running setup from the host project root:

```bash
node omnibrain/omnibrain-setup.js
```

To refresh framework-owned files later:

> [!warning]
> `--force` can overwrite framework-owned OmniBrain files. It must preserve host files, host configuration, `Vault/Project/**`, `Vault/Work/Tasks/**`, `Vault/Work/Archive/**` and the legacy `Vault/Dashboard.md`.

```bash
node omnibrain/omnibrain-setup.js --force
```

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
