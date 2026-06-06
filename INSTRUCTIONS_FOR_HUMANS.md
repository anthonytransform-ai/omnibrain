# How to Use OmniBrain (For Humans) / 如何使用 OmniBrain (人類指南)

## 🇺🇸 English Instructions

Welcome! You do not need to know how to code to use this framework. OmniBrain is an "Operating System" that you install directly into your AI coding assistant (like Gemini, Cursor, or Claude) to stop it from making mistakes as your project grows.

### Step 1: Open Your Folder
Unzip this repository and place all the files into the empty folder where you want to build your app.

### Step 2: Talk to Your AI
Open your AI coding assistant. Copy the entire contents of `README.md` and paste it into the AI chat. 

### Step 3: Let the AI Do the Work
The AI will read the prompt and automatically run the setup scripts. It will create a folder called `Vault`. 

*(Optional but Highly Recommended: Download the free app **Obsidian** (https://obsidian.md) and open the `Vault` folder with it. This will give you a beautiful visual dashboard of what your AI is doing.)*

That's it! Every day, just tell the AI what to build, and OmniBrain will handle the rest.

### Adding to an Existing Project
If you are adding OmniBrain to a project that already has code or AI instructions (like `cursorrules`, `CLAUDE.md`, or `AGENTS.md`):
1. Run the setup normally (OmniBrain will not delete your existing files).
2. If you already have a `package.json`, the script will ask you to manually add the `"check-ai-rules": "node scripts/check-ai-rules.js"` script to it.
3. Open `AGENT_PROMPT.md` and add a note at the top telling the AI to also read your existing instruction files (e.g., *"Read `CLAUDE.md` for our project rules"*).
4. Tell your AI: *"I have just installed OmniBrain. Please analyze my existing codebase and populate the `Vault/System` and `Vault/Features` folders."*

### The `/sync` Command
If you have been chatting with your AI for a long time and it seems to forget the rules, or you just want to force it to update the documentation, simply type:
> `/sync`

The AI is programmed to immediately re-read its instructions and update your `Vault` dashboard when it sees this command.

### Using Multiple AIs (The Brain Isolation Rule)
If you ever use your AI to generate a prompt for a *different* AI (like an external cloud agent), remember that the second AI cannot read your local `Vault` folder! Your primary AI is instructed to follow the **Brain Isolation Rule**: it will automatically copy-paste the relevant rules from your Vault into the prompt so the secondary AI doesn't break your project.

### Markdown-Driven Linting
OmniBrain automatically prevents AI hallucinations. If you tell your AI *"Never use scrollIntoView"*, it will save that rule in `Vault/Anti_Patterns.md`. The built-in linter (`npm run check-ai-rules`) actively reads this plain-English markdown file and will physically block the AI from ever making that mistake again—no coding required from you!

---

## 🇭🇰 繁體中文指示

歡迎！你不需要懂編程就可以使用這個框架。OmniBrain 是一個「操作系統」，你可以直接把它安裝到你的 AI 寫碼助手（如 Gemini、Cursor 或 Claude）中，以防止它在你的項目增長時犯錯。

### 第一步：打開你的文件夾
解壓縮這個代碼庫，並把所有文件放到你想建立應用程序的空白文件夾中。

### 第二步：與你的 AI 對話
打開你的 AI 寫碼助手。複製 `README.md` 的全部內容，並將其貼上到 AI 聊天框中。

### 第三步：讓 AI 處理工作
AI 會讀取提示詞並自動運行安裝腳本。它會創建一個名為 `Vault` 的文件夾。

*（可選但強烈建議：下載免費應用程序 **Obsidian** (https://obsidian.md) 並用它打開 `Vault` 文件夾。這將為你提供一個美觀的視覺儀表板，讓你看到 AI 正在做什麼。）*

就這麼簡單！每天，只需告訴 AI 要建立什麼，OmniBrain 就會處理剩下的事情。

### 添加到現有項目
如果你正在將 OmniBrain 添加到已經有代碼或 AI 指示（如 `cursorrules`、`CLAUDE.md` 或 `AGENTS.md`）的項目中：
1. 正常運行安裝（OmniBrain 不會刪除你現有的文件）。
2. 如果你已經有一個 `package.json`，腳本會要求你手動將 `"check-ai-rules": "node scripts/check-ai-rules.js"` 腳本加入其中。
3. 打開 `AGENT_PROMPT.md` 並在頂部添加註釋，告訴 AI 也要讀取你現有的指示文件（例如，*「請閱讀 `CLAUDE.md` 以了解我們的項目規則」*）。
4. 告訴你的 AI：*「我剛剛安裝了 OmniBrain。請分析我現有的代碼庫並填充 `Vault/System` 和 `Vault/Features` 文件夾。」*

### `/sync` 指令
如果你和 AI 聊了很久，它似乎忘記了規則，或者你只是想強迫它更新文檔，只需輸入：
> `/sync`

AI 被編程為在看到此命令時立即重新閱讀其指示並更新你的 `Vault` 儀表板。

### 使用多個 AI（大腦隔離規則）
如果你使用 AI 為「另一個」 AI（如外部雲端代理）生成提示詞，請記住第二個 AI 無法讀取你本地的 `Vault` 文件夾！你的主要 AI 被指示遵循**大腦隔離規則**：它會自動將相關規則從你的知識庫複製貼上到提示詞中，這樣第二個 AI 就不會破壞你的項目。

### Markdown 驅動的檢查器
OmniBrain 會自動防止 AI 幻覺。如果你告訴 AI *「永遠不要使用 scrollIntoView」*，它會將該規則保存在 `Vault/Anti_Patterns.md` 中。內建的檢查器 (`npm run check-ai-rules`) 會主動讀取這個純文本 markdown 文件，並在物理上阻止 AI 再次犯這個錯誤——你完全不需要寫程式！
