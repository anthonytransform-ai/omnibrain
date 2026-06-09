# OmniBrain (全知大腦) - The Vibe Coder's AI Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Welcome to **OmniBrain**! This project provides a structured "Memory Bank" and AI-Constraint framework specifically designed for non-programmers (Vibe Coders) who use AI Agents (like Cursor, Claude, ChatGPT, or Gemini) to build software. 

### Why Use OmniBrain?
When you build large applications with AI, the AI eventually forgets old rules, hallucinates bad code, or breaks existing features because its context window gets overwhelmed. OmniBrain solves this by acting as a permanent "Long-Term Memory" for your AI.
- **No Coding Required:** You just install it and talk to your AI. OmniBrain does the rest.
- **Zero Hallucinations:** OmniBrain includes an automated Markdown Linter. If you tell the AI "never use X", it writes that rule down and physically blocks itself from ever making that mistake again.
- **Modular Agent Router:** Prevents "context bloat" by using a lightweight routing prompt that only loads the specific instructions (Coding, Architecture, or Vault Maintenance) your AI needs for the current task, saving tokens and improving focus.
- **Multi-Agent Team:** OmniBrain comes with a native team of expert subagents (Code Reviewers, Architects, UI Designers). By typing 'Review my code' or 'Design the UI', your main AI will spawn specialized subagents to double-check work and prevent bugs.
- **Vault Maintenance:** The framework automatically archives old plans and distills architectural decisions into a single source of truth.

---

## 🚀 How to Use (For Vibe Coders)
You do not need to run any terminal commands or configure anything.

1. **Download the code:** Click the green "Code" button at the top of this page and select **Download ZIP**, then unzip it into an empty folder where you want to build your app.
2. **Open your AI Editor:** Open that folder inside your favorite AI coding assistant (like Cursor or Windsurf).
3. **Start the Magic:** Open the file [`AGENT_PROMPT.md`](./AGENT_PROMPT.md), copy all the text inside, and paste it into your AI chat.
4. The AI will automatically scaffold your project's Knowledge Base (Vault) and set up all the automated rules!

For more detailed setup instructions, please read [`INSTRUCTIONS_FOR_HUMANS.md`](./INSTRUCTIONS_FOR_HUMANS.md).

---

## 🛠️ For Open Source Contributors
Are you a developer who wants to make OmniBrain better? We would love your help!

The true power of this framework comes from its **Templates** and **AI Linter Rules**. If you have discovered a fantastic System Prompt, or you have written a regex rule that prevents AI hallucination, please contribute it!

Read our [`CONTRIBUTING.md`](./CONTRIBUTING.md) to see how you can submit Pull Requests.

---

## 🇭🇰 繁體中文說明

歡迎來到 **OmniBrain**！這個專案提供了一個結構化的「記憶庫」與 AI 限制框架，專為使用 AI 助理（如 Cursor、Claude、ChatGPT 或 Gemini）來開發軟體的非程式開發人員（Vibe Coders）所設計。

### 為什麼要使用 OmniBrain？
當您使用 AI 建立大型應用程式時，AI 最終會忘記舊規則、產生糟糕的程式碼幻覺，或是因為上下文視窗（Context Window）不堪負荷而破壞現有功能。OmniBrain 透過充當 AI 的永久「長期記憶」來解決這個問題。
- **無需寫程式：** 您只需安裝它並與您的 AI 對話。OmniBrain 會處理剩下的所有事情。
- **零幻覺：** OmniBrain 包含一個自動化的 Markdown 語法檢查工具（Linter）。如果您告訴 AI「永遠不要使用 X」，它會記下這個規則，並從根本上阻止自己再次犯下這個錯誤。
- **模組化代理路由器：** 透過使用輕量級的路由提示詞，僅載入 AI 當前任務所需的特定指令（程式開發、架構或知識庫維護），防止「上下文過載」，從而節省 Token 並提高專注力。
- **多代理團隊：** OmniBrain 配備了一個原生的專家子代理（Subagent）團隊（包含程式碼審查員、架構師、UI 設計師）。只要輸入「審查我的程式碼」或「設計 UI」，您的主 AI 就會呼叫專屬的子代理來進行雙重檢查並防止出錯。
- **知識庫維護：** 框架會自動將舊計畫封存，並將架構決策萃取成單一的真實來源。

---

## 🚀 如何使用 (給 Vibe Coders)
您不需要執行任何終端機指令或進行任何設定。

1. **下載程式碼：** 點擊此頁面頂部的綠色「Code」按鈕並選擇 **Download ZIP**，然後將其解壓縮到您想建立應用程式的空白資料夾中。
2. **開啟您的 AI 編輯器：** 在您最喜歡的 AI 程式開發助手（如 Cursor 或 Windsurf）中開啟該資料夾。
3. **啟動魔法：** 開啟 [`AGENT_PROMPT.md`](./AGENT_PROMPT.md) 檔案，複製裡面的所有文字，並將其貼上到您的 AI 聊天視窗中。
4. AI 將會自動為您的專案建構知識庫 (Vault) 並設定所有的自動化規則！

如需更詳細的設定說明，請閱讀 [`INSTRUCTIONS_FOR_HUMANS.md`](./INSTRUCTIONS_FOR_HUMANS.md)。

---

## 👥 Contributors & Maintainers
This project thrives on community input. A massive thank you to everyone who has contributed to making AI-assisted coding safer and more structured!

- **K & Agent J** - Vision & Original Concept
- *(Your name could be here! Submit a Pull Request to get added to the list.)*

---

*Licensed under the MIT License.*
