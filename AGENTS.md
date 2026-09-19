# OmniBrain Workspace Bootstrap

This workspace contains a local OmniBrain vault at `Vault/`.

## Developer Mode vs Public Mode Routing

First, check whether `.j_os/project-link.local.md` exists:

- **If it exists:** use only the J_OS Bridge Route below.
- **If it does not exist:** use only the Local OmniBrain Vault Route below.

### J_OS Bridge Route (Developer Mode)

1. Read the fixed local file `.j_os/project-link.local.md`.
2. Validate `type: j_os_workspace_link`, canonical lowercase `project_id` and `j_os_root`; verify the link is a regular local file and the root resolves to the active J_OS vault.
3. Read `<j_os_root>/Core_OS/Runtime/Entry.md` and follow it for the linked project.

Runtime Entry owns J_OS orientation, project-binding resolution, task expansion and workflow transitions. Load detailed J_OS/project material only when the active task requires it.

If the local link exists but is unreadable, malformed, contradictory or points to an invalid root/binding, report the exact problem and stop dependent J_OS routing. Do not fall back to Public Mode, guess paths or create an unverified link.

Keep the local link untracked and ignored by Git.

### Local OmniBrain Vault Route (Public Mode)

If `.j_os/project-link.local.md` does not exist, read only:

1. `Vault/Core_OS/Runtime/Entry.md`
2. `Vault/Project/Current_State.md`
3. `Vault/Project/System/_System_MOC.md`
4. `Vault/Project/Features/_Features_MOC.md`
5. `Vault/Core_OS/Registries/Workflow_Registry.md`

Then follow the local OmniBrain Runtime Entry.
