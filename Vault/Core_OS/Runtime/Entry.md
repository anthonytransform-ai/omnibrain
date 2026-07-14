---
type: runtime_entry
status: active
tags: [runtime, boot, guided_workspace]
---

# Runtime Entry

This is the central boot controller for the OmniBrain vault.

## Session Start Protocol

When starting a session:
1. Read the project root `AGENTS.md`.
2. Read `Vault/Core_OS/Runtime/Entry.md`.
3. Read `Vault/Project/Current_State.md`.
4. Read `Vault/Project/System/_System_MOC.md`.
5. Read `Vault/Project/Features/_Features_MOC.md`.
6. Read `Vault/Core_OS/Registries/Workflow_Registry.md`.
7. Stop. Do not load every task, plan or detailed workflow during boot.

## OmniBrain Quick Calls

Quick Calls are conversational intent cues, not passwords, slash commands, CLI commands or exact-string parser inputs. Do not build or require exact-string matching. Accept equivalent natural-language requests in the user's language and route by meaning.

OmniBrain formally supports English and Traditional Chinese Quick Calls. The examples below are canonical examples, not exact commands. Exact wording, punctuation and capitalisation are not required. Do not require English. Do not translate Chinese requests into visible English before acting. Do not create a separate Chinese runtime, parser or language-detection system.

Quick Calls are requests to OmniBrain, not permission for unrelated work. Destructive, costly, publishing, privacy-sensitive and permission-changing actions still require direct approval. A recommendation is not approval.

| Canonical English example | Canonical Traditional Chinese example |
| :--- | :--- |
| `Start OmniBrain.` | `啟動 OmniBrain。` |
| `New task: [task name].` | `新增工作：[工作名稱]。` |
| `Work on [task name].` | `處理「[工作名稱]」。` |
| `My decisions?` | `有甚麼需要我決定？` |
| `Wrap up.` | `整理本次進度。` |
| `Keep as knowledge.` | `保留為專案知識。` |
| `Mark done.` | `標記為已完成。` |
| `Archive task.` | `封存工作。` |
| `Check OmniBrain.` | `檢查 OmniBrain。` |
| `Update OmniBrain.` | `更新 OmniBrain。` |

Equivalent requests by meaning in either language map to the same runtime behaviour. Examples include `請啟動 OmniBrain。`, `建立一個名為「改善新手流程」的工作。`, `繼續處理「改善新手流程」。`, `現在有甚麼等我決定？`, `今天先整理進度。` and `把這項決定保留為專案知識。`

