# OmniBrain Changelog / 更新日誌

## v2.0.2 - 2026-06-25

### English
- **Isolated Installation:** The installer no longer creates, merges, or modifies the host application's `package.json` or its `scripts/` folder.
- **Isolated framework folder:** Public users now clone/install OmniBrain inside an isolated `omnibrain/` subdirectory, and execute maintenance commands via direct node calls (e.g. `node omnibrain/...`).
- **Clean Public Bootstrap:** The public bootstrap file (`agents.template.md`) is now fully separated from J_OS routing. The framework repository's root `AGENTS.md` uses visible Markdown routing without HTML comments.
- **Safe Force Boundaries:** The `--force` flag in setup now only refreshes framework-owned operational files (`Vault/Core_OS/**` and `Vault/Obsidian/**`) and never overwrites user-owned project memory files (`Vault/Project/**`).

### 繁體中文
- **隔離式安裝：** 初始化設定不再新增、合併或修改宿主專案的 `package.json` 或其 `scripts/` 資料夾。
- **獨立框架目錄：** 公開使用者現在將 OmniBrain 安裝於獨立的 `omnibrain/` 子目錄中，並直接使用 node 執行維護指令（例如 `node omnibrain/...`）。
- **純淨公開引導：** 公開引導範本（`agents.template.md`）與 J_OS 路由協議完全分離。框架的根目錄 `AGENTS.md` 使用完全可見的 Markdown 路由，不使用 HTML 註解隱藏。
- **安全覆寫邊界：** `--force` 參數現在僅會覆寫框架擁有的運行規則檔案（`Vault/Core_OS/**` 與 `Vault/Obsidian/**`），絕不覆寫使用者擁有的專案事實記憶檔案（`Vault/Project/**`）。

## v2.0.0 - 2026-06-25

### English
**OmniBrain v2: Obsidian-integrated, Markdown-first AI Memory System**

- **Slim J_OS Runtime:** Refactored to separate AI operating instructions (`Core_OS/`) from project-specific memory (`Project/`).
- **Obsidian Integration:** Main Dashboard now transcludes Dataview queries (`Obsidian/Queries/Dashboard.md`) for humans, while AI agents boot cleanly via a lightweight 10-line `AGENTS.md`.
- **Safe Installer:** Setup is now idempotent and non-destructive by default. Added `omnibrain.config.json` configuration and `--force` parameter support.
- **Upgraded Validation:** Health check validation scans links robustly, validates frontmatter, and catches instruction leakage in project memory. Added `obsidian-check` to verify local Dataview configuration.
- **Vault Migration:** Migration utility backs up v1 vault to `_legacy/` and automatically cleans the root to set up a clean v2 structure.
- **Sandboxed Test Suite:** Added a robust test runner (`npm test`) validating idempotency, file protection, link integrity, leakage detection, and plugin presence.

### 繁體中文
**OmniBrain v2：結合 Obsidian 的 Markdown 優先 AI 記憶系統**

- **輕量化 J_OS 執行期：** 將 AI 運行規則（`Core_OS/`）與專案事實記憶（`Project/`）進行嚴格分離。
- **Obsidian 深度整合：** 主控制面板（`Dashboard.md`）改用 Dataview 查詢語法（`Obsidian/Queries/Dashboard.md`），AI 助手則透過 10 行的 `AGENTS.md` 自動引導開機。
- **無損安全安裝：** 初始化設定預設為無損（跳過已存在檔案），支援 `omnibrain.config.json` 設定檔及 `--force` 強制更新參數。
- **強化的健康度檢查：** `vault-health` 指令支援萬用連結解析、 frontmatter 驗證以及 Project 記憶區之 AI 指令洩漏檢查；新增 `obsidian-check` 驗證本地 Dataview 外掛啟用狀態。
- **資料庫遷移：** 遷移指令自動將 v1 檔案備份至 `_legacy/`，並清空根目錄以建立乾淨的 v2 結構。
- **沙盒測試套件：** 新增測試指令（`npm test`）驗證 setup 冪等性、檔案防覆寫保護、連結完整性、洩漏檢查及外掛狀態。

## v1.3.1 - 2026-06-20

### English
**Full public workflow port**

- Added staged workflow guidance for large, risky, or unclear AI-assisted changes.
- Added project context, product vision, knowledge format, and daily-log starter templates.
- Added public-safe knowledge maintenance rules for MOCs, daily logs, source discipline, and preserve-then-enrich updates.
- Added artifact mirroring guidance so useful AI-created work can be copied into the vault without depending on any specific AI platform.
- Added `npm run setup` as the public setup command.
- Updated public prompts and documentation with clearer workflow phrases for sync, staging, archive, and knowledge updates.

