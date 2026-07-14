# OmniBrain v2.0.3

**Project status:** OmniBrain v2.0.3 is the current stable version. Feature development is paused while the project validates whether OmniBrain provides a sufficiently distinct and useful experience for non-engineer AI builders. Critical defects and installation problems may still be repaired.

OmniBrain is a portable, Markdown-first project-memory framework for AI-assisted work.

It helps an AI coding assistant retain goals, decisions, plans, review notes, and project history across sessions. Obsidian Desktop can provide a human-readable view of those Markdown files.

OmniBrain v2.0.3 still requires Node.js, Obsidian configuration, and Dataview. The current interface is best suited to users who are comfortable following structured technical guidance. The intended non-engineer experience remains under evaluation.

Current public release: v2.0.3 correctness repair. Fresh installs include the Dashboard query file required by `Vault/Dashboard.md`, and public users should run direct `node omnibrain/...` commands from the host project root.

---

## Key Principles of v2

- **Markdown-first for AI Agents:** Agents boot using a clean, 10-line `AGENTS.md` entry point, minimizing token clutter and keeping context loaded only as needed.
- **Obsidian-first for Humans:** Humans open the vault in Obsidian Desktop to view clean boards, logs, and Dataview dashboard queries.
- **Strict Separation of Planes:** AI operational rules and guidelines live in `Core_OS/`. Project-specific facts, history, and status live in `Project/`.
- **Non-Destructive Safety:** Setup and maintenance scripts default to check/report modes, protecting your project memory from accidental overwrites.
- **Task-Scoped Loading:** Workflows load only the relevant project memory files to prevent context bloat.

---

## Known limitations

- Node.js is required for setup and validation.
- The v2.0.3 Obsidian dashboard requires Dataview.
- The dashboard exposes project structure and metadata rather than fully hiding technical concepts.
- The non-engineer experience has not yet been validated with a representative user group.
- Different AI assistants may interpret workflow instructions differently.

---

## Required Tools (Human UI)

OmniBrain v2 officially supports and recommends:
- **Obsidian Desktop** (to open the local `Vault` directory as a vault).
- **Templates** (Core Plugin) — configured to point to `Obsidian/Templates`.
- **Daily Notes** (Core Plugin) — configured to point to `Project/Daily_Logs` using the template `Obsidian/Templates/Daily_Log.md`.
- **Dataview** (Community Plugin) — required to render the read-only dashboard queries.

---

## How to Install & Run

1. Place the OmniBrain repository contents inside your project root under an `omnibrain/` subdirectory.
2. In your AI coding assistant, run the setup task to scaffold the folders:
   ```bash
   node omnibrain/omnibrain-setup.js
   ```
   *(Note: Setup is safe and will never overwrite existing project files. To force template updates, use `node omnibrain/omnibrain-setup.js --force`.)*
