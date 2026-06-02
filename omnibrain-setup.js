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
  'Vault/System',
  'Vault/Features',
  'Vault/Agents',
  'scripts',
  'scripts/rules'
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
      "vault-health": "node scripts/vault-health.js"
    }
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2));
  console.log(`\x1b[32m[\u2713] Generated:\x1b[0m package.json`);
} else {
  console.log(`\x1b[33m[-] package.json already exists. Please manually add the 'check-ai-rules' and 'vault-health' scripts.\x1b[0m`);
}

// 3. Move Templates into place
const templateDir = path.join(__dirname, 'omnibrain-templates');
if (fs.existsSync(templateDir)) {
  copyFileSafe(path.join(templateDir, 'dashboard.template.md'), path.join(__dirname, 'Vault', 'Dashboard.md'));
  copyFileSafe(path.join(templateDir, 'system-moc.template.md'), path.join(__dirname, 'Vault', 'System', '_System_MOC.md'));
  copyFileSafe(path.join(templateDir, 'features-moc.template.md'), path.join(__dirname, 'Vault', 'Features', '_Features_MOC.md'));
  copyFileSafe(path.join(templateDir, 'agents-moc.template.md'), path.join(__dirname, 'Vault', 'Agents', '_Agents_MOC.md'));
  copyFileSafe(path.join(templateDir, 'check-ai-rules.template.js'), path.join(__dirname, 'scripts', 'check-ai-rules.js'));
  copyFileSafe(path.join(templateDir, 'vault-health.template.js'), path.join(__dirname, 'scripts', 'vault-health.js'));
  copyFileSafe(path.join(templateDir, 'rules', 'base-rules.template.js'), path.join(__dirname, 'scripts', 'rules', 'base-rules.js'));
  copyFileSafe(path.join(templateDir, 'rules', 'react-rules.template.js'), path.join(__dirname, 'scripts', 'rules', 'react-rules.js'));
  copyFileSafe(path.join(templateDir, 'rules', 'rules-readme.template.md'), path.join(__dirname, 'scripts', 'rules', 'README.md'));
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
