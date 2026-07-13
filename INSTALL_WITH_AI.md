# Install OmniBrain With An AI Coding Assistant

This file is an operational contract for AI coding assistants. It is not a human tutorial.

## User-Facing Request

The user may provide only:

```text
https://github.com/anthonytransform-ai/omnibrain
Install this in my current project. Preserve my existing files and guide me through anything that needs my decision.
```

Treat the active workspace as the host project that should receive OmniBrain.

## Installation Contract

1. Confirm the active host project folder.
   - Report the path you found.
   - Inspect the existing project before asking technical questions.
   - Do not ask the user to identify language, framework, scripts or package manager if you can inspect them.

2. Inspect the official source.
   - Use `https://github.com/anthonytransform-ai/omnibrain` as the official repository URL.
   - Obtain the repository contents using the safest available temporary method for the environment.
   - Do not create a hosted installer or use an unofficial mirror.

3. Check Node.js before setup.
   - Run `node --version` if commands are available.
   - Report the detected version.
   - If Node.js is unavailable, stop truthfully and explain that OmniBrain setup requires Node.js.
   - Do not install Node.js, Git, Obsidian or other system software without explicit user approval.

4. Place the framework in the host project.
   - Put OmniBrain framework contents under `omnibrain/` in the host project root.
   - Verify `omnibrain/omnibrain-setup.js` exists.
   - Verify `omnibrain/omnibrain-templates/` exists.
   - Do not leave a nested `.git` repository inside the host project.
   - If a temporary clone was used, copy the working files into `omnibrain/` without the nested `.git` directory, or remove the nested `.git` before continuing.

5. Preserve host-owned files.
   - Preserve existing `package.json`.
   - Preserve existing host `scripts/`.
   - Preserve existing root `AGENTS.md`.
   - Preserve existing host source files, docs, config and app data.
   - Preserve any existing `Vault/Project/**`, `Vault/Work/Tasks/**`, `Vault/Work/Archive/**` and `Vault/Dashboard.md`.
   - Do not reset, clean, stash or discard existing host work.

6. Run setup from the host project root.
   - Run `node omnibrain/omnibrain-setup.js`.
   - If setup fails, report what was found, what was not completed, whether files changed, and the next safe action.

7. Handle root `AGENTS.md`.
   - If OmniBrain created root `AGENTS.md`, verify it contains the OmniBrain bootstrap.
   - If an existing root `AGENTS.md` was preserved and `omnibrain/AGENTS.omnibrain-snippet.md` was generated, read both files.
   - Preserve all existing instructions.
   - Propose the exact merged change before editing established instructions.
   - Integrate the OmniBrain snippet only when the merge is safe and the user approves.
   - If integration cannot be completed safely, explain the exact remaining action.

8. Ask only the approved product questions.
   - Ask no more than five product questions:
     1. What are you building or improving?
     2. Who is it for?
     3. What should it help them do?
     4. How should it feel?
     5. What actions must the AI always ask about first?
   - Do not ask unnecessary technical questions that can be answered by inspecting the host project.

9. Validate the installation.
   - Verify these files exist:
     - `Vault/Start_Here.md`
     - `Vault/Help/User_Guide.en.md`
     - `Vault/Help/User_Guide.zh-Hant.md`
     - `Vault/Work/Tasks/Task_Board.base`
     - `Vault/Obsidian/Queries/Dashboard.md`
   - Run `node omnibrain/scripts/vault-health.js` when available.
   - Do not assume the host application's test command is `npm test`; inspect the host project first.

10. Give a truthful final handoff.
    - State what was completed.
    - State what was preserved.
    - State what was checked.
    - State anything uncertain or blocked.
    - Tell the user to open the host project's `Vault/` folder in Obsidian Desktop.
    - Explain in ordinary language that Bases is an Obsidian core plugin to enable if the task board does not display.

## Failure Reporting

If installation cannot complete, do not pretend success. Report:

- what was found;
- what was not completed;
- whether any files were changed;
- the safest next action for the user.

