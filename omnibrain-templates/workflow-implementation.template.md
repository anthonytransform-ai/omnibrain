---
type: workflow
status: active
tags: [workflow, implementation, coding]
---

# Implementation Workflow

This workflow governs active development and coding tasks.

## Pre-Flight Check
Before writing any code, execute the pre-flight checks:
1. Ensure the user has approved the plan or stage.
2. Load any architectural rules from `Vault/Core_OS/Standards/Anti_Patterns.md` to avoid banned practices.
3. If the user named a task, use the matching task file in `Vault/Work/Tasks/` as the current working record.
4. If the current task lacks the standard body headings, add them while preserving existing content:
   - `## What we are trying to achieve`
   - `## What happens next`
   - `## What I need to decide`
   - `## Useful notes`

## Minimum Sufficient Process

Choose the least complicated safe way to complete the task. Consider setup, execution, verification, future maintenance, handover, cleanup, time and AI usage. Add branches, documents, services, workflows or approval steps only when they reduce a real risk or coordination problem.

For ordinary work:
- use the current task file;
- do not automatically create a separate plan;
- do not automatically create a branch;
- do not automatically request an independent reviewer;
- keep validation proportionate to the change.

## Task Lifecycle Authority

Task stage movement remains a human decision.

- The agent may recommend a stage.
- The agent may change `stage` only after direct user instruction.
- The agent must not silently move a task.
- Do not treat a recommendation as approval.
- When `needs_user_decision` is true, explain the required decision in `What I need to decide`, stop at the affected boundary, and wait for the user.

## Doubt-Driven Development
Before writing complex or non-trivial logic:
1. Run a "fresh-context" mental simulation of your proposed code.
2. Interrogate your own design: What could fail? Where is state duplicated? Is there a simpler approach?
3. Avoid "vibe coding" — ensure every line has a clear purpose and handles edge cases.

## Incremental Coding
1. Write the minimum amount of code to achieve the goal.
2. Run the OmniBrain rule checker regularly:
   `node omnibrain/scripts/check-ai-rules.js`
3. Run the OmniBrain vault health check to verify links and required embeds:
   `node omnibrain/scripts/vault-health.js`
4. Treat host-application tests separately. Inspect the host project for its existing test command or documented validation, run it only when relevant and safe, and do not assume a default npm test script.
5. Do not run OmniBrain's framework-development tests as though they were the host application's tests.

## Post-Implementation Handshake
Once verified, summarize changes made and ask:
> "Is there anything from this task that should be kept as lasting project knowledge?"

If the user says no, leave the task as a working record. Move it to Done or Archive only when instructed.

If the user says yes, update the owning System or Feature document, preserve and enrich existing knowledge, and update the relevant index where needed. Archive the task only when instructed.
