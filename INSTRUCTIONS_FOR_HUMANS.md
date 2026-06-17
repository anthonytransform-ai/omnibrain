# Instructions For Humans

This guide explains how to use OmniBrain in plain language.

OmniBrain is a folder-based memory system for working with AI assistants. It helps the AI understand your project before it makes changes, and it gives you a tidy place to keep plans, decisions, reviews, and handoffs.

## Before You Start

You need:

- a project folder,
- an AI assistant that can read and edit files,
- optionally Node.js if you want to run the setup and health-check commands,
- optionally Obsidian if you want a nicer reading and note-taking experience.

Obsidian is optional. No Obsidian community plugin is required.

## First Setup

1. Put the OmniBrain files inside your project folder.
2. Open the project in your preferred AI assistant.
3. Ask the AI assistant to read `AGENT_PROMPT.md`.
4. If Node.js is available, ask the AI assistant to run:

```bash
npm run setup
```

5. Open `Vault/Project_Context.md`.
6. Write your project goal, current status, important links, and anything the AI must remember.

## How To Start A Work Session

At the start of a serious work session, use this prompt:

```text
Please sync with the OmniBrain vault first. Read the project context, dashboard, latest daily log, active plans, and relevant operating notes. Then tell me the current project state before making changes.
```

This prevents the AI assistant from guessing.

## Where Things Go

Use these folders as a simple habit:

- `Vault/_inbox` - raw AI-generated artifacts waiting for review.
- `Vault/Plans` - accepted plans and completed handoffs.
- `Vault/Reviews` - review notes and external review results.
- `Vault/Decisions` - important choices that should be remembered.
- `Vault/Daily_Logs` - dated work notes.
- `Vault/OS` - working rules for the AI assistant.
- `Vault/Agents` - review checklists for specialist roles.

## Artifact Inbox

When the AI creates a long plan, review, or handoff, it should not always go straight into the main vault.

Ask the AI to put new artifacts in `Vault/_inbox` first.

After you approve the useful ones, ask the AI to move them into `Vault/Plans`, `Vault/Reviews`, or another correct folder.

Useful prompt:

```text
Please archive the approved _inbox artifacts into the right OmniBrain folders and update the daily log.
```

## Review Roles

OmniBrain includes practical role checklists, such as:

- Architect,
- Code Reviewer,
- UI Designer,
- Vault Keeper.

These are not separate people. They are ways to ask the AI assistant to review the work from a particular angle.

Useful prompt:

```text
Please review this plan using the Architect and Code Reviewer checklists before implementing it.
```

If your AI tool supports separate agents, it may use these roles as separate helpers. If not, the main AI assistant can still use the same checklists.

## External Sandbox Review

Sometimes you may want a second opinion from another AI tool or sandbox environment.

Use external sandbox review when you want:

- an independent code review,
- test suggestions,
- risk checking,
- a challenge to an implementation plan,
- a second opinion before release.

This is optional. OmniBrain does not depend on any specific external review product.

Useful prompt:

```text
Please prepare an external sandbox review package with context, changed files, risks, and exact questions for the reviewer.
```

## Maintenance

If Node.js is available, these commands help keep the vault tidy:

```bash
npm run vault-health
npm run vault-maintenance
```

Run them after larger changes or before handing the project to another AI assistant.

## If The AI Gets Confused

Ask it to stop and resync:

```text
Stop. Please reread the OmniBrain vault, summarize the current project state, and list the files you will use before continuing.
```

## The Main Rule

OmniBrain is here to make AI work easier to control.

Keep useful context. Archive approved plans. Keep raw artifacts in `_inbox` until they are reviewed. Do not let the vault become a dumping ground.

---

# 給使用者的說明

這份說明用簡單語言介紹如何使用 OmniBrain。

OmniBrain 是一套以資料夾為核心的 AI 工作記憶系統。它可以幫 AI 助手在修改前先了解你的專案，也讓你有一個整齊位置保存計劃、決定、審查記錄和交接資料。