### 繁體中文
**完整公開工作流程移植**

- 加入分階段工作指引，協助處理較大、較高風險或範圍不清楚的 AI 協作修改。
- 加入專案背景、產品願景、知識格式和每日記錄起始模板。
- 加入公開安全的知識整理規則，涵蓋內容地圖、每日記錄、來源說明，以及「保留後補充」的更新方式。
- 加入產物鏡像保存指引，讓有用的 AI 產物可以保存到 vault，而不依賴特定 AI 平台。
- 加入 `npm run setup` 作為公開設定指令。
- 更新公開提示詞和文件，讓同步、分階段、封存和知識更新流程更清楚。

## v1.0.6 - 2026-06-17

### English
**Platform-neutral productization release**

- Added Artifact Inbox guidance so AI-generated plans, reviews, and handoffs are captured before they are archived.
- Added External Sandbox Review guidance as an optional, vendor-neutral way to get a second opinion on code, tests, and plans.
- Updated public documentation for non-technical users in English and Traditional Chinese.
- Removed public-facing dependency on any single AI vendor, ecosystem, or Obsidian community plugin.
- Updated review-role templates so OmniBrain works whether the user's AI tool supports separate agents or only one chat.
- Added maintenance scripts for vault health, archive, migration, and rule checks.

### 繁體中文
**平台中立產品化版本**

- 加入收件匣指引，讓 AI 產生的計劃、審查和交接資料先被保存，再決定是否封存。
- 加入外部沙盒審查指引，讓使用者可以用平台中立的方法取得第二意見。
- 更新公開說明文件，改用非技術使用者也容易理解的英文和繁體中文。
- 移除對單一 AI 供應商、生態系統或 Obsidian 社群外掛的公開依賴。
- 更新審查角色模板，無論 AI 工具是否支援分開的助手，都可以使用。
- 加入 vault 健康檢查、封存、遷移和規則檢查等維護指令.

## v1.1.0 - 2026-06-11

### 🇺🇸 English
**Agent OS v1.1 Upgrade Distillation**

This release brings OmniBrain up to date with the latest v1.1 architecture of the private Agent OS. While OmniBrain remains a single-project framework, we have distilled several powerful safety and structural enhancements into the core templates.

**What's New:**
- **Pre-Flight Identity Check**: The AI is now required to read `Dashboard.md` and explicitly confirm the project's tech stack, database, and deployment target before planning any features. This anchors the AI and significantly reduces "hallucination" where the AI suggests code from a different framework.
- **Extracted QA Checklist (Definition of Done)**: The Coverage Audit has been extracted from the planning directives into its own `Definition_of_Done.md` file. This makes it easier for teams to customize their specific QA requirements (e.g., mobile responsiveness, error handling).
- **Cleaner Directives**: Removed legacy plugin-specific syntax and hardcoded references, ensuring maximum compatibility with any markdown editor.
- **Improved Automation**: `omnibrain-setup.js` now automatically scaffolds the new `Definition_of_Done.md`.

---

### 🇭🇰 / 🇹🇼 繁體中文
**Agent OS v1.1 架構升級與技術萃取**

本次發布將 OmniBrain 同步至 private Agent OS 最新的 v1.1 架構。雖然 OmniBrain 仍維持單一專案的設計，但我們將幾項強大的安全性與結構性強化功能，萃取並整合到了核心模板中。

**更新重點：**
- **起飛前身分確認 (Pre-Flight Identity Check)**：現在強制要求 AI 在規劃任何新功能前，必須讀取 `Dashboard.md` 並明確列出專案的技術堆疊 (Tech Stack)、資料庫與部署目標。此舉能有效「錨定」AI，大幅降低 AI 產生「幻覺」並給出錯誤框架程式碼的機率。
- **獨立的品質保證清單 (Definition of Done)**：將覆蓋率審查 (Coverage Audit) 從規劃指令中獨立出來，建立專屬的 `Definition_of_Done.md` 檔案。這讓開發團隊能更輕鬆地自訂專屬的 QA 需求（例如：響應式設計、錯誤處理等）。
- **更純淨的指令檔**：移除了舊版外掛專用語法與寫死 (Hardcoded) 的路徑參照，確保與各種 Markdown 編輯器達到最高相容性。
- **自動化升級**：`omnibrain-setup.js` 現在會自動建立全新的 `Definition_of_Done.md` 檔案。
## v1.2.0 - Platform-neutral artifact safety

- Added an Artifact Inbox so AI assistants preserve important plans before context changes.
- Added optional, vendor-neutral External Sandbox Review guidance.
- Removed public-facing dependency on any single AI vendor or ecosystem.
- Updated review-role templates so they work whether the user's AI tool supports separate agents or only one chat.


