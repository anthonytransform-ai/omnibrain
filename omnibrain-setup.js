import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse arguments
const args = process.argv.slice(2);
const force = args.includes('--force');

// Resolve target project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frameworkDir = __dirname;

let projectRootDir;
const prIndex = args.indexOf('--project-root');
if (prIndex !== -1 && args[prIndex + 1]) {
  projectRootDir = path.resolve(args[prIndex + 1]);
} else {
  // If the frameworkDir is named 'omnibrain', then project root is the parent.
  if (path.basename(frameworkDir) === 'omnibrain') {
    projectRootDir = path.dirname(frameworkDir);
  } else {
    projectRootDir = frameworkDir;
  }
}

// Helper function to copy files safely and non-destructively
function copyIfMissing(src, dest, forceOverwrite = false) {
  if (!fs.existsSync(src)) {
    console.error(`\x1b[31m[!] Template missing:\x1b[0m ${src}`);
    return;
  }

  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(dest) && !forceOverwrite) {
    console.log(`\x1b[33m[-] Skipped (already exists):\x1b[0m ${path.relative(projectRootDir, dest)}`);
  } else {
    const existsBefore = fs.existsSync(dest);
    fs.copyFileSync(src, dest);
    console.log(`\x1b[32m[✓] ${existsBefore ? 'Overwrote' : 'Created'}:\x1b[0m ${path.relative(projectRootDir, dest)}`);
  }
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[36m   Initializing OmniBrain Agent Framework v2.0.2...\x1b[0m");
console.log(`   Resolved target project root: ${projectRootDir}`);
console.log("\x1b[36m===============================================\n\x1b[0m");

// 1. Create Target Vault Directories
const targetDirs = [
  'Vault',
  'Vault/Core_OS',
  'Vault/Core_OS/Runtime',
  'Vault/Core_OS/Registries',
  'Vault/Core_OS/Workflows',
  'Vault/Core_OS/Standards',
  'Vault/Core_OS/Templates',
  'Vault/Core_OS/Validation',
  'Vault/Project',
  'Vault/Project/System',
  'Vault/Project/Features',
  'Vault/Project/Plans',
  'Vault/Project/Daily_Logs',
  'Vault/Project/_inbox',
  'Vault/Obsidian',
  'Vault/Obsidian/Templates',
  'Vault/Obsidian/Queries'
];

targetDirs.forEach(dir => {
  const dirPath = path.join(projectRootDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`\x1b[32m[✓] Created Directory:\x1b[0m ${dir}`);
  }
});

// Create framework scripts folder if it doesn't exist
const frameworkScriptsDir = path.join(frameworkDir, 'scripts');
if (!fs.existsSync(frameworkScriptsDir)) {
  fs.mkdirSync(frameworkScriptsDir, { recursive: true });
}

// 2. Scaffold Config (if missing)
const configPath = path.join(projectRootDir, 'omnibrain.config.json');
if (!fs.existsSync(configPath)) {
  const configContent = {
    project_id: "omnibrain-project",
    source_roots: ["src"],
    vault_version: "2.0.2"
  };
  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2) + '\n');
  console.log(`\x1b[32m[✓] Generated:\x1b[0m omnibrain.config.json`);
}

