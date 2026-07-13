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

Copy this instruction into your AI assistant:

```text
Please install OmniBrain in this project folder.

First confirm the active project folder and show me the path. Then check whether Node.js is available by running `node --version`. Report the detected version. If Node.js is missing, stop, explain that OmniBrain setup requires Node.js, and do not install Node.js or other system software unless I explicitly approve that separate action.

Check whether `omnibrain/omnibrain-setup.js` already exists. If it exists, continue safely. If it does not exist, use the official source `https://github.com/anthonytransform-ai/omnibrain`. Obtain or guide me to obtain the official OmniBrain files, place the framework contents under this project folder as `omnibrain/`, and avoid leaving a nested `.git` repository inside my project. If you cannot download files yourself, give me simple instructions to use GitHub Code -> Download ZIP, extract the ZIP, rename the extracted folder to `omnibrain`, move it into this project folder, and remove any nested `.git` folder if one exists.

Before running setup, verify that `omnibrain/omnibrain-setup.js` and `omnibrain/omnibrain-templates/` both exist. Then run `node omnibrain/omnibrain-setup.js` from the project root.

Preserve existing project files, existing project scripts, existing project configuration, `Vault/Project/**`, `Vault/Dashboard.md`, `Vault/Work/Tasks/**`, and `Vault/Work/Archive/**`.

After setup, verify that `Vault/Start_Here.md`, both user guides, and `Vault/Work/Tasks/Task_Board.base` exist. If OmniBrain created the root `AGENTS.md`, verify that it contains the OmniBrain bootstrap. If an existing root `AGENTS.md` was preserved and `omnibrain/AGENTS.omnibrain-snippet.md` was generated, read both files, preserve all existing instructions, propose the exact merged change, and integrate the OmniBrain snippet only after I approve. If safe integration is not possible, explain the exact remaining action.

Inspect the project yourself for language, framework, database, build tools and deployment arrangement. Ask me no more than five product questions: what am I building or improving, who is it for, what should it help them do, how should it feel, and what actions must the AI always ask me about first. Use my answers to populate blank project documents. If existing project documents already contain meaningful content, preserve them and propose additions before changing established product statements or permission boundaries.

Tell me which `Vault/` folder to open in Obsidian and explain how to enable the Bases core plugin in ordinary language.
```

## 5. Manual installation

Manual installation is available for technical users.

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

Copy this instruction:

```text
Please read `Vault/Start_Here.md`, find the task named "[task filename]", and work only on that task. Use the task Markdown file as the current working record. If the task lacks these body headings, add them while preserving existing content: `## What we are trying to achieve`, `## What happens next`, `## What I need to decide`, and `## Useful notes`. Keep "What happens next" current. Record real user decisions. Use the least complicated safe way to complete the task. Do not create extra plans, branches, reviewers or handoff files unless they reduce a real risk. Run validation that is proportionate to the change. Do not silently move the task stage. You may recommend a stage, but change `stage` only if I directly instruct you. If `needs_user_decision` is true, explain the decision in `What I need to decide`, stop at that boundary, and wait for me. Stop and ask me before destructive, costly, privacy-sensitive, publishing or permission-changing actions.
```

## 13. Check and accept completed work

Ask the AI assistant what changed, what was checked and what still needs your decision.

Inspect the app or files yourself where it matters. Only move a task to `Done` when you accept the result.

## 14. Keep important project knowledge

When you are ready to close a task, copy this instruction:

```text
Please close this task carefully. Summarise what changed, state what was checked, and state anything uncertain or blocked. Ask me whether anything from this task should be kept as lasting project knowledge. Do not move the task to `Done` or `Vault/Work/Archive/` unless I directly instruct you to do that.
```

If the answer is no, leave the task as a working record. If the answer is yes, update the owning System or Feature note, preserve existing knowledge, enrich it, and update the index if needed.

A completed task is not automatically permanent project knowledge.

## 15. Archive completed work

Use `Vault/Work/Archive/` for completed work you no longer want on the task board.

Move files there only when you mean to archive them. Do not archive files automatically just because the task is done.

## 16. Update OmniBrain safely

Ask your AI assistant to run the safe setup command with `--force`.

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
