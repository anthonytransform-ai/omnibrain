# OmniBrain

OmniBrain is a portable memory system for AI-assisted work.

It helps a person turn a normal project folder into a shared workspace where an AI assistant can remember goals, decisions, plans, review notes, and project history across many sessions.

You do not need to know how to code to use OmniBrain. It is designed for people who work with AI by explaining goals, reviewing results, and making decisions.

## What OmniBrain Gives You

- **Project memory** - your AI assistant can read the project purpose, current status, important decisions, and recent work before it starts.
- **Clear working rhythm** - new ideas, plans, reviews, and handoffs have a proper place.
- **Artifact inbox** - raw AI-generated notes go into `Vault/_inbox` first, so useful work is not lost and messy work does not pollute the main memory.
- **Approved plan archive** - accepted plans and completed handoffs move into `Vault/Plans`.
- **Review roles** - the vault includes practical review checklists for architecture, code review, UI review, and vault keeping.
- **External sandbox review** - you can ask a separate AI or sandbox environment to review code, suggest tests, or challenge a plan without making it part of your daily workflow.
- **No vendor lock-in** - OmniBrain is plain folders and Markdown files. It can be used with Codex, another AI coding assistant, Obsidian, or a normal text editor.

## Who It Is For

OmniBrain is useful if:

- you use AI to build or manage projects,
- you are not a full-time developer,
- your AI chats are becoming too long to follow,
- you want decisions and project memory to survive across sessions,
- you want a calmer way to work with AI instead of restarting context every time.

## How To Use It

1. Put OmniBrain in your project folder.
2. Ask your AI assistant to read `AGENT_PROMPT.md`.
3. Let the assistant run the setup script if your environment supports Node.js:

```bash
npm run setup
```

4. Open the generated `Vault` folder.
5. Fill in `Vault/Project_Context.md` with your project goal, current status, and important links.
6. Start each serious work session by asking the AI to sync with the vault.

Useful prompt:

```text
Please read the OmniBrain vault, understand the current project state, and tell me what you know before making changes.
```

## What Gets Created

After setup, OmniBrain creates a `Vault` folder with:

- `Project_Context.md` - the project briefing.
- `Dashboard.md` - a simple working dashboard.
- `_inbox/` - raw AI artifacts waiting for review.
- `Plans/` - approved plans and completed handoffs.
- `Reviews/` - review notes and external review results.
- `Decisions/` - important decisions.
- `Daily_Logs/` - dated working notes.
- `OS/` - operating guidance for the AI assistant.
- `Agents/` - role checklists for review and project maintenance.

## Maintenance Commands

If Node.js is available, these commands help keep the vault tidy:

```bash
npm run vault-health
npm run vault-maintenance
```

`vault-health` checks links and basic structure.

`vault-maintenance` can run the available maintenance checks together.

## Optional Obsidian Use

OmniBrain works well in Obsidian, but Obsidian is optional.

No community plugin is required. You can use the vault as normal Markdown files.

## Important Principle

OmniBrain should make AI work easier to understand, not harder.

If a note is useful for future work, keep it. If it is only temporary noise, leave it in `_inbox` until it is reviewed or deleted.

---

# OmniBrain（繁體中文）

OmniBrain 是一套可攜式的 AI 工作記憶系統。

它可以把一個普通專案資料夾，變成你和 AI 助手一起工作的共享空間。AI 助手可以在每次開始前讀取專案目標、重要決定、計劃、審查記錄和最近進度，不用每次都由零開始。

你不需要懂寫程式也可以使用 OmniBrain。它是為用 AI 說明目標、審查結果、作決定的人而設計。

## OmniBrain 可以幫你做甚麼

- **保存專案記憶** - AI 助手可以先了解專案目的、目前狀態、重要決定和最近工作。
- **建立清楚的工作節奏** - 新想法、計劃、審查和交接資料都有固定位置。
- **收件匣** - AI 產生的原始筆記先放入 `Vault/_inbox`，有用的內容不會遺失，未整理的內容也不會弄亂主要記憶。
- **已批准計劃封存** - 已接受的計劃和完成的交接資料放入 `Vault/Plans`。
- **審查角色** - vault 內有架構、程式碼、介面和知識庫整理的審查清單。
- **外部沙盒審查** - 你可以請另一個 AI 或沙盒環境獨立檢查程式碼、建議測試，或挑戰一個計劃，而不用把它變成日常流程的一部分。
- **不綁定單一平台** - OmniBrain 只是資料夾和 Markdown 檔案，可以配合 Codex、其他 AI 開發助手、Obsidian，或普通文字編輯器使用。

## 適合甚麼人

OmniBrain 適合你，如果：

- 你用 AI 建立或管理專案；
- 你不是全職工程師；
- 你的 AI 對話太長，開始難以追蹤；
- 你希望重要決定和專案記憶可以保留下來；
- 你想用較穩定、清楚的方法和 AI 合作。

## 使用方法

1. 把 OmniBrain 放入你的專案資料夾。
2. 請 AI 助手閱讀 `AGENT_PROMPT.md`。
3. 如果你的環境支援 Node.js，可以請 AI 助手運行設定指令：

```bash
npm run setup
```

4. 打開建立好的 `Vault` 資料夾。
5. 在 `Vault/Project_Context.md` 寫下專案目標、目前狀態和重要連結。
6. 每次開始正式工作前，先請 AI 助手同步 vault 內容。

可用提示：

```text
請先閱讀 OmniBrain vault，了解目前專案狀態，然後告訴我你知道了甚麼，再開始修改。
```

## 建立後會有甚麼

設定完成後，OmniBrain 會建立一個 `Vault` 資料夾，當中包括：

- `Project_Context.md` - 專案簡介。
- `Dashboard.md` - 簡單工作面板。
- `_inbox/` - 等待整理的 AI 原始產物。
- `Plans/` - 已批准計劃和完成交接資料。
- `Reviews/` - 審查記錄和外部審查結果。
- `Decisions/` - 重要決定。
- `Daily_Logs/` - 每日工作記錄。
- `OS/` - 給 AI 助手的工作指引。
- `Agents/` - 不同審查和整理角色的清單。

## 維護指令

如果可以使用 Node.js，以下指令可協助保持 vault 整齊：

```bash
npm run vault-health
npm run vault-maintenance
```

`vault-health` 會檢查連結和基本結構。

`vault-maintenance` 可以一次運行可用的維護檢查。

## 可選擇使用 Obsidian

OmniBrain 很適合配合 Obsidian 使用，但 Obsidian 不是必需。

不需要安裝任何社群外掛。你也可以只把 vault 當作普通 Markdown 檔案使用。

## 重要原則

OmniBrain 應該令 AI 合作更清楚，而不是更複雜。

如果一份筆記對未來有用，就保留下來。若只是臨時資料，先放在 `_inbox`，待審查後再封存或刪除。

