# OmniBrain (全知大腦) - The Vibe Coder's AI Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Welcome to **OmniBrain**! This project provides a structured "Memory Bank" and AI-Constraint framework specifically designed for non-programmers (Vibe Coders) who use AI Agents (like Cursor, Claude, ChatGPT, or Gemini) to build software. 

### Why Use OmniBrain?
When you build large applications with AI, the AI eventually forgets old rules, hallucinates bad code, or breaks existing features because its context window gets overwhelmed. OmniBrain solves this by acting as a permanent "Long-Term Memory" for your AI.
- **No Coding Required:** You just install it and talk to your AI. OmniBrain does the rest.
- **Zero Hallucinations:** OmniBrain includes an automated Markdown Linter. If you tell the AI "never use X", it writes that rule down and physically blocks itself from ever making that mistake again.
- **Modular Agent Router:** Prevents "context bloat" by using a lightweight routing prompt that only loads the specific instructions (Coding, Architecture, or Vault Maintenance) your AI needs for the current task, saving tokens and improving focus.
- **Vault Maintenance:** The framework automatically archives old plans and distills architectural decisions into a single source of truth.

---

## 🚀 How to Use (For Vibe Coders)
You do not need to run any terminal commands or configure anything.

1. Create an empty folder for your new app.
2. Tell your AI coding assistant: *"Clone this repository [Your Repo URL] into my folder."*
3. Next, copy the "Day 1 Magic Prompt" located in [`AGENT_PROMPT.md`](./AGENT_PROMPT.md) and paste it into your AI chat. 
4. The AI will automatically scaffold your project's Knowledge Base (Vault) and set up the automated linting rules!

For more detailed setup instructions, please read [`INSTRUCTIONS_FOR_HUMANS.md`](./INSTRUCTIONS_FOR_HUMANS.md).

---

## 🛠️ For Open Source Contributors
Are you a developer who wants to make OmniBrain better? We would love your help!

The true power of this framework comes from its **Templates** and **AI Linter Rules**. If you have discovered a fantastic System Prompt, or you have written a regex rule that prevents AI hallucination, please contribute it!

Read our [`CONTRIBUTING.md`](./CONTRIBUTING.md) to see how you can submit Pull Requests.

---

## 🇭🇰 繁體中文說明

歡迎來到 **OmniBrain**！這個項目提供了一個結構化的「記憶庫」和 AI 限制框架，專為使用 AI 代理（如 Cursor、Claude、ChatGPT 或 Gemini）來構建軟件的非程式設計師（Vibe Coders）設計。

### 為什麼使用 OmniBrain？
當你使用 AI 構建大型應用程式時，AI 最終會忘記舊規則、產生糟糕的程式碼幻覺，或者因為上下文窗口不堪重負而破壞現有功能。OmniBrain 透過充當 AI 的永久「長期記憶」來解決這個問題。
- **無需編程：** 你只需安裝它並與你的 AI 交談。OmniBrain 會處理剩下的事情。
- **零幻覺：** OmniBrain 包含一個自動化的 Markdown 檢查器。如果你告訴 AI「永遠不要使用 X」，它會記下這個規則，並在物理上阻止自己再次犯這個錯誤。
- **模組化代理路由器：** 透過使用輕量級的路由提示詞，僅載入 AI 當前任務所需的特定指令（編碼、架構或知識庫維護），防止「上下文過載」，從而節省 token 並提高專注力。
- **知識庫維護：** 框架會自動將舊計劃存檔，並將架構決策提煉成單一的真實來源。

---

## 🚀 如何使用 (給 Vibe Coders)
你不需要運行任何終端命令或進行任何配置。

1. 為你的新應用程式創建一個空白文件夾。
2. 告訴你的 AI 寫碼助手：*「將這個代碼庫 [你的 Repo URL] 克隆到我的文件夾中。」*
3. 接下來，複製位於 [`AGENT_PROMPT.md`](./AGENT_PROMPT.md) 中的「第 1 天魔法提示詞」，並將其貼上到你的 AI 聊天中。
4. AI 將自動構建你項目的知識庫 (Vault) 並設置自動化的檢查規則！

如需更詳細的設置說明，請閱讀 [`INSTRUCTIONS_FOR_HUMANS.md`](./INSTRUCTIONS_FOR_HUMANS.md)。

---

## 👥 Contributors & Maintainers
This project thrives on community input. A massive thank you to everyone who has contributed to making AI-assisted coding safer and more structured!

- **K & Agent J** - Vision & Original Concept
- *(Your name could be here! Submit a Pull Request to get added to the list.)*

---

*Licensed under the MIT License.*
