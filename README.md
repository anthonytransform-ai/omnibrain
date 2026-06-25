# OmniBrain v2

OmniBrain is a portable, Markdown-first memory system for AI-assisted work, optimized for a seamless human experience using Obsidian Desktop.

It turns any project folder into a structured workspace where AI agents and coding assistants can retain memory of goals, decisions, plans, review notes, and history across sessions, while providing you with an organized dashboard in Obsidian.

You do not need to be a developer to use OmniBrain. It is designed for non-technical visionaries and product managers who pair-program or build with AI.

---

## Key Principles of v2

- **Markdown-first for AI Agents:** Agents boot using a clean, 10-line `AGENTS.md` entry point, minimizing token clutter and keeping context loaded only as needed.
- **Obsidian-first for Humans:** Humans open the vault in Obsidian Desktop to view clean boards, logs, and Dataview dashboard queries.
- **Strict Separation of Planes:** AI operational rules and guidelines live in `Core_OS/`. Project-specific facts, history, and status live in `Project/`.
- **Non-Destructive Safety:** Setup and maintenance scripts default to check/report modes, protecting your project memory from accidental overwrites.
- **Task-Scoped Loading:** Workflows load only the relevant project memory files to prevent context bloat.

---

## Required Tools (Human UI)

OmniBrain v2 officially supports and recommends:
- **Obsidian Desktop** (to open the local `Vault` directory as a vault).
- **Templates** (Core Plugin) — configured to point to `Obsidian/Templates`.
- **Daily Notes** (Core Plugin) — configured to point to `Project/Daily_Logs` using the template `Obsidian/Templates/Daily_Log.md`.
- **Dataview** (Community Plugin) — required to render the read-only dashboard queries.

---

## How to Install & Run

1. Place the OmniBrain repository contents inside your project root.
2. In your AI coding assistant, run the setup task to scaffold the folders:
   ```bash
   npm run setup
   ```
   *(Note: Setup is safe and will never overwrite existing project files. To force template updates, use `npm run setup -- --force`.)*
3. Open the `Vault/` directory in Obsidian Desktop.
4. Follow the onboarding instructions in `Vault/Obsidian/INSTALL.md` to enable community plugins and templates.
5. Verify your installation by running:
   ```bash
   npm run obsidian-check
   ```
6. Ask your AI coding assistant to read the project root `AGENTS.md` and orient itself.

---

## What Gets Created

The `Vault/` directory scaffolds the following clean structure:

```text
Vault/
├─ Core_OS/
│  ├─ Runtime/Entry.md               ← Agent boot protocol
│  ├─ Registries/Workflow_Registry.md ← Operational workflow index
│  ├─ Workflows/                     ← Feature scoping, planning, implementation, review rules
│  ├─ Standards/Anti_Patterns.md     ← Lint rules parsed by check-ai-rules
│  ├─ Standards/Knowledge_Format.md  ← Frontmatter and formatting guidelines
│  └─ Validation/Vault_Health_Check.md ← Vault sanity rules
│
├─ Project/
│  ├─ Project_Overview.md            ← Tech stack and permission boundaries
│  ├─ Current_State.md               ← Active tasks, blockers, and recent changes
│  ├─ Definition_of_Done.md          ← Sprint checklists and QA rules
│  ├─ System/_System_MOC.md          ← Index for system architecture and vision docs
│  ├─ Features/_Features_MOC.md      ← Index for feature-specific rules
│  ├─ Plans/                         ← Active/completed implementation plans
│  ├─ Daily_Logs/                    ← Dated human and AI logs
│  └─ _inbox/                        ← Staging area for raw AI artifacts
│
├─ Obsidian/
│  ├─ INSTALL.md                     ← User onboarding instructions
│  ├─ Templates/Daily_Log.md         ← Daily note template
│  └─ Queries/Dashboard.md           ← Dataview dashboard query scripts
│
└─ Dashboard.md                      ← Root Dashboard transcluding query embeds
```

---

## CLI Utilities

If Node.js is available in your workspace, the following scripts help maintain and test the vault:

| Command | Purpose | Default Mode | Force / Apply Flag |
| :--- | :--- | :--- | :--- |
| `npm run setup` | Scaffolds directories and copies v2 templates | Non-destructive (skips existing) | `npm run setup -- --force` |
| `npm run obsidian-check` | Checks that Obsidian is opened and Dataview is active | Validation report | N/A |
| `npm run vault-health` | Scans links, frontmatter, and looks for rule leakage | Integrity validator | N/A |
| `npm run vault-autotag` | Fixes plans missing frontmatter tags | Report-only | `npm run vault-autotag -- --apply` |
| `npm run vault-archive` | Archives completed plans older than 7 days | Report-only | `npm run vault-archive -- --apply` |
| `npm run vault-maintenance` | Combines autotag, health validation, and archiving | Report-only | Runs autotag/archive with `--apply` |
| `npm run omnibrain-migrate` | Migrates v1 vault files into the v2 structure | Interactive backing up | Automatically backs up to `_legacy/` |
| `npm test` | Runs the test suite verifying setup, safety, and health checks | Clean sandbox runner | N/A |

---

# OmniBrain v2（繁體中文）

OmniBrain 是一套可攜式的 Markdown 檔案記憶系統，專為搭配 AI 進行軟體開發而設計，並針對 **Obsidian Desktop** 提供最佳的人類操作介面。

它能將任何專案資料夾轉換為結構化的工作空間，讓 AI 代理程式在多次會話之間能確實記住目標、決定、計劃、審查和歷史進度，同時在 Obsidian 中提供直覺的工作面板。