// 3. Move Templates into place
const templateDir = path.join(frameworkDir, 'omnibrain-templates');
if (fs.existsSync(templateDir)) {
  // Root level bootstrap
  const agentsPath = path.join(projectRootDir, 'AGENTS.md');
  const agentsTemplate = path.join(templateDir, 'agents.template.md');
  if (!fs.existsSync(agentsPath)) {
    copyIfMissing(agentsTemplate, agentsPath, false);
  } else {
    const snippetPath = path.join(frameworkDir, 'AGENTS.omnibrain-snippet.md');
    const snippetContent = `# OmniBrain Workspace Bootstrap Integration Snippet

If you wish to merge OmniBrain into your existing AGENTS.md, please add the following block:

\`\`\`markdown
# OmniBrain Workspace Bootstrap

This workspace uses a local OmniBrain vault at \`Vault/\`.

Read only:

1. \`Vault/Core_OS/Runtime/Entry.md\`
2. \`Vault/Project/Current_State.md\`
3. \`Vault/Project/System/_System_MOC.md\`
4. \`Vault/Project/Features/_Features_MOC.md\`
5. \`Vault/Core_OS/Registries/Workflow_Registry.md\`

Then follow Runtime Entry.
\`\`\`
`;
    fs.writeFileSync(snippetPath, snippetContent);
    console.log(`\x1b[33m[-] Skipped (already exists):\x1b[0m AGENTS.md (written snippet to ${path.relative(projectRootDir, snippetPath)})`);
  }

  // Core OS Layer (framework-owned: overwritten with --force)
  copyIfMissing(path.join(templateDir, 'entry.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Runtime', 'Entry.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-registry.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Registries', 'Workflow_Registry.md'), force);
  
  // Workflows (framework-owned: overwritten with --force)
  copyIfMissing(path.join(templateDir, 'workflow-feature-planning.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Workflows', 'Feature_Planning.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-implementation.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Workflows', 'Implementation.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-staged-change.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Workflows', 'Staged_Change.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-knowledge-update.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Workflows', 'Knowledge_Update.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-review.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Workflows', 'Review.md'), force);

  // Standards (framework-owned: overwritten with --force)
  copyIfMissing(path.join(templateDir, 'standards-knowledge-format.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Standards', 'Knowledge_Format.md'), force);
  copyIfMissing(path.join(templateDir, 'anti-patterns.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Standards', 'Anti_Patterns.md'), force);
  
  // Validation (framework-owned: overwritten with --force)
  copyIfMissing(path.join(templateDir, 'validation-vault-health-check.template.md'), path.join(projectRootDir, 'Vault', 'Core_OS', 'Validation', 'Vault_Health_Check.md'), force);

  // Project Layer (User data: NEVER overwritten by --force)
  copyIfMissing(path.join(templateDir, 'project-overview.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'Project_Overview.md'), false);
  copyIfMissing(path.join(templateDir, 'current-state.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'Current_State.md'), false);
  copyIfMissing(path.join(templateDir, 'definition-of-done.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'Definition_of_Done.md'), false);
  copyIfMissing(path.join(templateDir, 'system-moc.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'System', '_System_MOC.md'), false);
  copyIfMissing(path.join(templateDir, 'features-moc.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'Features', '_Features_MOC.md'), false);
  copyIfMissing(path.join(templateDir, 'product-vision.template.md'), path.join(projectRootDir, 'Vault', 'Project', 'System', 'Product_Vision.md'), false);

  // Obsidian Configurations & Views (framework-owned: overwritten with --force)
  copyIfMissing(path.join(templateDir, 'obsidian-install.template.md'), path.join(projectRootDir, 'Vault', 'Obsidian', 'INSTALL.md'), force);
  copyIfMissing(path.join(templateDir, 'obsidian-daily-log.template.md'), path.join(projectRootDir, 'Vault', 'Obsidian', 'Templates', 'Daily_Log.md'), force);

  // Dashboard (project root dashboard: NEVER overwritten by --force)
  copyIfMissing(path.join(templateDir, 'dashboard.template.md'), path.join(projectRootDir, 'Vault', 'Dashboard.md'), false);

  // Scripts (always written to framework's own scripts folder)
  copyIfMissing(path.join(templateDir, 'check-ai-rules.template.js'), path.join(frameworkDir, 'scripts', 'check-ai-rules.js'), true);
  copyIfMissing(path.join(templateDir, 'vault-health.template.js'), path.join(frameworkDir, 'scripts', 'vault-health.js'), true);
  copyIfMissing(path.join(templateDir, 'vault-archive.template.js'), path.join(frameworkDir, 'scripts', 'vault-archive.js'), true);
  copyIfMissing(path.join(templateDir, 'vault-autotag.template.js'), path.join(frameworkDir, 'scripts', 'vault-autotag.js'), true);
  copyIfMissing(path.join(templateDir, 'omnibrain-migrate.template.js'), path.join(frameworkDir, 'scripts', 'omnibrain-migrate.js'), true);
  copyIfMissing(path.join(templateDir, 'obsidian-check.template.js'), path.join(frameworkDir, 'scripts', 'obsidian-check.js'), true);
  copyIfMissing(path.join(templateDir, 'run-tests.template.js'), path.join(frameworkDir, 'scripts', 'run-tests.js'), true);
} else {
  console.error("\x1b[31m[!] Error: 'omnibrain-templates' folder is missing!\x1b[0m");
  process.exit(1);
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[32m✨ OmniBrain Setup Complete! ✨\x1b[0m");
console.log("\x1b[36m===============================================\x1b[0m");
console.log("Next steps for the user / developer:");
console.log("1. Open the 'Vault' directory in Obsidian Desktop.");
console.log("2. Follow instructions in Vault/Obsidian/INSTALL.md.");
console.log(`3. Run 'node ${path.relative(projectRootDir, path.join(frameworkDir, 'scripts/obsidian-check.js'))}' to verify Obsidian plugin installation.`);
console.log(`4. Run 'node ${path.relative(projectRootDir, path.join(frameworkDir, 'scripts/run-tests.js'))}' to verify overall framework health.\n`);
