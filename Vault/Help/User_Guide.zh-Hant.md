---
type: user_guide
language: zh-Hant
status: active
tags: [omnibrain, user_guide, guided_workspace]
---

# OmniBrain 使用指南

這是 OmniBrain v2.1.0 的繁體中文指南。合併前請由 K 進行文字審閱。

## 三分鐘快速開始

1. 請 AI 助手在你的專案（項目）資料夾安裝 OmniBrain。
2. 在 Obsidian Desktop 開啟 `Vault/Start_Here.md`。
3. 如果工作面板沒有顯示，請啟用 Bases 核心外掛。
4. 在工作面板按 **New** 建立一個工作項目。
5. 請 AI 助手依工作項目名稱開始協助。

## 1. What OmniBrain is

OmniBrain 是給 AI 協作專案使用的本機工作空間。它用純 Markdown 檔案保存專案筆記、目前工作、決定和操作指引。

你用 Obsidian 查看工作空間。你的 AI 助手也讀取同一批檔案來理解目前狀態。

## 2. What OmniBrain does not do

OmniBrain 不會取代你的應用程式、不會部署成果、不會加入遙測、不需要 API key，也不依賴雲端服務。

它不會替你作產品決定。它會幫你看清目前進度，以及哪些地方需要你決定。

## 3. What you need before starting

你需要一個專案資料夾、一個可以處理本機檔案的 AI 助手，以及 Obsidian Desktop。

Guided Workspace 只需要 Obsidian 的 Bases 核心外掛。主要工作面板不需要 Dataview、Templates、Daily Notes 或社群外掛。

表格式工作面板需要支援 table view 的 Obsidian Bases。Obsidian 官方文件列明 table view 可由 Obsidian 1.9 起使用。

## 4. Install with an AI assistant

請複製以下指示給你的 AI 助手：

```text
Please install OmniBrain in this project folder. First confirm the active project folder. Check whether OmniBrain is already installed. If it is not installed, run the safe setup command from the project root: node omnibrain/omnibrain-setup.js. Preserve existing host files, host scripts, host configuration, Vault/Project/**, Vault/Dashboard.md and any existing task files. Inspect the project yourself for language, framework, database, build tools and deployment arrangement. Ask me no more than five product questions: what am I building or improving, who is it for, what should it help them do, how should it feel, and what actions must the AI always ask me about first. Use my answers to populate blank project documents. If existing project documents already contain meaningful content, preserve them and propose additions before changing established product statements or permission boundaries. Verify that Vault/Start_Here.md, both user guides and Vault/Work/Tasks/Task_Board.base exist. Tell me which Vault folder to open in Obsidian and explain how to enable the Bases core plugin in ordinary language. Do not install Node.js, Git, Obsidian or system software automatically.
```

## 5. Manual installation

手動安裝適合有技術背景的使用者。

在專案根目錄執行：

```bash
node omnibrain/omnibrain-setup.js
```

日後如需重新整理 OmniBrain 框架擁有的檔案，請執行：

```bash
node omnibrain/omnibrain-setup.js --force
```

警告：更新 OmniBrain 時，不要刪除 `Vault/Project/`、`Vault/Work/Tasks/`、`Vault/Work/Archive/` 或宿主應用程式檔案。

## 6. Open OmniBrain in Obsidian

開啟 Obsidian Desktop。選擇 **Open folder as vault**，然後選取專案資料夾內的 `Vault/` 資料夾。

然後開啟 `Start_Here.md`。

## 7. Enable Bases

在 Obsidian 開啟設定。前往 **Core plugins**。啟用 **Bases**。

如果工作面板沒有顯示，請啟用 Bases，然後重新開啟 `Start_Here.md`。OmniBrain 不會檢查未公開的 Obsidian 內部狀態，所以檢查工具只會給出啟用指引，不會聲稱 Bases 已啟用。

## 8. Use Start Here

`Start_Here.md` 是你的首頁。它連結到專案筆記、兩份使用指南，以及目前工作面板。

不要把長期專案事實直接寫在 Start Here。請把事實放在所屬的專案筆記，例如 Project Overview、Current State 或 Product Vision。

## 9. Create your first task

開啟 Active work 面板。使用可見的 **New** 動作。

Obsidian 會在 `Vault/Work/Tasks/` 下建立新的 Markdown 檔案。請把檔名改成工作項目標題。填寫 summary，並透過可見的 Obsidian properties 選擇 stage。

