---
type: user_guide
language: en
status: active
tags: [omnibrain, user_guide, guided_workspace]
---

# OmniBrain User Guide

This is the English guide for OmniBrain v2.1.0.

## Three-minute quick start

1. Ask an AI assistant to install OmniBrain in your project folder.
2. Open `Vault/Start_Here.md` in Obsidian Desktop.
3. Enable the Bases core plugin if the task board does not display.
4. Create one task from the **New** button in the task board.
5. Ask your AI assistant to work on that task by name.

## 1. What OmniBrain is

OmniBrain is a local workspace for AI-assisted projects. It keeps project notes, current work, decisions and guidance in plain Markdown files.

You use Obsidian to see the workspace. Your AI assistant uses the same files to stay oriented.

## 2. What OmniBrain does not do

OmniBrain does not replace your app, deploy your work, send telemetry, require an API key or depend on a cloud service.

It does not make product decisions for you. It helps you see what is happening and where your decision is needed.

## 3. What you need before starting

You need:

- your project folder;
- Node.js, because OmniBrain setup runs with `node`;
- an AI assistant that can work with local files;
- Obsidian Desktop.

OmniBrain is tested with Node.js 18 in the repository workflow. If your project uses a newer supported Node.js version, that is usually fine. If `node --version` does not work, stop and install Node.js yourself or explicitly approve a trusted helper to guide you. OmniBrain should not install system software automatically.

For the Guided Workspace, Obsidian only needs the Bases core plugin. The main task board works without Dataview, Templates, Daily Notes or community plugins.

The table-based task board requires Obsidian Bases with table view support. Official Obsidian documentation lists table view as available from Obsidian 1.9.

## 4. Install with an AI assistant

The normal human route is in `README.md`: paste the repository URL into the AI coding assistant already working on your project, then ask it to install OmniBrain while preserving existing files.

The technical installation contract for agents is `INSTALL_WITH_AI.md`. It defines source acquisition, Node.js preflight, preservation boundaries, AGENTS handling, validation and truthful failure reporting.

## 5. Manual installation

Manual installation is an advanced fallback for technical users. The primary route is still AI-assisted installation from the README front door.

1. Confirm you are in the project folder that should receive OmniBrain.
2. Confirm Node.js is available:

```bash
node --version
```

3. Get the official OmniBrain files from `https://github.com/anthonytransform-ai/omnibrain`.
4. Place the framework contents under your project as `omnibrain/`.
5. Avoid leaving a nested `.git` repository inside your project.
6. Verify these paths exist:

```text
omnibrain/omnibrain-setup.js
omnibrain/omnibrain-templates/
```

Then run setup from the project root:

```bash
node omnibrain/omnibrain-setup.js
```

To refresh framework-owned OmniBrain files later, run:

> [!warning]
> `--force` can overwrite framework-owned OmniBrain files such as Core_OS, Start Here, guides, the Base task board, Obsidian help files and OmniBrain scripts. It must preserve project memory, task files, archive files, host files, host configuration and the legacy `Vault/Dashboard.md`.

```bash
node omnibrain/omnibrain-setup.js --force
```

## 6. Open OmniBrain in Obsidian

Open Obsidian Desktop. Choose **Open folder as vault** and select the `Vault/` folder inside your project folder.

Then open `Start_Here.md`.

## 7. Enable Bases

In Obsidian, open Settings. Go to **Core plugins**. Enable **Bases**.

If the task board does not display, enable Bases and reopen `Start_Here.md`. OmniBrain does not check undocumented internal Obsidian state, so the check tool gives instructions rather than claiming Bases is enabled.

## 8. Use Start Here

`Start_Here.md` is your home page. It links to project notes, both user guides and the current task board.

Do not store durable project facts on Start Here. Put facts in the owning project note, such as Project Overview, Current State or Product Vision.

## 9. Create your first task

Open the Active work board. Use the visible **New** action.

Obsidian creates a new Markdown file under `Vault/Work/Tasks/`. Rename the file to the task title. Fill in the summary and choose a stage through the visible Obsidian properties.

A new task may appear under `None` until you select a stage. That is accepted behaviour.

## 10. Understand the six stages

Use these exact stage values:

- `Ideas`: a possible task.
- `Planning`: the task needs shape.
- `Ready`: the task is clear enough to start.
- `In progress`: work is happening.
- `Check and decide`: the result needs review or a user decision.
- `Done`: the task is complete.

The stage is your lifecycle decision. An AI assistant may recommend a stage, but it should change the stage only when you directly instruct it to do so.

## 11. Mark that a decision is needed

Turn on `needs_user_decision` in the visible properties or checkbox cell.

