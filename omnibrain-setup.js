import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to copy files safely
function copyFileSafe(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`\x1b[32m[\u2713] Created:\x1b[0m ${dest}`);
  } else {
    console.error(`\x1b[31m[!] Template missing:\x1b[0m ${src}`);
  }
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[36m   Initializing OmniBrain Agent Framework...\x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// 1. Create Vault Directories
const directories = [
  'Vault',
  'Vault/Entities',
  'Vault/System',
  'Vault/Features',
  'Vault/Agents',
  'Vault/Plans',
  'Vault/OS',
  'scripts'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`\x1b[32m[\u2713] Created Directory:\x1b[0m ${dir}`);
  }
});

// 2. Scaffold Package.json (if missing)
const pkgPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(pkgPath)) {
  const pkgContent = {
    name: "omnibrain-project",
    version: "1.0.0",
    description: "An AI Agent managed project.",
    type: "module",
    scripts: {
      "check-ai-rules": "node scripts/check-ai-rules.js",
      "vault-autotag": "node scripts/vault-autotag.js",
      "vault-archive": "node scripts/vault-archive.js",
      "vault-health": "node scripts/vault-health.js",
      "vault-maintenance": "npm run vault-autotag && npm run vault-health && npm run vault-archive",
      "omnibrain-migrate": "node scripts/omnibrain-migrate.js"
    }
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2));
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m package.json`);
} else {
  console.log(`\x1b[33m[-] package.json already exists. Please manually add the 'check-ai-rules', 'vault-health', and 'omnibrain-migrate' scripts.\x1b[0m`);
}

// 2.5 Scaffold Default Entities
const userEntityPath = path.join(__dirname, 'Vault', 'Entities', 'User.md');
if (!fs.existsSync(userEntityPath)) {
  fs.writeFileSync(userEntityPath, `---\ntype: entity\n---\n# The User\n\n## 📌 Core Observations\n- Observation: This user is the Product Manager / Visionary.\n- Observation: Preferences and goals should be recorded here.\n`);
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m Vault/Entities/User.md`);
}

const agentEntityPath = path.join(__dirname, 'Vault', 'Entities', 'Agent.md');
if (!fs.existsSync(agentEntityPath)) {
  fs.writeFileSync(agentEntityPath, `---\ntype: entity\n---\n# The Agent\n\n## 📌 Core Observations\n- Observation: You are the Chief AI Architect.\n- Observation: System prompt override rules can be stored here.\n`);
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m Vault/Entities/Agent.md`);
}

// 3. Move Templates into place
const templateDir = path.join(__dirname, 'omnibrain-templates');
if (fs.existsSync(templateDir)) {
  copyFileSafe(path.join(templateDir, 'dashboard.template.md'), path.join(__dirname, 'Vault', 'Dashboard.md'));
  copyFileSafe(path.join(templateDir, 'anti-patterns.template.md'), path.join(__dirname, 'Vault', 'Anti_Patterns.md'));
  copyFileSafe(path.join(templateDir, 'definition-of-done.template.md'), path.join(__dirname, 'Vault', 'Definition_of_Done.md'));
  copyFileSafe(path.join(templateDir, 'os-router-architecture.template.md'), path.join(__dirname, 'Vault', 'OS', 'Router_Architecture.md'));
  copyFileSafe(path.join(templateDir, 'os-vault-directives.template.md'), path.join(__dirname, 'Vault', 'OS', 'Vault_Directives.md'));
  copyFileSafe(path.join(templateDir, 'os-coding-directives.template.md'), path.join(__dirname, 'Vault', 'OS', 'Coding_Directives.md'));
  copyFileSafe(path.join(templateDir, 'os-subagent-directives.template.md'), path.join(__dirname, 'Vault', 'OS', 'Subagent_Directives.md'));
  copyFileSafe(path.join(templateDir, 'os-planning-directives.template.md'), path.join(__dirname, 'Vault', 'OS', 'Planning_Directives.md'));
  copyFileSafe(path.join(templateDir, 'system-moc.template.md'), path.join(__dirname, 'Vault', 'System', '_System_MOC.md'));
  copyFileSafe(path.join(templateDir, 'features-moc.template.md'), path.join(__dirname, 'Vault', 'Features', '_Features_MOC.md'));
  copyFileSafe(path.join(templateDir, 'agents-moc.template.md'), path.join(__dirname, 'Vault', 'Agents', '_Agents_MOC.md'));
  copyFileSafe(path.join(templateDir, 'code-reviewer.template.md'), path.join(__dirname, 'Vault', 'Agents', 'Code_Reviewer.md'));
  copyFileSafe(path.join(templateDir, 'architect.template.md'), path.join(__dirname, 'Vault', 'Agents', 'Architect.md'));
  copyFileSafe(path.join(templateDir, 'ui-designer.template.md'), path.join(__dirname, 'Vault', 'Agents', 'UI_Designer.md'));
  copyFileSafe(path.join(templateDir, 'vault-keeper.template.md'), path.join(__dirname, 'Vault', 'Agents', 'Vault_Keeper.md'));
  copyFileSafe(path.join(templateDir, 'skills-index.template.md'), path.join(__dirname, 'Vault', 'System', 'Skills_Index.md'));
  copyFileSafe(path.join(templateDir, 'check-ai-rules.template.js'), path.join(__dirname, 'scripts', 'check-ai-rules.js'));
  copyFileSafe(path.join(templateDir, 'vault-health.template.js'), path.join(__dirname, 'scripts', 'vault-health.js'));
  copyFileSafe(path.join(templateDir, 'vault-archive.template.js'), path.join(__dirname, 'scripts', 'vault-archive.js'));
  copyFileSafe(path.join(templateDir, 'vault-autotag.template.js'), path.join(__dirname, 'scripts', 'vault-autotag.js'));
  copyFileSafe(path.join(templateDir, 'omnibrain-migrate.template.js'), path.join(__dirname, 'scripts', 'omnibrain-migrate.js'));
} else {
  console.error("\x1b[31m[!] Error: 'omnibrain-templates' folder is missing! Please ensure you downloaded the full repository.\x1b[0m");
  process.exit(1);
}

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[32m\u2728 OmniBrain Setup Complete! \u2728\x1b[0m");
console.log("\x1b[36m===============================================\x1b[0m");
console.log("Next steps for the AI Agent:");
console.log("1. Read Vault/Dashboard.md to understand the current project state.");
console.log("2. Read Vault/Agents/_Agents_MOC.md to understand your role.");
console.log("3. Run 'npm run vault-health' to ensure the Vault is intact.");
console.log("4. Begin coding!\n");
