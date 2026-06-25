import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse arguments
const args = process.argv.slice(2);
const force = args.includes('--force');

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
    console.log(`\x1b[33m[-] Skipped (already exists):\x1b[0m ${path.relative(__dirname, dest)}`);
  } else {
    fs.copyFileSync(src, dest);
    console.log(`\x1b[32m[\u2713] ${fs.existsSync(dest) ? 'Overwrote' : 'Created'}:\x1b[0m ${path.relative(__dirname, dest)}`);
  }
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[36m   Initializing OmniBrain Agent Framework v2...\x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// 1. Create Vault Directories
const directories = [
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
  'Vault/Obsidian/Queries',
  'scripts'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`\x1b[32m[\u2713] Created Directory:\x1b[0m ${dir}`);
  }
});

// 2. Scaffold Config (if missing)
const configPath = path.join(__dirname, 'omnibrain.config.json');
if (!fs.existsSync(configPath)) {
  const configContent = {
    project_id: "omnibrain-project",
    source_roots: ["src"],
    vault_version: "2.0.1"
  };
  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2) + '\n');
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m omnibrain.config.json`);
}

// 3. Scaffold Package.json (if missing)
const pkgPath = path.join(__dirname, 'package.json');
const targetScripts = {
  "setup": "node omnibrain-setup.js",
  "test": "node scripts/run-tests.js",
  "check-ai-rules": "node scripts/check-ai-rules.js",
  "vault-autotag": "node scripts/vault-autotag.js",
  "vault-archive": "node scripts/vault-archive.js",
  "vault-health": "node scripts/vault-health.js",
  "vault-maintenance": "npm run vault-autotag && npm run vault-health && npm run vault-archive",
  "vault-maintenance:apply": "npm run vault-autotag -- --apply && npm run vault-health && npm run vault-archive -- --apply",
  "obsidian-check": "node scripts/obsidian-check.js",
  "omnibrain-migrate": "node scripts/omnibrain-migrate.js"
};

if (!fs.existsSync(pkgPath)) {
  const pkgContent = {
    name: "omnibrain-project",
    version: "2.0.1",
    description: "An AI Agent managed project (v2).",
    type: "module",
    scripts: targetScripts
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2) + '\n');
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m package.json`);
} else {
  const pkgContent = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkgContent.scripts = {
    ...(pkgContent.scripts || {}),
    ...targetScripts
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2) + '\n');
  console.log(`\x1b[32m[✓] Updated:\x1b[0m package.json scripts`);
}

// 4. Move Templates into place
const templateDir = path.join(__dirname, 'omnibrain-templates');
if (fs.existsSync(templateDir)) {
  // Root level bootstrap
  copyIfMissing(path.join(templateDir, 'agents.template.md'), path.join(__dirname, 'AGENTS.md'), force);

  // Core OS Layer
  copyIfMissing(path.join(templateDir, 'entry.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Runtime', 'Entry.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-registry.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Registries', 'Workflow_Registry.md'), force);
  
  // Workflows
  copyIfMissing(path.join(templateDir, 'workflow-feature-planning.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Workflows', 'Feature_Planning.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-implementation.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Workflows', 'Implementation.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-staged-change.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Workflows', 'Staged_Change.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-knowledge-update.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Workflows', 'Knowledge_Update.md'), force);
  copyIfMissing(path.join(templateDir, 'workflow-review.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Workflows', 'Review.md'), force);

  // Standards
  copyIfMissing(path.join(templateDir, 'standards-knowledge-format.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Standards', 'Knowledge_Format.md'), force);
  copyIfMissing(path.join(templateDir, 'anti-patterns.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Standards', 'Anti_Patterns.md'), force);
  
  // Validation
  copyIfMissing(path.join(templateDir, 'validation-vault-health-check.template.md'), path.join(__dirname, 'Vault', 'Core_OS', 'Validation', 'Vault_Health_Check.md'), force);

  // Project Layer (User data - force checks prevent accidental loss)
  copyIfMissing(path.join(templateDir, 'project-overview.template.md'), path.join(__dirname, 'Vault', 'Project', 'Project_Overview.md'), force);
  copyIfMissing(path.join(templateDir, 'current-state.template.md'), path.join(__dirname, 'Vault', 'Project', 'Current_State.md'), force);
  copyIfMissing(path.join(templateDir, 'definition-of-done.template.md'), path.join(__dirname, 'Vault', 'Project', 'Definition_of_Done.md'), force);
  copyIfMissing(path.join(templateDir, 'system-moc.template.md'), path.join(__dirname, 'Vault', 'Project', 'System', '_System_MOC.md'), force);
  copyIfMissing(path.join(templateDir, 'features-moc.template.md'), path.join(__dirname, 'Vault', 'Project', 'Features', '_Features_MOC.md'), force);
  copyIfMissing(path.join(templateDir, 'product-vision.template.md'), path.join(__dirname, 'Vault', 'Project', 'System', 'Product_Vision.md'), force);

  // Obsidian Configurations & Views
  copyIfMissing(path.join(templateDir, 'obsidian-install.template.md'), path.join(__dirname, 'Vault', 'Obsidian', 'INSTALL.md'), force);
  copyIfMissing(path.join(templateDir, 'obsidian-daily-log.template.md'), path.join(__dirname, 'Vault', 'Obsidian', 'Templates', 'Daily_Log.md'), force);
  copyIfMissing(path.join(templateDir, 'obsidian-dashboard-queries.template.md'), path.join(__dirname, 'Vault', 'Obsidian', 'Queries', 'Dashboard.md'), force);
  copyIfMissing(path.join(templateDir, 'dashboard.template.md'), path.join(__dirname, 'Vault', 'Dashboard.md'), force);

  // Scripts
  copyIfMissing(path.join(templateDir, 'check-ai-rules.template.js'), path.join(__dirname, 'scripts', 'check-ai-rules.js'), true); // Always overwrite script executables to keep them in sync
  copyIfMissing(path.join(templateDir, 'vault-health.template.js'), path.join(__dirname, 'scripts', 'vault-health.js'), true);
  copyIfMissing(path.join(templateDir, 'vault-archive.template.js'), path.join(__dirname, 'scripts', 'vault-archive.js'), true);
  copyIfMissing(path.join(templateDir, 'vault-autotag.template.js'), path.join(__dirname, 'scripts', 'vault-autotag.js'), true);
  copyIfMissing(path.join(templateDir, 'omnibrain-migrate.template.js'), path.join(__dirname, 'scripts', 'omnibrain-migrate.js'), true);
  copyIfMissing(path.join(templateDir, 'obsidian-check.template.js'), path.join(__dirname, 'scripts', 'obsidian-check.js'), true);
  copyIfMissing(path.join(templateDir, 'run-tests.template.js'), path.join(__dirname, 'scripts', 'run-tests.js'), true);
} else {
  console.error("\x1b[31m[!] Error: 'omnibrain-templates' folder is missing!\x1b[0m");
  process.exit(1);
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[32m\u2728 OmniBrain Setup Complete! \u2728\x1b[0m");
console.log("\x1b[36m===============================================\x1b[0m");
console.log("Next steps for the user / developer:");
console.log("1. Open the 'Vault' directory in Obsidian Desktop.");
console.log("2. Follow instructions in Vault/Obsidian/INSTALL.md.");
console.log("3. Run 'npm run obsidian-check' to verify Obsidian plugin installation.");
console.log("4. Run 'npm test' to verify overall framework health.\n");


