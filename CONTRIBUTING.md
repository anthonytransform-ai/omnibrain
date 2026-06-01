# Contributing to OmniBrain

First off, thank you for considering contributing to OmniBrain! It's people like you that make OmniBrain such a great tool for the Vibe Coder community.

## 🤝 How Can I Contribute?

### 1. Adding New AI Linter Rules
Our `check-ai-rules.template.js` is designed to prevent AI agents from hallucinating or making architectural mistakes.
If you know a common mistake that Claude, GPT-4, or Gemini makes (e.g., using deprecated APIs or bad React state patterns):
- Submit a Pull Request modifying `omnibrain-templates/check-ai-rules.template.js`.
- Add a new regex pattern to the `bannedPatterns` array.

### 2. Improving the Vault Templates
The Maps of Content (MOCs) and Dashboard templates dictate how the AI organizes the project's memory. If you have a better structural idea:
- Modify the `.template.md` files inside the `omnibrain-templates/` directory.

### 3. Translating the Prompts
We currently support English and Traditional Chinese (ZH-HK). We welcome translations of `AGENT_PROMPT.md` and `INSTRUCTIONS_FOR_HUMANS.md` into other languages!

## 📝 Pull Request Process
1. Fork the repo and create your branch from `main`.
2. Make sure you run `npm test` (if applicable) before submitting.
3. Update the `README.md` Contributors section with your name if it is your first contribution.
4. Issue that pull request!
