# How to Use OmniBrain (For Humans) / 如何使用 OmniBrain (人類指南)

## 🇺🇸 English Instructions

Welcome! You do not need to know how to code to use this framework. OmniBrain is an "Operating System" that you install directly into your AI coding assistant (like Gemini, Cursor, or Claude) to stop it from making mistakes as your project grows. It acts as a permanent "long-term memory" and strict "rule enforcer" for your AI.

### Step 1: Prepare Your Folder
Download this repository as a ZIP file (from the green "Code" button) and unzip it into the empty folder where you want to build your app.

### Step 2: Open Your AI Editor
Open that folder inside your favorite AI coding assistant (like **Cursor** or **Windsurf**). 

### Step 3: Start the Magic
Inside your editor, open the file `AGENT_PROMPT.md`. Copy all the text inside it and paste it into your AI chat window.

### Step 4: Let the AI Do the Work
The AI will read the prompt and automatically set everything up. It will create a folder called `Vault` which acts as its memory.

**(Optional) Pro-Tip: Visualizing Your AI's Brain**
OmniBrain uses structured links (like `Governs:: [[Target]]`) to map out your project. The AI understands this perfectly as plain text, but if *you* want to see it visually:
1. Download the free app **Obsidian** (https://obsidian.md) and open the `Vault` folder inside it.
2. If you want dynamic, auto-updating tables on your Dashboard, turn off "Safe Mode" in Obsidian's settings and install the Community Plugin called **Dataview**. 
*This turns your Dashboard into a beautiful visual command center for your AI team!*

That's it! Every day, just tell the AI what to build, and OmniBrain will handle the rest.

### Adding to an Existing Project
If you are adding OmniBrain to a project that already has code or legacy documentation:
1. Run the setup normally (OmniBrain will not delete your existing files).
2. Tell your AI: *"I have just installed OmniBrain. Please run `npm run omnibrain-migrate` to analyze my existing codebase and legacy documents, and integrate them into the new Vault structure."*
3. Open `AGENT_PROMPT.md` and add a note at the top telling the AI to also read your existing instruction files (e.g., *"Read `CLAUDE.md` for our old project rules"*).

### The `/sync` Command
If you have been chatting with your AI for a long time and it seems to forget the rules, or you just want to force it to update the documentation, simply type:
> `/sync`

The AI is programmed to immediately re-read its instructions and update your `Vault` dashboard when it sees this command.

### The Modular Agent Router (Vault/OS/)
OmniBrain uses a **Modular Router Architecture** to save your AI's token limits and keep it focused. 
- The `AGENT_PROMPT.md` is NOT a massive wall of instructions anymore. It is simply a "router."
- Depending on what you ask the AI to do, the router tells the AI to read specific, detailed instruction files stored in the `Vault/OS/` folder (like `Coding_Directives.md` or `Vault_Directives.md`).
- **If you want to change how your AI writes code**, do not edit the main prompt! Instead, edit `Vault/OS/Coding_Directives.md`.

### The Multi-Agent Team & Safe Refactoring
OmniBrain comes with a built-in team of expert **Subagents** (like Code Reviewers, Architects, and UI Designers). 
- **Triggering Subagents**: Just tell your AI *"Review my code"*, *"Audit the architecture"*, or *"Design the UI"*. Your AI will automatically spawn a subagent to help.
- **Safe Refactor Protocol**: When you want to make large changes to your codebase, ask your AI to run the Safe Refactor Protocol. Subagents are strictly forbidden from writing application code—they act as a safety net. They will draft plans and review code diffs *before* the main AI applies changes, ensuring your project never breaks!

### Using Multiple AIs (The Brain Isolation Rule)
If you ever use your AI to generate a prompt for a *different* AI (like an external cloud agent), remember that the second AI cannot read your local `Vault` folder! Your primary AI is instructed to follow the **Brain Isolation Rule**: it will automatically copy-paste the relevant rules from your Vault into the prompt so the secondary AI doesn't break your project.

### Markdown-Driven Linting
OmniBrain automatically prevents AI hallucinations. If you tell your AI *"Never use scrollIntoView"*, it will save that rule in `Vault/Anti_Patterns.md`. The built-in linter (`npm run check-ai-rules`) actively reads this plain-English markdown file and will physically block the AI from ever making that mistake again—no coding required from you!

---

## 🇭🇰 繁體中文指示

歡迎！您不需要懂程式設計就可以使用這個框架。OmniBrain 是一個「作業系統」，您可以直接把它安裝到您的 AI 程式開發助手（如 Gemini、Cursor 或 Claude）中，以防止它在您的專案成長時出錯。它能充當您 AI 的永久「長期記憶」和嚴格的「規則執行者」。

### 第一步：準備您的資料夾
將這個儲存庫下載為 ZIP 檔案（點擊綠色的「Code」按鈕），並將其解壓縮到您想建立應用程式的空白資料夾中。

### 第二步：開啟您的 AI 編輯器
在您最喜歡的 AI 程式開發助手（如 **Cursor** 或 **Windsurf**）中開啟該資料夾。

### 第三步：啟動魔法
在您的編輯器中，開啟 `AGENT_PROMPT.md` 檔案。複製裡面的所有文字，並將其貼上到您的 AI 聊天視窗中。

### 第四步：讓 AI 處理工作
AI 會讀取提示詞並自動設定好一切。它會建立一個名為 `Vault` 的資料夾，作為它的記憶庫。

**（選用）專家提示：視覺化您 AI 的大腦**
OmniBrain 使用結構化的連結（例如 `Governs:: [[Target]]`）來為 AI 繪製專案架構圖。AI 可以完美地將其作為純文字讀取，但如果您*也*想視覺化地看到它：
1. 下載免費應用程式 **Obsidian** (https://obsidian.md) 並用它開啟 `Vault` 資料夾。
2. 如果您希望儀表板上顯示動態、自動更新的表格，請在 Obsidian 設定中關閉「安全模式 (Safe Mode)」並安裝名為 **Dataview** 的社群外掛。
*這會讓您的儀表板變成一個美觀的視覺控制中心，讓您輕鬆掌握 AI 團隊的動態！*

就這麼簡單！每天只需告訴 AI 要建立什麼，OmniBrain 就會處理剩下的事情。

### 新增到現有專案
如果您正在將 OmniBrain 新增到已經有程式碼或舊版文件的專案中：
1. 正常執行安裝（OmniBrain 不會刪除您現有的檔案）。
2. 告訴您的 AI：*「我剛剛安裝了 OmniBrain。請執行 `npm run omnibrain-migrate` 來分析我現有的程式碼庫和舊文件，並將它們整合到新的知識庫 (Vault) 結構中。」*
3. 開啟 `AGENT_PROMPT.md` 並在頂部加入註解，告訴 AI 也要讀取您現有的指示文件（例如，*「請閱讀 `CLAUDE.md` 以了解我們舊的專案規則」*）。

### `/sync` 指令
如果您和 AI 聊了很久，它似乎忘記了規則，或者您只是想強迫它更新文件，只需輸入：
> `/sync`

AI 已被設定為在看到此指令時立即重新閱讀其指示並更新您的 `Vault` 儀表板。

### 模組化代理路由器 (Vault/OS/)
OmniBrain 使用**模組化路由器架構**來節省 AI 的 Token 限制並保持其專注力。
- `AGENT_PROMPT.md` 不再是一大串冗長的指示。它只是一個「路由器」。
- 根據您要求 AI 執行的操作，路由器會指示 AI 讀取儲存在 `Vault/OS/` 資料夾中的特定、詳細的指示文件（例如 `Coding_Directives.md` 或 `Vault_Directives.md`）。
- **如果您想改變 AI 撰寫程式碼的方式**，請不要編輯主提示詞！相反地，請編輯 `Vault/OS/Coding_Directives.md`。

### 多代理團隊與安全重構 (Multi-Agent Team & Safe Refactoring)
OmniBrain 內建了一個專家**子代理團隊**（如程式碼審查員、架構師和 UI 設計師）。
- **觸發子代理**：只需告訴您的 AI *「審查我的程式碼 (Review my code)」*、*「審查架構 (Audit the architecture)」* 或 *「設計 UI (Design the UI)」*。您的 AI 將自動呼叫一個子代理來提供協助。
- **安全重構協議**：當您想對程式碼庫進行大幅更改時，請要求您的 AI 執行安全重構協議。子代理被嚴格禁止撰寫應用程式的程式碼——它們充當安全網。它們會在主 AI 套用更改*之前*起草計畫並審查程式碼差異，確保您的專案永遠不會損壞！

### 使用多個 AI（大腦隔離規則）
如果您使用 AI 為「另一個」 AI（如外部雲端代理）生成提示詞，請記住第二個 AI 無法讀取您本機的 `Vault` 資料夾！您的主 AI 被指示要遵循**大腦隔離規則**：它會自動將相關規則從您的知識庫複製貼上到提示詞中，這樣第二個 AI 就不會破壞您的專案。

### Markdown 驅動的語法檢查
OmniBrain 會自動防止 AI 幻覺。如果您告訴 AI *「永遠不要使用 scrollIntoView」*，它會將該規則儲存在 `Vault/Anti_Patterns.md` 中。內建的檢查工具 (`npm run check-ai-rules`) 會主動讀取這個純文字 Markdown 檔案，並從根本上阻止 AI 再次犯這個錯誤——您完全不需要寫程式！
