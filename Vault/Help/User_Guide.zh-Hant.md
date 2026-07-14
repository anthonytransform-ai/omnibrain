---
type: user_guide
language: zh-Hant
status: active
tags: [omnibrain, user_guide, guided_workspace]
---

# OmniBrain 使用指南

這是 OmniBrain v2.1.0 的繁體中文指南。

## 三分鐘快速開始

1. 請 AI 助手在你的專案（項目）資料夾安裝 OmniBrain。
2. 在 Obsidian Desktop 開啟 `Vault/Start_Here.md`。
3. 如果工作面板沒有顯示，請啟用 Bases 核心外掛。
4. 在工作面板按 **New** 建立一個工作項目。
5. 請 AI 助手依工作項目名稱開始協助。

## 1. OmniBrain 是什麼

OmniBrain 是給 AI 協作專案使用的本機工作空間。它用純 Markdown 檔案保存專案筆記、目前工作、決定和操作指引。

你用 Obsidian 查看工作空間。你的 AI 助手也讀取同一批檔案來理解目前狀態。

## 2. OmniBrain 不會做什麼

OmniBrain 不會取代你的應用程式、不會部署成果、不會加入遙測、不需要 API key，也不依賴雲端服務。

它不會替你作產品決定。它會幫你看清目前進度，以及哪些地方需要你決定。

## 3. 開始前需要準備甚麼

你需要：

- 你的專案資料夾；
- Node.js，因為 OmniBrain setup 需要用 `node` 執行；
- 可以處理本機檔案的 AI 助手；
- Obsidian Desktop。

OmniBrain 的儲存庫工作流程使用 Node.js 18 測試。如果你的專案使用較新的支援版本，通常也可以。如果 `node --version` 無法執行，請先停止，自己安裝 Node.js，或明確批准可信任的協助者提供指引。OmniBrain 不應自動安裝系統軟件。

Guided Workspace 只需要 Obsidian 的 Bases 核心外掛。主要工作面板不需要 Dataview、Templates、Daily Notes 或社群外掛。

表格式工作面板需要支援 table view 的 Obsidian Bases。Obsidian 官方文件列明 table view 可由 Obsidian 1.9 起使用。

## 4. 使用 AI 助手安裝

一般人使用的主要路徑在 `README.md`：把儲存庫 URL 貼到正在處理你專案的 AI coding assistant，然後請它安裝 OmniBrain 並保留既有檔案。

給 AI 助手使用的技術安裝合約是 `INSTALL_WITH_AI.md`。它定義來源取得、Node.js 預檢、保留邊界、AGENTS 處理、驗證，以及誠實回報失敗的方式。

## 5. 手動安裝

手動安裝是給有技術背景使用者的進階備用方式。主要路徑仍然是 README front door 所描述的 AI 協助安裝。

1. 確認你位於要安裝 OmniBrain 的專案資料夾。
2. 確認 Node.js 可用：

```bash
node --version
```

3. 從 `https://github.com/anthonytransform-ai/omnibrain` 取得官方 OmniBrain 檔案。
4. 把框架內容放在你的專案內，路徑為 `omnibrain/`。
5. 避免在專案內留下巢狀 `.git` 儲存庫。
6. 確認以下路徑存在：

```text
omnibrain/omnibrain-setup.js
omnibrain/omnibrain-templates/
```

然後在專案根目錄執行 setup：

```bash
node omnibrain/omnibrain-setup.js
```

日後如需重新整理 OmniBrain 框架擁有的檔案，請執行：

> [!warning]
> `--force` 可以覆寫 OmniBrain 框架擁有的檔案，例如 Core_OS、開始使用、指南、Base 工作面板、Obsidian 說明檔和 OmniBrain 腳本。它必須保留專案知識、工作項目檔案、封存檔案、原本專案檔案、原本專案設定，以及舊有的 `Vault/Dashboard.md`。

```bash
node omnibrain/omnibrain-setup.js --force
```

## 6. 在 Obsidian 開啟 OmniBrain

開啟 Obsidian Desktop。選擇 **Open folder as vault**，然後選取專案資料夾內的 `Vault/` 資料夾。

然後開啟 `Start_Here.md`。

## 7. 啟用 Bases

在 Obsidian 開啟設定。前往 **Core plugins**。啟用 **Bases**。

如果工作面板沒有顯示，請啟用 Bases，然後重新開啟 `Start_Here.md`。OmniBrain 不會檢查未公開的 Obsidian 內部狀態，所以檢查工具只會給出啟用指引，不會聲稱 Bases 已啟用。

## 8. 使用開始使用頁

`Start_Here.md` 是你的首頁。它連結到專案筆記、兩份使用指南，以及目前工作面板。

不要把長期專案事實直接寫在 Start Here。請把事實放在所屬的專案筆記，例如 Project Overview、Current State 或 Product Vision。

## 9. 建立第一個工作項目

開啟 Active work 面板。使用可見的 **New** 動作。

Obsidian 會在 `Vault/Work/Tasks/` 下建立新的 Markdown 檔案。請把檔名改成工作項目標題。填寫 `summary`，並透過可見的 Obsidian 屬性選擇 `stage`。

新的工作項目可能會先顯示在 `None` 分組，直到你選擇 `stage`。這是可接受的行為。

## 10. 理解六個階段

請使用以下固定英文 `stage` 值：

- `Ideas`：構想。
- `Planning`：規劃中。
- `Ready`：準備開始。
- `In progress`：進行中。
- `Check and decide`：檢查及決定。
- `Done`：已完成。

`stage` 是你的生命週期決定。AI 助手可以建議階段，但只有在你直接指示時，才應更改階段。

## 11. 標示需要我決定

