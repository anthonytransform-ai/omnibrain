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

請複製以下指示給你的 AI 助手：

```text
請在這個專案資料夾安裝 OmniBrain。

請先確認目前使用中的專案資料夾，並向我顯示路徑。然後執行 `node --version`，檢查 Node.js 是否可用。請回報偵測到的版本。如果找不到 Node.js，請停止，清楚說明 OmniBrain setup 需要 Node.js，並且不要在未經我明確批准前安裝 Node.js 或其他系統軟件。

請檢查 `omnibrain/omnibrain-setup.js` 是否已存在。如果它存在，請安全地繼續。如果它不存在，請使用官方來源 `https://github.com/anthonytransform-ai/omnibrain`。請取得或指引我取得官方 OmniBrain 檔案，把框架內容放在這個專案資料夾內的 `omnibrain/`，並避免在我的專案內留下巢狀 `.git` 儲存庫。如果你不能自行下載檔案，請給我簡單步驟：在 GitHub 使用 Code -> Download ZIP，解壓 ZIP，把解壓後的資料夾改名為 `omnibrain`，移到這個專案資料夾內；如有巢狀 `.git` 資料夾，請移除它。

執行 setup 前，請確認 `omnibrain/omnibrain-setup.js` 和 `omnibrain/omnibrain-templates/` 都存在。然後在專案根目錄執行 `node omnibrain/omnibrain-setup.js`。

請保留既有專案檔案、既有專案腳本、既有專案設定、`Vault/Project/**`、`Vault/Dashboard.md`、`Vault/Work/Tasks/**` 和 `Vault/Work/Archive/**`。

setup 完成後，請確認 `Vault/Start_Here.md`、兩份使用指南和 `Vault/Work/Tasks/Task_Board.base` 都存在。如果 OmniBrain 建立了根目錄 `AGENTS.md`，請確認它包含 OmniBrain bootstrap。如果既有根目錄 `AGENTS.md` 被保留，而且產生了 `omnibrain/AGENTS.omnibrain-snippet.md`，請讀取兩個檔案，保留所有既有指示，提出準確的合併後變更，並只在我批准後整合 OmniBrain snippet。如果無法安全整合，請說明仍需完成的確切動作。

請自行檢視此專案使用的語言、框架、資料庫、建置工具和部署安排。請最多問我五個產品問題：我正在建立或改進甚麼、對象是誰、它應幫助使用者做甚麼、它應有甚麼感覺，以及哪些動作 AI 必須先問我。請用我的回答填寫空白的專案文件。如果既有專案文件已有實質內容，請保留它們，並在更改既有產品陳述或權限邊界前先提出補充建議。

請告訴我應在 Obsidian 開啟哪一個 `Vault/` 資料夾，並用一般語言解釋如何啟用 Bases 核心外掛。
```

## 5. 手動安裝

手動安裝適合有技術背景的使用者。

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

請複製以下指示：

```text
請讀取 `Vault/Start_Here.md`，找出名為「[task filename]」的工作項目，並只處理該工作項目。請把該工作項目 Markdown 檔案作為目前工作紀錄。如果工作項目缺少以下正文標題，請在保留既有內容的前提下加入它們：`## What we are trying to achieve`、`## What happens next`、`## What I need to decide` 和 `## Useful notes`。請保持 "What happens next" 最新。請記錄真實使用者決定。請用最簡單而安全的方法完成工作。除非能降低真實風險，否則不要建立額外計劃、分支、審閱者或交接檔案。請執行與變更幅度相稱的驗證。不要悄悄移動工作項目的 `stage`。你可以建議階段，但只有在我直接指示時才可更改 `stage`。如果 `needs_user_decision` 是 true，請在 `What I need to decide` 說明需要我決定的事項，在該邊界停下來，並等待我。遇到破壞性、產生成本、涉及私隱／隱私、發布或更改權限的動作前，請先停下來問我。
```

## 13. 檢查並接受已完成的工作

請 AI 助手說明改了甚麼、檢查了甚麼，以及還有甚麼需要你決定。

在重要位置，請你親自檢查應用程式或檔案。只有當你接受結果時，才把工作項目移到 `Done`。

## 14. 保留重要專案知識

當你準備結束某個工作項目時，請複製以下指示：

```text
請謹慎結束這個工作項目。請總結改了甚麼、說明檢查了甚麼，並列出任何不確定或受阻的事項。請問我是否有任何內容應保留為長期專案知識。除非我直接指示，否則不要把工作項目移到 `Done`，也不要移到 `Vault/Work/Archive/`。
```

若你回答「否」，請把它保留為工作紀錄。若你回答「是」，請更新所屬的 System 或 Feature 筆記，保留既有專案知識並加以補充，必要時更新索引。

已完成的工作項目不會自動成為永久專案知識。

## 15. 封存已完成的工作

`Vault/Work/Archive/` 用來保存你不想再放在工作面板上的完成事項。

只有在你確定要封存時，才把檔案移到這裏。不要只因工作項目完成，就自動封存。

## 16. 安全地更新 OmniBrain

請 AI 助手使用帶有 `--force` 的安全 setup 指令。

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
