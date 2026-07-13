# Obsidian Guided Workspace Setup

Open the local `Vault/` folder in Obsidian Desktop.

## Required

1. Open Obsidian Desktop.
2. Choose **Open folder as vault**.
3. Select the `Vault/` folder inside your project folder.
4. Open `Start_Here.md`.
5. If the task board does not display, open Settings -> Core plugins and enable **Bases**.

## Not required for the Guided Workspace

The main Start Here page and Task Board do not require Dataview, Templates, Daily Notes, community plugins, hosted services or API keys.

The legacy `Dashboard.md` page may still use older Dataview query files if you choose to keep that view.

## Verify

From the project root, an AI assistant or technical user can run:

```bash
node omnibrain/scripts/obsidian-check.js
```

This check confirms the Vault has been opened and required Guided Workspace files exist. It does not claim Bases is active through undocumented Obsidian internal state.
