---
type: index
feature: "Agent OS Skills"
status: active
tags: [omnibrain, skills, capabilities, index]
---

# Agent OS Skills Index

This index catalogs the available workflows within the system. Agents and Subagents are expected to use these mental models to guarantee high-quality outputs.

## Lifecycle & Workflow Skills
These skills enforce process quality.

- **Context Engineering**: Optimizing agent context setup to prevent context starvation. Read the project rules and system MOCs before attempting logic.
- **Spec-Driven Development (SDD)**: Enforces the Specify & Clarify phases before architecture generation. Never write code based on assumptions.
- **Planning & Task Breakdown**: Breaks large features into verifiable task lists.
- **Test-Driven Development (TDD)**: Mandates Red-Green-Refactor cycles.
- **Doubt-Driven Development**: Demands adversarial reviews (double-checking your own logic with a fresh perspective) for non-trivial code before committing it to disk.
- **5-Axis Code Review**: The core review framework used by the `code-reviewer` subagent (Correctness, Readability, Architecture, Security, Performance).
