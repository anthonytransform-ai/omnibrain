# Instructions For Humans

This guide explains how to use OmniBrain v2 in plain, non-technical language.

OmniBrain v2 is a folder-based project memory system for people who build software using AI assistants. It creates a clean structure separating the AI's operating instructions from your actual project documentation. By opening the `Vault` folder in Obsidian Desktop, you get a clean visual dashboard, while the AI assistant reads the files directly from disk to stay on track.

---

## 🛠️ Getting Started (Prerequisites)

To use OmniBrain, you need:
1. **A project folder** on your computer.
2. **An AI coding assistant** (such as Gemini Antigravity, Claude, or any tool that has access to your workspace files).
3. **Obsidian Desktop** (Free download from [obsidian.md](https://obsidian.md)).
4. **Node.js** (Optional, but required to run the automated setup and health checks).

---

## 🚀 Setup Guide

### Step 1: Install Vault Files
Ask your AI assistant to read `AGENTS.md` and run the installer:
```bash
npm run setup
```
*(This command will safely create the new folders. If a file like `Project_Overview.md` already exists, it will NOT overwrite it unless you run `npm run setup -- --force`.)*

### Step 2: Configure Obsidian
1. Open Obsidian Desktop.
2. Select **"Open folder as vault"** and choose the `Vault/` directory inside your project.
3. Turn on Core Plugins:
   - Go to Settings (cog icon) -> **Core Plugins**.
   - Enable **Templates**.
   - Enable **Daily Notes**.
4. Enable Dataview Community Plugin:
   - Go to Settings -> **Community Plugins**.
   - Turn off "Restricted Mode".
   - Click "Browse", search for **Dataview**, install it, and enable it.
5. Set up Folder Paths:
   - **Templates:** Go to Settings -> Templates. Set the "Template folder path" to `Obsidian/Templates`.
   - **Daily Notes:** Go to Settings -> Daily Notes.
     - Set "New file location" to `Project/Daily_Logs`.
     - Set "Template file location" to `Obsidian/Templates/Daily_Log.md`.

### Step 3: Verify the Setup
Run this terminal command (or ask the AI to run it) to verify Obsidian is configured correctly:
```bash
npm run obsidian-check
```

---

## 🧭 Vault Layout for Humans

When you open Obsidian, you will work within these sections:

- **Dashboard.md** (Root): Your human control panel. It uses Dataview to dynamically list active plans, recent daily logs, and features.
- **Project/**: This is your project's memory.
  - `Project_Overview.md`: Fill this in with your tech stack, database details, and deployment targets.
  - `Current_State.md`: Tracks what is being worked on right now and list active blockers.
  - `Definition_of_Done.md`: Your checklist for when a task is officially complete.
  - `Plans/`: Stores implementation plans. When a plan is done, the AI archives it here.
  - `Daily_Logs/`: Stores daily logs. In Obsidian, click the "Open today's daily note" ribbon button to automatically scaffold today's log using the template.
  - `_inbox/`: Staging folder where the AI writes draft plans or reviews before you approve them.
- **Core_OS/**: Operating instructions for the AI. You do not need to modify these files. They define workflows (planning, implementation, review) and formatting standards.

---

## 🤝 Pair Programming with your AI

To ensure your AI assistant never gets lost or forgets your project goals, adopt these simple habits:

### 1. The Session Start Handshake
At the start of each session, tell the AI:
> "Please read the bootstrap AGENTS.md, orient yourself, and summarize the current project state from Project/Current_State.md."
This forces the AI to look at the project memory instead of guessing what was done last time.

### 2. Staged Work for Risky Changes
If you are asking the AI to perform a large UI change, write a major script, or update database structures, tell the AI:
> "Let's do this in stages."
The AI will halt, load the Staged Change workflow, write down a plan with discrete steps in `Project/_inbox/`, and wait for your approval before writing any code.

### 3. Update Project Knowledge
When the AI completes a coding task, tell the AI:
> "Please update the project knowledge."
The AI will extract durable truths (like a new API route, styling variables, or setup instructions) and add them to files under `Project/System/` or `Project/Features/`, then clean up the temporary plans.

---

## 🧹 Vault Maintenance

To keep the files organized, run these commands occasionally:

- **Check Vault Integrity:**
  ```bash
  npm run vault-health
  ```
  This scans all files for broken links, checks for valid frontmatter, and alerts you if the AI has leaked operational instructions (like "You are a coding agent") into your project memory.
- **Archive Completed Plans:**
  ```bash
  npm run vault-archive
  ```
  Scans plans older than 7 days. If they are marked `status: completed` in their frontmatter, it reports them. Run `npm run vault-archive -- --apply` to move them into year-month subfolders.
- **Repair Missing Frontmatter:**
  ```bash
  npm run vault-autotag -- --apply
  ```
  Automatically adds type headers to orphan files that lack frontmatter.

---

# 給使用者的說明（繁體中文）

這份指南用簡單且不涉及深奧技術的語言，說明如何使用 OmniBrain v2。

OmniBrain v2 是一個以資料夾為基礎的專案記憶系統，專為使用 AI 助手開發軟體的人所設計。它將 AI 的運行規則（Core_OS）與您的專案事實文件（Project）分開。透過在 Obsidian Desktop 中開啟 `Vault` 資料夾，您可以獲得精美的工作面板，而 AI 助手則會直接讀取磁碟上的檔案以保持開發方向正確。

---

## 🛠️ 開始前的準備工作

您需要準備：
1. 電腦中的一個**專案資料夾**。
2. 一個可以讀取和修改檔案的 **AI 開發助手** (例如 Gemini Antigravity, Claude, 或任何能存取工作區檔案的工具)。
3. **Obsidian Desktop** (從 [obsidian.md](https://obsidian.md) 免費下載並安裝)。
4. **Node.js** (選用，但若要執行自動化安裝與健康檢查則為必需)。

---

## 🚀 安裝與設定步驟

### 步驟 1：安裝 Vault 檔案
請 AI 助手閱讀 `AGENTS.md` 並執行安裝程式：
```bash
npm run setup
```
*(此指令會建立 v2 目錄結構。若 `Project_Overview.md` 等專案事實檔案已存在，預設「不會」將其覆寫。如需強制更新範本，請使用 `npm run setup -- --force`。)*

### 步驟 2：設定 Obsidian
1. 開啟 Obsidian Desktop。
2. 選擇 **"Open folder as vault"** (將資料夾開啟為儲存庫) 並選擇您專案中的 `Vault/` 目錄。
3. 啟用核心外掛 (Core Plugins)：
   - 點擊左下角設定 (齒輪圖示) -> **Core Plugins**。
   - 啟用 **Templates** (範本) 外掛。
   - 啟用 **Daily Notes** (每日筆記) 外掛。
4. 安裝並啟用 Dataview 社群外掛：
   - 點擊設定 -> **Community Plugins**。
   - 關閉 "Restricted Mode" (安全模式)。
   - 點擊 "Browse" (瀏覽)，搜尋 **Dataview**，安裝並啟用它。
5. 設定資料夾與範本路徑：
   - **Templates (範本):** 進入設定 -> Templates。將 "Template folder path" (範本資料夾路徑) 設定為 `Obsidian/Templates`。
   - **Daily Notes (每日筆記):** 進入設定 -> Daily Notes。
     - 將 "New file location" (新筆記儲存位置) 設定為 `Project/Daily_Logs`。
     - 將 "Template file location" (範本檔案位置) 設定為 `Obsidian/Templates/Daily_Log.md`。

### 步驟 3：驗證設定
在終端機中執行以下指令（或請 AI 執行），以檢查 Obsidian 外掛是否均正確啟用：
```bash
npm run obsidian-check
```

---

## 🧭 Vault 的版面配置

當您在 Obsidian 中開啟儲存庫時，將會看到以下主要部分：

- **Dashboard.md** (根目錄)：專屬人類的控制面版。它會透過 Dataview 自動搜尋並列出進行中的計劃、最近的每日筆記與功能清單。
- **Project/**：儲存您專案的記憶。
  - `Project_Overview.md`：在此填寫您的技術堆疊、資料庫規格與部署目標。
  - `Current_State.md`：記錄目前正在進行的工作以及存在的阻礙 (Blocker)。
  - `Definition_of_Done.md`：專案功能驗收與 QA 的標準檢查清單。
  - `Plans/`：存放開發計劃。當計劃完成後，AI 會將其歸檔於此。
  - `Daily_Logs/`：存放每日開發日誌。在 Obsidian 中，點擊左側「開啟今天的每日筆記」圖示，即可使用範本自動建立今天的日誌。
  - `_inbox/`：AI 暫存草稿計劃或審查報告的收件匣，確認後才搬移到正式目錄。
- **Core_OS/**：AI 的運作指引與標準，您不需修改此目錄的檔案。

---

## 🤝 如何與 AI 助手協同工作

為確保您的 AI 助手不會混亂或遺忘專案目標，請建立以下簡單的合作習慣：

### 1. 會話開始協定 (Start Handshake)
在每次新對話開始時，告訴 AI：
> 「請閱讀引導檔案 AGENTS.md，了解目前的專案進度，並從 Project/Current_State.md 摘要專案狀態。」
這能確保 AI 從專案事實檔案開始，而不是憑空猜測上次做到了哪裡。

### 2. Risky Work 的分階段流程 (Staged Work)
若要讓 AI 進行大幅度介面調整、撰寫關鍵 API 或更動資料庫結構時，告訴 AI：
> 「我們分階段處理。」
AI 將暫停當前工作，讀取 Staged Change 工作流，在 `Project/_inbox/` 中寫下各階段規劃，並在動工前等待您的核准。

### 3. 更新專案知識 (Update Knowledge)
當一個功能開發完畢且測試通過時，告訴 AI：
> 「請更新專案知識。」
AI 會將此次學到的事實（例如新註冊的路由、共用變數或安裝方式）整理寫入 `Project/System/` 或 `Project/Features/` 中，並清理暫存的計劃檔案。

---

## 🧹 儲存庫維護指令

為保持檔案整齊，您可以定期執行以下終端機維護指令：

- **檢查 Vault 完整性：**
  ```bash
  npm run vault-health
  ```
  這會檢查有無失效連結、YAML 格式是否正確，並檢查 AI 是否把運行指令（例如 "You are a coding agent"）意外寫入了專案事實文件中。
- **封存已完成計劃：**
  ```bash
  npm run vault-archive
  ```
  這會搜尋大於 7 天且標記為 `status: completed` 的計劃。使用 `npm run vault-archive -- --apply` 可將其移到以年月分類的封存資料夾。
- **自動標記 Frontmatter：**
  ```bash
  npm run vault-autotag -- --apply
  ```
  為遺漏 YAML Frontmatter 的計劃檔案自動加上類型與標籤。
