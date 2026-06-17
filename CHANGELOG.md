# OmniBrain Changelog / 更新日誌

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
- **Cleaner Directives**: Removed all legacy Obsidian Dataview syntax and hardcoded references, ensuring maximum compatibility with any markdown editor.
- **Improved Automation**: `omnibrain-setup.js` now automatically scaffolds the new `Definition_of_Done.md`.

---

### 🇭🇰 / 🇹🇼 繁體中文
**Agent OS v1.1 架構升級與技術萃取**

本次發布將 OmniBrain 同步至 private Agent OS 最新的 v1.1 架構。雖然 OmniBrain 仍維持單一專案的設計，但我們將幾項強大的安全性與結構性強化功能，萃取並整合到了核心模板中。

**更新重點：**
- **起飛前身分確認 (Pre-Flight Identity Check)**：現在強制要求 AI 在規劃任何新功能前，必須讀取 `Dashboard.md` 並明確列出專案的技術堆疊 (Tech Stack)、資料庫與部署目標。此舉能有效「錨定」AI，大幅降低 AI 產生「幻覺」並給出錯誤框架程式碼的機率。
- **獨立的品質保證清單 (Definition of Done)**：將覆蓋率審查 (Coverage Audit) 從規劃指令中獨立出來，建立專屬的 `Definition_of_Done.md` 檔案。這讓開發團隊能更輕鬆地自訂專屬的 QA 需求（例如：響應式設計、錯誤處理等）。
- **更純淨的指令檔**：移除了所有舊版的 Obsidian Dataview 語法與寫死 (Hardcoded) 的路徑參照，確保與各種 Markdown 編輯器達到最高相容性。
- **自動化升級**：`omnibrain-setup.js` 現在會自動建立全新的 `Definition_of_Done.md` 檔案。
## v1.2.0 - Platform-neutral artifact safety

- Added an Artifact Inbox so AI assistants preserve important plans before context changes.
- Added optional, vendor-neutral External Sandbox Review guidance.
- Removed public-facing dependency on any single AI vendor or ecosystem.
- Updated review-role templates so they work whether the user's AI tool supports separate agents or only one chat.