在可見的屬性或 checkbox 儲存格開啟 `needs_user_decision`。

該工作項目會出現在 **Needs my decision**。當事項涉及產品方向、權限、成本、私隱／隱私、刪除、發布，或任何你希望先批准的事情時，請使用這個標記。

當這個值為 true 時，AI 助手應在 `What I need to decide` 說明需要你決定的事項，在受影響的邊界停下來，並等待你。

## 12. 請 AI 助手處理工作項目

請使用短 Quick Calls，不要使用很長的複製貼上指示：

| Say | OmniBrain will |
| --- | -------------- |
| `Start OmniBrain.` | Orient to this project. |
| `New task: [task name].` | Create a safe task in Ideas. |
| `Work on [task name].` | Continue from that task record. |
| `My decisions?` | Show what needs your decision. |
| `Wrap up.` | Record where things stand. |
| `Keep as knowledge.` | Save approved lasting learning. |
| `Mark done.` | Mark the current task Done when decisions are resolved. |
| `Archive task.` | Move the current task to Archive after your instruction. |
| `Check OmniBrain.` | Run non-destructive OmniBrain checks. |
| `Update OmniBrain.` | Safely refresh the framework while preserving your content. |

詳細行為由 `Vault/Core_OS/Runtime/Entry.md` 強制定義。這些 calls 是英文標準例子，不是必須逐字輸入的指令；使用者以其他語言提出同等意思時，AI 助手應按意圖理解。

## 13. 檢查並接受已完成的工作

請 AI 助手說明改了甚麼、檢查了甚麼，以及還有甚麼需要你決定。

在重要位置，請你親自檢查應用程式或檔案。只有當你接受結果時，才把工作項目移到 `Done`。

## 14. 保留重要專案知識

當你準備結束某個工作項目時，說 `Wrap up.` OmniBrain 應記錄目前位置、說明檢查了甚麼、列出任何不確定或受阻的事項，並詢問是否有內容應保留為長期專案知識。

若你回答「否」，請把它保留為工作紀錄。若你回答「是」，說 `Keep as knowledge.` OmniBrain 應更新所屬的 System 或 Feature 筆記，保留既有專案知識並加以補充，必要時更新索引。

已完成的工作項目不會自動成為永久專案知識。

## 15. 封存已完成的工作

`Vault/Work/Archive/` 用來保存你不想再放在工作面板上的完成事項。

只有在你確定要封存時，才把檔案移到這裏。不要只因工作項目完成，就自動封存。

## 16. 安全地更新 OmniBrain

說 `Update OmniBrain.` 以要求安全的框架更新。

> [!warning]
> `--force` 可以覆寫 OmniBrain 框架擁有的檔案。請 AI 助手確認將會重新整理甚麼，並保留工作項目 Markdown 檔案、封存檔案、專案筆記、原本專案檔案、原本專案設定，以及舊有的 `Vault/Dashboard.md`。

`--force` 可以重新整理框架擁有的檔案，例如 Core_OS、Start Here、兩份指南、Task Board Base、Obsidian 說明檔和 OmniBrain 腳本。

## 17. 備份或移除 OmniBrain

> [!warning]
> 移除 OmniBrain 時，如果刪錯資料夾，可能會刪除你的本機專案知識。請先備份，並在移除檔案前決定要保留甚麼。

如要移除 OmniBrain，請先確認你想保留甚麼。你的專案知識在 `Vault/Project/`。你的工作項目在 `Vault/Work/Tasks/` 和 `Vault/Work/Archive/`。

除非你確定不再需要，否則不要刪除這些資料夾。

## 18. 疑難排解

| 情況 | 處理方法 |
| -- | ---- |
| 找不到 `omnibrain/omnibrain-setup.js`。 | 從 `https://github.com/anthonytransform-ai/omnibrain` 取得官方檔案，放到 `omnibrain/`，並在 setup 前確認 `omnibrain/omnibrain-templates/` 存在。 |
| `node --version` 無法執行。 | 停止。請自行安裝 Node.js，或明確批准可信任的協助者。不要讓 OmniBrain setup 假裝 Node.js 可用。 |
| Start Here 可以開啟，但工作面板是空白。 | 在 Obsidian 啟用 Bases 核心外掛，然後重新開啟頁面。 |
| 新的工作項目出現在 `None`。 | 開啟該工作項目檔案，並在可見的 Obsidian 屬性選擇 `stage`。 |
| 某個工作項目沒有出現在 Active work。 | 確認它位於 `Vault/Work/Tasks/`，含有 `type: omnibrain_task`，而且不是 `stage: Done`。 |
| setup 回報缺少 templates。 | 還原 `omnibrain-templates` 資料夾，然後再次執行 setup。 |
| 你擔心專案知識被更改。 | 請 AI 助手在修改 `Vault/Project/**` 前先列出建議變更。 |

## 19. 私隱／隱私與本機檔案安全

OmniBrain 把資料保存在本機 Markdown 檔案中。Bases 讀取 vault 內的檔案屬性和 frontmatter。

OmniBrain 不加入遙測、雲端託管服務或必要 API keys。你的 AI 助手可能有自己的私隱／隱私與資料處理政策，請另行確認該工具。

## 20. 簡明詞彙表

- AI 助手：你請來協助專案的工具。
- Bases：Obsidian 核心外掛，可用表格視圖顯示本機 Markdown 檔案。
- 目前工作：你正在使用的工作項目檔案。
- 專案知識：關於產品、系統或功能的長期事實。
- 工作項目：`Vault/Work/Tasks/` 下的一個 Markdown 檔案。
- 封存：把想保留但不想留在目前工作面板的工作移到指定資料夾。