你不需要是程式設計師也能使用 OmniBrain。它是為使用 AI Scoping 專案、審查結果和制定決策的專案經理與願景提出者所設計。

---

## v2 核心原則

- **AI 代理 Markdown 優先：** AI 從乾淨的 10 行 `AGENTS.md` 開始開機引導，避免 context 浪費，僅在需要時加載細節。
- **人類 Obsidian 優先：** 人類在 Obsidian Desktop 中開啟 `Vault` 資料夾，即可瀏覽乾淨的看板、每日記錄以及由 Dataview 驅動的 Dashboard。
- **嚴格的控制面與記憶面分離：** AI 的運行規則、標準與流程檔案放置於 `Core_OS/`。專案事實、規劃與歷史進度放置於 `Project/`。
- **無損安全設計：** 所有初始化與維護指令預設為「僅報告」模式，保護您的專案檔案不被意外覆寫。
- **任務範疇限制載入：** AI 僅載入與目前任務相關的專案記憶檔案，避免對話上下文膨脹。

---

## 軟體需求（Obsidian 社群外掛）

OmniBrain v2 官方支援並推薦：
- **Obsidian Desktop** (在 Obsidian 中將 `Vault/` 資料夾開啟為儲存庫)。
- **Templates** (內建核心外掛) — 設定範本路徑為 `Obsidian/Templates`。
- **Daily Notes** (內建核心外掛) — 設定記錄路徑為 `Project/Daily_Logs`，範本路徑為 `Obsidian/Templates/Daily_Log.md`。
- **Dataview** (社群外掛) — 用於在 Dashboard 中渲染唯讀的動態查詢結果。

---

## 安裝與執行步驟

1. 將此儲存庫的所有內容複製到專案根目錄下。
2. 請 AI 助手或在終端機執行初始化，以建立目錄結構：
   ```bash
   npm run setup
   ```
   *(註：此動作不會覆寫您已存在的專案檔案。如需強制更新範本，請使用 `npm run setup -- --force`。)*
3. 在 Obsidian Desktop 中開啟 `Vault/` 資料夾。
4. 按照 `Vault/Obsidian/INSTALL.md` 中的指引啟用核心外掛與 Dataview 社群外掛。
5. 執行以下指令驗證 Obsidian 設定是否完成：
   ```bash
   npm run obsidian-check
   ```
6. 請您的 AI 助手閱讀專案根目錄的 `AGENTS.md` 以進行引導與任務開始。

---

## 資料夾結構說明

`Vault/` 目錄將建立以下結構：

```text
Vault/
├─ Core_OS/
│  ├─ Runtime/Entry.md               ← AI 開機開機引導協議
│  ├─ Registries/Workflow_Registry.md ← AI 任務工作流路由表
│  ├─ Workflows/                     ← 專案規劃、實作、Staged Change、知識 distill 與審查規則
│  ├─ Standards/Anti_Patterns.md     ← AI 程式碼品質 Lint 規則
│  ├─ Standards/Knowledge_Format.md  ← YAML 與 Markdown 文件標準格式
│  └─ Validation/Vault_Health_Check.md ← Vault 健康度檢查規則
│
├─ Project/
│  ├─ Project_Overview.md            ← 專案開發規格與 AI 權限邊界
│  ├─ Current_State.md               ← 進行中工作、Blocker 與最新每日日誌連結
│  ├─ Definition_of_Done.md          ← 驗收與 QA 檢查清單
│  ├─ System/_System_MOC.md          ← 系統架構與產品願景文件地圖
│  ├─ Features/_Features_MOC.md      ← 專案功能規格文件地圖
│  ├─ Plans/                         ← 執行中與完成的開發計劃
│  ├─ Daily_Logs/                    ← 每日開發與會話日誌
│  └─ _inbox/                        ← 暫存的原始 AI 產出物
│
├─ Obsidian/
│  ├─ INSTALL.md                     ← Obsidian 啟用步驟說明
│  ├─ Templates/Daily_Log.md         ← 每日筆記範本
│  └─ Queries/Dashboard.md           ← Dataview 看板查詢語法
│
└─ Dashboard.md                      ← 整合 Dataview 查詢之人類主工作面板
```

---

## 終端機維護指令

若您的工作區有 Node.js 環境，可使用以下指令進行維護與測試：

| 指令 | 用途 | 預設模式 | 強制 / 執行參數 |
| :--- | :--- | :--- | :--- |
| `npm run setup` | 建立目錄並複製 v2 範本 | 無損（跳過已存在檔案） | `npm run setup -- --force` |
| `npm run obsidian-check` | 檢查 Obsidian 是否開啟並啟用 Dataview | 驗證報告 | 無 |
| `npm run vault-health` | 檢查連結、YAML 格式與是否存在 AI 規則洩漏 | 完整性檢查 | 無 |
| `npm run vault-autotag` | 為遺漏 YAML 標籤的 Plans 自動新增 frontmatter | 僅報告 | `npm run vault-autotag -- --apply` |
| `npm run vault-archive` | 封存大於 7 天且已完成的 Plans | 僅報告 | `npm run vault-archive -- --apply` |
| `npm run vault-maintenance` | 同時執行 autotag、health 檢查與計劃封存 | 僅報告 | 執行 autotag/archive 時帶入 `--apply` |
| `npm run omnibrain-migrate` | 將舊版 v1 Vault 檔案搬移至 v2 結構中 | 自動備份 | 自動將舊檔案搬移至 `_legacy/` |
| `npm test` | 在沙盒環境中執行 setup、安全保護與健康度整合測試 | 測試執行 | 無 |
