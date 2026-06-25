# Obsidian Onboarding & Installation

Follow these steps to set up Obsidian Desktop to work with the OmniBrain vault.

## Required Steps
1. **Download & Install:** Download Obsidian Desktop from [obsidian.md](https://obsidian.md) and install it.
2. **Open Vault:** Open Obsidian, click "Open folder as vault", and select the `<project-root>/Vault` directory.
3. **Core Plugins:**
   - Go to Settings (cog icon) -> Core Plugins.
   - Enable **Templates**.
   - Enable **Daily Notes**.
4. **Community Plugins:**
   - Go to Settings -> Community Plugins.
   - Click "Turn on community plugins" (disables restricted mode).
   - Click "Browse" under Community Plugins, search for **Dataview**, install it, and enable it.
5. **Configure Folders & Paths:**
   - **Templates:** Go to Settings -> Templates. Set "Template folder path" to `Obsidian/Templates`.
   - **Daily Notes:** Go to Settings -> Daily Notes.
     - Set "New file location" to `Project/Daily_Logs`.
     - Set "Template file location" to `Obsidian/Templates/Daily_Log.md`.

## Verify Installation
Run the automated check tool from the project root:
`npm run obsidian-check`