The task will appear in **Needs my decision**. Use this for product direction, permissions, cost, privacy, deletion, publishing or anything you want to approve yourself.

When this is true, the AI assistant should explain the required decision in `What I need to decide`, stop at that boundary, and wait for you.

## 12. Ask an AI assistant to work on a task

Use short Quick Calls instead of long copy-and-paste prompts:

| Say | OmniBrain will |
| --- | -------------- |
| `Start OmniBrain.` | Orient to this project. |
| `New task: [task name].` | Create a safe task in Ideas. |
| `Work on [task name].` | Continue from that task record. |
| `My decisions?` | Show what needs your decision. |
| `Wrap up.` | Record where things stand. |
| `Keep as knowledge.` | Save approved lasting learning. |
| `Mark done.` | Mark the current task Done when decisions are resolved. |
| `Archive task.` | Move the current task to Archive after your instruction. |
| `Check OmniBrain.` | Run non-destructive OmniBrain checks. |
| `Update OmniBrain.` | Safely refresh the framework while preserving your content. |

Detailed behaviour is enforced by `Vault/Core_OS/Runtime/Entry.md`. The calls are examples, not exact-string commands; equivalent natural-language requests should be interpreted by intent.

## 13. Check and accept completed work

Ask the AI assistant what changed, what was checked and what still needs your decision.

Inspect the app or files yourself where it matters. Only move a task to `Done` when you accept the result.

## 14. Keep important project knowledge

When you are ready to close a task, say `Wrap up.` OmniBrain should record the current position, state what was checked, note anything uncertain or blocked, and ask whether anything should be kept as lasting project knowledge.

If the answer is no, leave the task as a working record. If the answer is yes, say `Keep as knowledge.` OmniBrain should update the owning System or Feature note, preserve existing knowledge, enrich it, and update the index if needed.

A completed task is not automatically permanent project knowledge.

## 15. Archive completed work

Use `Vault/Work/Archive/` for completed work you no longer want on the task board.

Move files there only when you mean to archive them. Do not archive files automatically just because the task is done.

## 16. Update OmniBrain safely

Say `Update OmniBrain.` to ask for a safe framework update.

> [!warning]
> `--force` can overwrite framework-owned OmniBrain files. Ask the AI assistant to confirm what will be refreshed and to preserve task Markdown files, archive files, project notes, host files, host configuration and the legacy `Vault/Dashboard.md`.

`--force` may refresh framework-owned files such as Core_OS, Start Here, both guides, the task board Base, Obsidian help files and OmniBrain scripts.

## 17. Back up or remove OmniBrain

> [!warning]
> Removing OmniBrain can delete your local project memory if you delete the wrong folders. Make a backup first and decide what to keep before removing files.

To remove OmniBrain, first confirm what you want to keep. Your project memory is in `Vault/Project/`. Your tasks are in `Vault/Work/Tasks/` and `Vault/Work/Archive/`.

Do not delete those folders unless you are certain you no longer need them.

## 18. Troubleshooting

| Symptom | What to do |
| ------- | ---------- |
| `omnibrain/omnibrain-setup.js` is missing. | Get the official files from `https://github.com/anthonytransform-ai/omnibrain`, place them under `omnibrain/`, and verify `omnibrain/omnibrain-templates/` exists before setup. |
| `node --version` does not work. | Stop. Install Node.js yourself or explicitly approve a trusted helper. Do not let OmniBrain setup pretend Node.js is available. |
| Start Here opens but the board is blank. | Enable the Bases core plugin in Obsidian and reopen the page. |
| A new task appears under `None`. | Open the task file and choose a stage in visible Obsidian properties. |
| A task is missing from Active work. | Check that it is under `Vault/Work/Tasks/`, has `type: omnibrain_task`, and is not set to `stage: Done`. |
| Setup reports missing templates. | Restore the `omnibrain-templates` folder and run setup again. |
| You are worried about project knowledge changes. | Ask the AI assistant to show proposed changes before changing `Vault/Project/**`. |

## 19. Privacy and local-file safety

OmniBrain stores its data in local Markdown files. Bases reads file properties and frontmatter from your vault.

OmniBrain does not add telemetry, hosted services or required API keys. Your AI assistant may have its own privacy and data-handling policy, so check that tool separately.

## 20. Plain-language glossary

- AI assistant: the tool you ask to help with the project.
- Bases: an Obsidian core plugin that shows local Markdown files in table-like views.
- Current work: the task files you are actively using.
- Project knowledge: durable facts about the product, system or feature.
- Task: one Markdown file under `Vault/Work/Tasks/`.
- Archive: a folder for work you want to keep but remove from the active board.
