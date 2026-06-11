# OmniBrain Changelog / 更新日誌

## v1.1.0 - 2026-06-11

### 🇺🇸 English
**Agent OS v1.1 Upgrade Distillation**

This release brings OmniBrain up to date with the latest v1.1 architecture of the Antigravity Agent OS. While OmniBrain remains a single-project framework, we have distilled several powerful safety and structural enhancements into the core templates.

**What's New:**
- **Pre-Flight Identity Check**: The AI is now required to read `Dashboard.md` and explicitly confirm the project's tech stack, database, and deployment target before planning any features. This anchors the AI and significantly reduces "hallucination" where the AI suggests code from a different framework.
- **Extracted QA Checklist (Definition of Done)**: The Coverage Audit has been extracted from the planning directives into its own `Definition_of_Done.md` file. This makes it easier for teams to customize their specific QA requirements (e.g., mobile responsiveness, error handling).
- **Cleaner Directives**: Removed all legacy Obsidian Dataview syntax and hardcoded references, ensuring maximum compatibility with any markdown editor.
- **Improved Automation**: `omnibrain-setup.js` now automatically scaffolds the new `Definition_of_Done.md`.

---

### 🇭🇰 / 🇹🇼 繁體中文
**Agent OS v1.1 架構升級與技術萃取**

本次發布將 OmniBrain 同步至 Antigravity Agent OS 最新的 v1.1 架構。雖然 OmniBrain 仍維持單一專案的設計，但我們將幾項強大的安全性與結構性強化功能，萃取並整合到了核心模板中。

**更新重點：**
- **起飛前身分確認 (Pre-Flight Identity Check)**：現在強制要求 AI 在規劃任何新功能前，必須讀取 `Dashboard.md` 並明確列出專案的技術堆疊 (Tech Stack)、資料庫與部署目標。此舉能有效「錨定」AI，大幅降低 AI 產生「幻覺」並給出錯誤框架程式碼的機率。
- **獨立的品質保證清單 (Definition of Done)**：將覆蓋率審查 (Coverage Audit) 從規劃指令中獨立出來，建立專屬的 `Definition_of_Done.md` 檔案。這讓開發團隊能更輕鬆地自訂專屬的 QA 需求（例如：響應式設計、錯誤處理等）。
- **更純淨的指令檔**：移除了所有舊版的 Obsidian Dataview 語法與寫死 (Hardcoded) 的路徑參照，確保與各種 Markdown 編輯器達到最高相容性。
- **自動化升級**：`omnibrain-setup.js` 現在會自動建立全新的 `Definition_of_Done.md` 檔案。