| Runtime behaviour | Applies to both language examples |
| :--- | :--- |
| Start OmniBrain / 啟動 OmniBrain | Run the Session Start Protocol, then give a short orientation: identified project, current status or blocker, whether a task is already active if clearly recorded, and that OmniBrain is ready. Do not scan every task. Do not change any task stage. |
| New task / 新增工作 | Create `Vault/Work/Tasks/[task name].md` with safe readable filename handling, `stage: Ideas`, `needs_user_decision: false`, standard task headings, and never overwrite an existing task. If a matching or very similar task exists, show it and ask whether to use it. Use request details for purpose or summary when safe; do not invent product facts or create branches, plans or other documents automatically. Report the created filename. |
| Work on / 處理 | Use Named Task Handling. Search `Vault/Work/Tasks/`, select the exact or nearest clear task, ask if more than one plausible match exists, do not create a missing task unless the user requested `New task`, use the task file as the current working record, load only relevant project knowledge, choose an existing workflow from intent and task content, keep `What happens next` current, and do not change stage automatically. |
| My decisions / 需要我決定 | Inspect task metadata under `Vault/Work/Tasks/` for `needs_user_decision: true`. For each result show task name, summary, the content or concise meaning of `What I need to decide`, and current stage. If none exist, say so clearly. Do not clear the checkbox, resolve decisions, change stages or load unrelated task details unnecessarily. |
| Wrap up / 整理本次進度 | If there is a current task, record current position, update `What happens next`, record actual decisions made, record uncertainty or blockers, ensure `What I need to decide` is current, briefly state what was checked, and ask whether anything should be kept as lasting project knowledge. If there is no current task, summarise meaningful project work from the session, identify possible lasting knowledge, ask before changing durable project documents, and do not create a task merely to wrap up. Never mark Done, archive, change stage or preserve speculative information as durable knowledge. |
| Keep as knowledge / 保留為專案知識 | Treat as user approval to run the Knowledge Update workflow for the current task or clearly identified information. Identify the owning System or Feature document, preserve existing content, merge or append approved knowledge, update the relevant index when a new knowledge file is created, avoid temporary conversation detail, ask one concise clarification when "this" is materially ambiguous, and report which durable files changed. |
| Mark done / 標記為已完成 | Treat as direct human authority to set the current task `stage: Done`. If no current task is clear, ask which task. If `needs_user_decision` is true or an unresolved decision remains, explain it and do not mark Done until resolved. Clear `needs_user_decision` only when the related decision is genuinely resolved. Do not archive automatically. Report the stage change. |
| Archive task / 封存工作 | Treat as direct human authority to move the current task into `Vault/Work/Archive/`. If no current task is clear, ask which task. Preserve the complete task file, do not delete it, and do not archive automatically as part of `Wrap up` or `Mark done`. If the task is not `Done`, state that clearly and ask for confirmation before moving it. Report the archive path. |
| Check OmniBrain / 檢查 OmniBrain | Run non-destructive OmniBrain checks appropriate to the installed workspace: `node omnibrain/scripts/vault-health.js` and `node omnibrain/scripts/obsidian-check.js`. If the Vault has not been opened in Obsidian, report that as the next action. Do not claim Bases is enabled through undocumented internal state. Do not modify user files. Do not treat host-application tests as OmniBrain checks. Report pass, failure and next safe action clearly. |
| Update OmniBrain / 更新 OmniBrain | Treat as authority for a safe OmniBrain framework update, not host-application changes. Confirm host project and installed version, inspect whether local `omnibrain/` contains uncommitted or user-modified framework files, stop before destroying unreviewed customisation, obtain the current official framework from `https://github.com/anthonytransform-ai/omnibrain` through a safe temporary location, replace or refresh only framework source under `omnibrain/`, avoid nested `.git`, run `node omnibrain/omnibrain-setup.js --force`, preserve host files, host scripts, host configuration, root `AGENTS.md`, `Vault/Project/**`, task files, Archive files and `Vault/Dashboard.md`, run health validation, and report previous version, new version, changed framework files, preserved user content and remaining actions. Do not install system software automatically or claim success if source acquisition or validation failed. |

New task frontmatter:

```yaml
---
type: omnibrain_task
stage: Ideas
needs_user_decision: false
summary:
---
```

New task body:

```markdown
## What we are trying to achieve

## What happens next

## What I need to decide

## Useful notes
```

## Named Task Handling

When the user names a task:
1. Search `Vault/Work/Tasks/` for a matching filename.
2. Select the exact or closest matching task file.
3. If more than one plausible match exists, ask the user which one they mean.
4. Do not infer a different task.
5. Use that task Markdown file as the current working record.
6. If the task lacks the standard body headings, add them while preserving all existing task content:
   - `## What we are trying to achieve`
   - `## What happens next`
   - `## What I need to decide`
   - `## Useful notes`

## Task Lifecycle Authority

Task stage movement remains a human decision.

- An agent may recommend a stage.
- An agent may change `stage` only after direct user instruction.
- An agent must not silently move a task.
- Do not treat a recommendation as approval.
- When `needs_user_decision` is true, explain the required decision in `What I need to decide`, stop at the affected boundary, and wait for the user.

## Minimum Sufficient Process

Choose the least complicated safe way to complete the task. Consider setup, execution, verification, future maintenance, handover, cleanup, time and AI usage. Add branches, documents, services, workflows or approval steps only when they reduce a real risk or coordination problem.

For ordinary work, use the current task file. Do not automatically create a separate plan, branch or independent review. Use validation proportionate to the change.

## Task Continuity

While working:
- keep "What happens next" current in the task note;
- explain required decisions in "What I need to decide";
- record real user decisions;
- keep technical detail proportional;
- avoid extra plans or handoff files unless they solve a genuine need.

## Completion And Lasting Knowledge

When work is complete, ask:

> Is there anything from this task that should be kept as lasting project knowledge?

If the answer is no, leave the task as a working record and move it to Done or Archive only when instructed.

If the answer is yes, update the owning System or Feature document, preserve and enrich existing knowledge, and update the relevant index where needed. Archive the task only when instructed.

Completed task files are working records. They are not automatically permanent project knowledge.

## Workflow Expansion

When a workflow is required:
1. Match the user request against `Vault/Core_OS/Registries/Workflow_Registry.md`.
2. Load the matched workflow file from `Vault/Core_OS/Workflows/`.
3. Load only the project memory files linked in the System or Features MOCs that are relevant to the task.
4. Execute the workflow's specific steps.
5. Run validation checks when the workflow or risk level requires them.
