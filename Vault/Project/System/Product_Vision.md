---
type: system_doc
feature: "Product Vision"
status: active
tags: [omnibrain, product, vision]
---

# Product Vision

This document is the product compass for OmniBrain. Use it when evaluating public-facing changes, onboarding, documentation, defaults, or major product decisions.

## Short Pitch

OmniBrain is a portable, Markdown-first project memory framework for people building software with coding agents. It gives the agent a small, structured route to the right project facts while giving the human a readable local workspace in Obsidian.

## Audience

- **Primary:** Non-technical or lightly technical product owners, solo builders, and small teams using coding agents to build and maintain software.
- **Secondary:** Developers who want transparent, file-based project memory rather than tool-specific hidden context.
- **Maintainers:** Contributors who develop the OmniBrain framework itself through the optional J_OS developer bridge.

## Problem

AI-supported projects often lose essential context between sessions. Plans, implementation notes, product decisions, and operating rules become mixed together, scattered across chats, or locked inside a particular platform. This makes work slower, raises the chance of incorrect changes, and makes handover difficult.

## Experience Goals

- **Transparent:** Important knowledge is stored in readable Markdown files in the project, not an opaque service.
- **Portable:** The public framework works with any coding environment that can read workspace files.
- **Safe by default:** Setup and maintenance should protect host-project files and user-owned project memory.
- **Low-context:** Agents load only the memory required for the current task.
- **Human-readable:** Obsidian provides a clear dashboard and navigation without being required for agents to read the vault.
- **Honest about modes:** Public mode is self-contained; J_OS bridge mode is an optional maintainer workflow, never a public-user requirement.

## Non-Goals

- OmniBrain is not a hosted knowledge-management service, cloud-sync platform, or replacement for version control.
- It is not an autonomous multi-agent orchestration service.
- It must not require J_OS, a particular AI vendor, or a proprietary service for public use.
- It must not rewrite host-project configuration, package scripts, or user-owned Project memory to make installation convenient.
- It must not treat temporary plans or chat output as durable project truth without review and distillation.

## Success Signals

- A coding agent can orient to a project from the documented bootstrap and task-relevant memory without loading the whole vault.
- A user can install or update OmniBrain without damage to existing host-project files or user-owned project memory.
- Public users can use the framework without encountering J_OS-specific instructions or configuration.
- Maintainers can use the J_OS bridge without duplicating J_OS workflows into this repository.
- Human project owners can find current status, plans, and durable documentation quickly in Obsidian.