## 開始前需要甚麼

你需要：

- 一個專案資料夾；
- 一個可以讀取和修改檔案的 AI 助手；
- 如果想使用設定和健康檢查指令，可選擇安裝 Node.js；
- 如果想用較舒服的方式閱讀和整理筆記，可選擇使用 Obsidian。

Obsidian 不是必需。不需要安裝任何 Obsidian 社群外掛。

## 第一次設定

1. 把 OmniBrain 檔案放入你的專案資料夾。
2. 用你偏好的 AI 助手打開這個專案。
3. 請 AI 助手閱讀 `AGENT_PROMPT.md`。
4. 如果可以使用 Node.js，請 AI 助手運行：

```bash
npm run setup
```

5. 打開 `Vault/Project_Context.md`。
6. 寫下專案目標、目前狀態、重要連結，以及 AI 必須記住的事。

## 每次開始工作時

正式開始工作前，可以使用這段提示：

```text
請先同步 OmniBrain vault。閱讀專案背景、工作面板、最新每日記錄、目前計劃和相關工作指引。然後先告訴我目前專案狀態，再開始修改。
```

這樣可以避免 AI 助手靠猜測工作。

## 內容應該放在哪裡

你可以用以下簡單習慣：

- `Vault/_inbox` - 等待審查的 AI 原始產物。
- `Vault/Plans` - 已接受計劃和完成交接資料。
- `Vault/Reviews` - 審查記錄和外部審查結果。
- `Vault/Decisions` - 需要保留的重要決定。
- `Vault/Daily_Logs` - 按日期整理的工作記錄。
- `Vault/OS` - 給 AI 助手的工作規則。
- `Vault/Agents` - 專門審查角色的清單。

## 收件匣

當 AI 產生很長的計劃、審查或交接資料時，不一定要立即放入主要 vault。

請 AI 先把新產物放入 `Vault/_inbox`。

當你確認哪些內容有用後，再請 AI 移到 `Vault/Plans`、`Vault/Reviews` 或其他正確位置。

可用提示：

```text
請把已批准的 _inbox 產物封存到正確的 OmniBrain 資料夾，並更新每日記錄。
```

## 審查角色

OmniBrain 包含一些實用的審查清單，例如：

- 架構審查；
- 程式碼審查；
- 介面審查；
- 知識庫整理。

這些不是另一批真人，而是讓 AI 助手用不同角度檢查工作的方式。

可用提示：

```text
請先用架構審查和程式碼審查清單檢查這個計劃，然後才開始實作。
```

如果你的 AI 工具支援分開的助手，它可以把這些角色交給不同助手處理。若不支援，主 AI 助手仍然可以使用同一套清單。

## 外部沙盒審查

有時你可能想請另一個 AI 工具或沙盒環境提供第二意見。

當你需要以下事情時，可以使用外部沙盒審查：

- 獨立程式碼審查；
- 測試建議；
- 風險檢查；
- 挑戰一個實作計劃；
- 發布前第二意見。

這是可選功能。OmniBrain 不依賴任何指定外部審查產品。

可用提示：

```text
請準備一份外部沙盒審查包，包含背景、已修改檔案、風險和要問審查者的具體問題。
```

## 維護

如果可以使用 Node.js，以下指令可協助保持 vault 整齊：

```bash
npm run vault-health
npm run vault-maintenance
```

建議在較大修改後，或把專案交給另一個 AI 助手前運行。

## 如果 AI 助手混亂了

請它停下來重新同步：

```text
停。請重新閱讀 OmniBrain vault，整理目前專案狀態，並列出你會使用哪些檔案，然後才繼續。
```

## 最重要的規則

OmniBrain 是用來令 AI 工作更容易掌控。

保留有用背景。封存已批准計劃。原始產物先放在 `_inbox`，審查後才移入正式位置。不要讓 vault 變成雜物箱。