新的工作項目可能會先顯示在 `None` 分組，直到你選擇 stage。這是可接受的行為。

## 10. Understand the six stages

請使用以下固定英文 stage 值：

- `Ideas`：構想。
- `Planning`：規劃中。
- `Ready`：準備開始。
- `In progress`：進行中。
- `Check and decide`：檢查及決定。
- `Done`：已完成。

## 11. Mark that a decision is needed

在可見的 properties 或 checkbox 儲存格開啟 `needs_user_decision`。

該工作項目會出現在 **Needs my decision**。當事項涉及產品方向、權限、成本、私隱、刪除、發布，或任何你希望先批准的事情時，請使用這個標記。

## 12. Ask an AI assistant to work on a task

請複製以下指示：

```text
Please read Vault/Start_Here.md, find the task named "[task filename]", and work only on that task. Use the task Markdown file as the current working record. Keep "What happens next" current. Record real user decisions. Use the least complicated safe way to complete the task. Do not create extra plans, branches, reviewers or handoff files unless they reduce a real risk. Run validation that is proportionate to the change. Stop and ask me before destructive, costly, privacy-sensitive, publishing or permission-changing actions.
```

## 13. Check and accept completed work

請 AI 助手說明改了甚麼、檢查了甚麼，以及還有甚麼需要你決定。

在重要位置，請你親自檢查應用程式或檔案。只有當你接受結果時，才把工作項目移到 `Done`。

## 14. Keep important project knowledge

工作項目完成時，AI 助手應該問：

```text
Is there anything from this task that should be kept as lasting project knowledge?
```

如果答案是否，請把它保留為工作紀錄。如果答案是是，請更新所屬的 System 或 Feature 筆記，保留既有專案知識並加以補充，必要時更新索引。

已完成的工作項目不會自動成為永久專案知識。

## 15. Archive completed work

`Vault/Work/Archive/` 用來保存你不想再放在工作面板上的完成事項。

只有在你確定要封存時，才把檔案移到這裏。不要只因工作項目完成，就自動封存。

## 16. Update OmniBrain safely

請 AI 助手使用帶有 `--force` 的安全 setup 指令。

`--force` 可以重新整理框架擁有的檔案，例如 Core_OS、Start Here、兩份指南、Task Board Base、Obsidian 說明檔和 OmniBrain scripts。

它必須保留工作項目 Markdown 檔案、Archive 檔案、Project 筆記、宿主檔案、宿主設定，以及舊有的 `Vault/Dashboard.md`。

## 17. Back up or remove OmniBrain

進行破壞性動作前，請先備份你的專案資料夾。

如要移除 OmniBrain，請先確認你想保留甚麼。你的專案記憶在 `Vault/Project/`。你的工作項目在 `Vault/Work/Tasks/` 和 `Vault/Work/Archive/`。

除非你確定不再需要，否則不要刪除這些資料夾。

## 18. Troubleshooting

症狀：Start Here 可以開啟，但工作面板是空白。
處理：在 Obsidian 啟用 Bases 核心外掛，然後重新開啟頁面。

症狀：新的工作項目出現在 `None`。
處理：開啟該工作項目檔案，並在可見的 Obsidian properties 選擇 stage。

症狀：某個工作項目沒有出現在 Active work。
處理：確認它位於 `Vault/Work/Tasks/`，含有 `type: omnibrain_task`，而且不是 `stage: Done`。

症狀：setup 回報缺少 templates。
處理：還原 `omnibrain-templates` 資料夾，然後再次執行 setup。

症狀：你擔心專案事實被覆寫。
處理：請 AI 助手在修改 `Vault/Project/**` 前先列出建議變更。

## 19. Privacy and local-file safety

OmniBrain 把資料保存在本機 Markdown 檔案中。Bases 讀取 vault 內的檔案 properties 和 frontmatter。

OmniBrain 不加入遙測、 hosted services 或必要 API keys。你的 AI 助手可能有自己的私隱模式，請另行確認該工具。

## 20. Plain-language glossary

- AI 助手：你請來協助專案的工具。
- Bases：Obsidian 核心外掛，可用表格視圖顯示本機 Markdown 檔案。
- 目前工作：你正在使用的工作項目檔案。
- 專案知識：關於產品、系統或功能的長期事實。
- 工作項目：`Vault/Work/Tasks/` 下的一個 Markdown 檔案。
- 封存：把想保留但不想留在 active board 的工作移到指定資料夾。
