import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frameworkDir = path.resolve(__dirname, '..');

let projectRootDir;
const prIndex = process.argv.indexOf('--project-root');
if (prIndex !== -1 && process.argv[prIndex + 1]) {
  projectRootDir = path.resolve(process.argv[prIndex + 1]);
} else {
  if (path.basename(frameworkDir) === 'omnibrain') {
    projectRootDir = path.dirname(frameworkDir);
  } else {
    projectRootDir = frameworkDir;
  }
}
console.log(`Resolved target project root: ${projectRootDir}`);

const vaultDir = path.join(projectRootDir, 'Vault');

const args = process.argv.slice(2);
const fromV1 = args.includes('--from-v1');
const dryRun = args.includes('--dry-run');

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[36m   OmniBrain v1 -> v2 Migration Protocol       \x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// Guard 1: Require --from-v1
if (!fromV1) {
  console.error("\x1b[31m[!] Error: Migration requires explicit --from-v1 flag.\x1b[0m");
  console.error("Please run: npm run omnibrain-migrate -- --from-v1");
  process.exit(1);
}

// Guard 2: Refuse to run on an existing v2 vault
const v2Entry = path.join(vaultDir, 'Core_OS/Runtime/Entry.md');
if (fs.existsSync(v2Entry)) {
  console.error("\x1b[31m[!] Refusing to migrate: An existing v2 vault was detected.\x1b[0m");
  console.error(`  -> Found: ${path.relative(projectRootDir, v2Entry)}`);
  console.error("If you want to re-run setup, use: npm run setup");
  process.exit(1);
}

// 1. Ensure Vault directory exists
if (!fs.existsSync(vaultDir)) {
  console.error(`\x1b[31m[!] Vault directory not found. Please run 'npm run setup' first.\x1b[0m`);
  process.exit(1);
}

// 2. Identify items to migrate and back up
const vaultContents = fs.readdirSync(vaultDir);
const itemsToBackup = [];

vaultContents.forEach(item => {
  if (item === '_legacy') return;
  const fullPath = path.join(vaultDir, item);
  itemsToBackup.push({
    name: item,
    path: fullPath,
    stat: fs.statSync(fullPath)
  });
});

if (itemsToBackup.length === 0) {
  console.log('[-] Vault is empty. No files to migrate. Running fresh setup...');
} else {
  // Determine unique legacy backup directory
  let uniqueLegacyDir = path.join(vaultDir, '_legacy', 'OmniBrain_v1');
  if (fs.existsSync(uniqueLegacyDir)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    uniqueLegacyDir = path.join(vaultDir, '_legacy', `OmniBrain_v1_backup_${timestamp}`);
  }

  if (dryRun) {
    console.log(`\x1b[33m[DRY RUN] Would create backup directory: ${path.relative(projectRootDir, uniqueLegacyDir)}\x1b[0m`);
    itemsToBackup.forEach(item => {
      console.log(`\x1b[33m[DRY RUN] Would move: Vault/${item.name} -> ${path.relative(vaultDir, uniqueLegacyDir)}/${item.name}\x1b[0m`);
    });
    console.log(`\x1b[33m[DRY RUN] Would execute setup --force\x1b[0m`);
    console.log(`\x1b[33m[DRY RUN] Would execute health check\x1b[0m`);
    console.log("\x1b[32m✔ Dry run completed. No files were modified.\x1b[0m\n");
    process.exit(0);
  }

  // Create legacy destination directory
  fs.mkdirSync(uniqueLegacyDir, { recursive: true });
  console.log(`[+] Created legacy backup directory: ${path.relative(projectRootDir, uniqueLegacyDir)}`);

  console.log(`[Backup] Moving v1 files/folders to legacy backup folder...`);
  itemsToBackup.forEach(item => {
    const destPath = path.join(uniqueLegacyDir, item.name);
    try {
      fs.renameSync(item.path, destPath);
      console.log(`  -> Moved: Vault/${item.name} -> ${path.relative(vaultDir, uniqueLegacyDir)}/${item.name}`);
    } catch (err) {
      console.error(`\x1b[31m[!] Error backing up ${item.name}: ${err.message}\x1b[0m`);
      process.exit(1);
    }
  });
  console.log(`[Backup] Successful. Original root files/folders cleaned up.\n`);
}

// 3. Execute setup in --force mode to generate new v2 structure
console.log('[Setup] Executing fresh OmniBrain v2 structure generation...');
try {
  const setupCmd = `node omnibrain-setup.js --force --project-root ${JSON.stringify(projectRootDir)}`;
  execSync(setupCmd, { cwd: frameworkDir, stdio: 'inherit' });
  console.log(`[Setup] Successful.\n`);
} catch (e) {
  console.error(`\x1b[31m[!] Error executing omnibrain-setup.js: ${e.message}\x1b[0m`);
  process.exit(1);
}

// 4. Run Vault Health Check to verify v2 integrity
console.log('[Validation] Running Vault Health Check...');
try {
  const healthCmd = `node scripts/vault-health.js --project-root ${JSON.stringify(projectRootDir)}`;
  execSync(healthCmd, { cwd: frameworkDir, stdio: 'inherit' });
  console.log(`\x1b[32m\u2714 Migration and validation complete! Vault is structurally sound.\x1b[0m`);
  process.exit(0);
} catch (e) {
  console.error(`\x1b[31m[!] Warning: Vault Health Check failed after setup.\x1b[0m`);
  console.error(`Please review the errors above and ensure all required links are restored.`);
  process.exit(1);
}
