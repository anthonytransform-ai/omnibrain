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
  console.error("\x1b[31m[!] Migration was not started.\x1b[0m");
  console.error("Found: the required --from-v1 flag was not provided.");
  console.error("Not completed: no v1 files were moved and no v2 files were created.");
  console.error("Files changed: no.");
  console.error("Next safe action: from the host project root, run `node omnibrain/scripts/omnibrain-migrate.js --from-v1 --dry-run` first. If the dry run looks right, run `node omnibrain/scripts/omnibrain-migrate.js --from-v1`.");
  process.exit(1);
}

// Guard 2: Refuse to run on an existing v2 vault
const v2Entry = path.join(vaultDir, 'Core_OS/Runtime/Entry.md');
if (fs.existsSync(v2Entry)) {
  console.error("\x1b[31m[!] Migration was not started because an existing v2 vault was detected.\x1b[0m");
  console.error(`Found: ${path.relative(projectRootDir, v2Entry)}`);
  console.error("Not completed: v1 migration did not run because this project already has the v2 runtime file.");
  console.error("Files changed: no.");
  console.error("Next safe action: if you only want to refresh missing framework files, run `node omnibrain/omnibrain-setup.js` from the host project root. Use `--force` only when you want to refresh framework-owned files.");
  process.exit(1);
}

// 1. Ensure Vault directory exists
if (!fs.existsSync(vaultDir)) {
  console.error("\x1b[31m[!] Migration was not started because no Vault directory was found.\x1b[0m");
  console.error(`Found: no ${path.relative(projectRootDir, vaultDir) || 'Vault'} directory at the target project root.`);
  console.error("Not completed: no backup folder was created and no setup files were written.");
  console.error("Files changed: no.");
  console.error("Next safe action: run `node omnibrain/omnibrain-setup.js` for a fresh v2 install, or confirm you are in the correct v1 project before retrying migration.");
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
  console.error("Not completed: the v2 structure could not be generated after the v1 backup step.");
  console.error("Files changed: yes. Your original v1 files were moved into the `_legacy` backup folder shown above.");
  console.error("Next safe action: review the setup error above, then run `node omnibrain/omnibrain-setup.js --force` from the host project root after the issue is fixed.");
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
  console.error("Found: migration moved the v1 files and created the v2 framework, but validation reported problems.");
  console.error("Not completed: OmniBrain could not confirm the migrated vault is healthy.");
  console.error("Files changed: yes. Your original v1 files were moved into the `_legacy` backup folder shown above.");
  console.error("Next safe action: review the health-check errors above, restore any missing required files, then run `node omnibrain/scripts/vault-health.js` from the host project root.");
  process.exit(1);
}