3. Open the `Vault/` directory in Obsidian Desktop.
4. Follow the onboarding instructions in `Vault/Obsidian/INSTALL.md` to enable community plugins and templates.
5. Verify your installation by running:
   ```bash
   node omnibrain/scripts/obsidian-check.js
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

If Node.js is available in your workspace, the following scripts help maintain and test the vault. Public users should run direct `node omnibrain/...` commands from the host project root:

| Command | Purpose | Default Mode | Force / Apply Flag |
| :--- | :--- | :--- | :--- |
| `node omnibrain/omnibrain-setup.js` | Scaffolds directories and copies v2 templates | Non-destructive (skips existing) | `--force` |
| `node omnibrain/scripts/obsidian-check.js` | Checks that Obsidian is opened and Dataview is active | Validation report | N/A |
| `node omnibrain/scripts/vault-health.js` | Scans links, frontmatter, and looks for rule leakage | Integrity validator | N/A |
| `node omnibrain/scripts/vault-autotag.js` | Fixes plans missing frontmatter tags | Report-only | `--apply` |
| `node omnibrain/scripts/vault-archive.js` | Archives completed plans older than 7 days | Report-only | `--apply` |
| `node omnibrain/scripts/omnibrain-migrate.js` | Migrates v1 vault files into the v2 structure | Interactive backing up | Automatically backs up to `_legacy/` |

*(Note: `npm test` and other npm script definitions inside the `omnibrain/package.json` are reserved for framework self-development within the framework repository itself.)*

---

# OmniBrain v2（繁體中文）

**專案狀態：** OmniBrain v2.0.3 是目前的穩定版本。功能開發現已暫停，期間將驗證 OmniBrain 是否能為非工程背景的 AI 應用開發者提供足夠獨特而實際的價值。嚴重錯誤及安裝問題仍可能獲得修正。

OmniBrain 是一套可攜式、以 Markdown 為核心的 AI 協作專案記憶框架。

它協助 AI 助手在不同工作階段保留目標、決定、計劃、審查紀錄及專案歷史。Obsidian Desktop 可提供較容易閱讀的檔案視圖。

OmniBrain v2.0.3 仍需要 Node.js、Obsidian 設定及 Dataview。現有介面較適合能夠依照結構化技術指引操作的使用者。針對非工程背景使用者的實際體驗仍在評估中。

---

## v2 核心原則

- **AI 代理 Markdown 優先：** AI 從乾淨的 10 行 `AGENTS.md` 開始開機引導，避免 context 浪費，僅在需要時加載細節。
- **人類 Obsidian 優先：** 人類在 Obsidian Desktop 中開啟 `Vault` 資料夾，即可瀏覽乾淨的看板、每日記錄以及由 Dataview 驅動的 Dashboard。
- **嚴格的控制面與記憶面分離：** AI 的運行規則、標準與流程檔案放置於 `Core_OS/`。專案事實、規劃與歷史進度放置於 `Project/`。
- **無損安全設計：** 所有初始化與維護指令預設為「僅報告」模式，保護您的專案檔案不被意外覆寫。
- **任務範疇限制載入：** AI 僅載入與目前任務相關的專案記憶檔案，避免對話上下文膨脹。

---

## 已知限制

- setup 及驗證需要 Node.js。
- v2.0.3 的 Obsidian Dashboard 需要 Dataview。
- Dashboard 會顯示專案結構及 metadata，並未完全隱藏技術概念。
- 非工程背景使用者的體驗尚未以具代表性的使用者群組驗證。
- 不同 AI 助手可能會以不同方式理解工作流程指引。

---

## 軟體需求（Obsidian 社群外掛）

OmniBrain v2 官方支援並推薦：
- **Obsidian Desktop** (在 Obsidian 中將 `Vault/` 資料夾開啟為儲存庫)。
- **Templates** (內建核心外掛) — 設定範本路徑為 `Obsidian/Templates`。
- **Daily Notes** (內建核心外掛) — 設定記錄路徑為 `Project/Daily_Logs`，範本路徑為 `Obsidian/Templates/Daily_Log.md`。
- **Dataview** (社群外掛) — 用於在 Dashboard 中渲染唯讀的動態查詢結果。

---

## 安裝與執行步驟

1. 將此儲存庫的所有內容複製到專案根目錄下的 `omnibrain/` 資料夾中。
2. 請 AI 助手或在終端機執行初始化，以建立目錄結構：
   ```bash
   node omnibrain/omnibrain-setup.js
   ```
   *(註：此動作不會覆寫您已存在的專案檔案。如需強制更新範本，請使用 `node omnibrain/omnibrain-setup.js --force`。)*
3. 在 Obsidian Desktop 中開啟 `Vault/` 資料夾。
4. 按照 `Vault/Obsidian/INSTALL.md` 中的指引啟用核心外掛與 Dataview 社群外掛。
5. 執行以下指令驗證 Obsidian 設定是否完成：
   ```bash
   node omnibrain/scripts/obsidian-check.js
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

若您的工作區有 Node.js 環境，可使用以下指令進行維護與測試。一般使用者應直接在專案根目錄執行 `node omnibrain/...` 指令：

| 指令 | 用途 | 預設模式 | 強制 / 執行參數 |
| :--- | :--- | :--- | :--- |
| `node omnibrain/omnibrain-setup.js` | 建立目錄並複製 v2 範本 | 無損（跳過已存在檔案） | `--force` |
| `node omnibrain/scripts/obsidian-check.js` | 檢查 Obsidian 是否開啟並啟用 Dataview | 驗證報告 | 無 |
| `node omnibrain/scripts/vault-health.js` | 檢查連結、YAML 格式與是否存在 AI 規則洩漏 | 完整性檢查 | 無 |
| `node omnibrain/scripts/vault-autotag.js` | 為遺漏 YAML 標籤的 Plans 自動新增 frontmatter | 僅報告 | `--apply` |
| `node omnibrain/scripts/vault-archive.js` | 封存大於 7 天且已完成的 Plans | 僅報告 | `--apply` |
| `node omnibrain/scripts/omnibrain-migrate.js` | 將舊版 v1 Vault 檔案搬移至 v2 結構中 | 自動備份 | 自動將舊檔案搬移至 `_legacy/` |

*(註：`omnibrain/package.json` 中的 `npm test` 及其他 npm 指令僅限於框架本身開發與維護時使用。)*
