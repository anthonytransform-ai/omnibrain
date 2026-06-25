import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRootDir = path.resolve(__dirname, '..');
const vaultDir = path.join(projectRootDir, 'Vault');
const legacyDir = path.join(vaultDir, '_legacy', 'OmniBrain_v1');

console.log("\x1b[36m\n===============================================\x1b[0m");
console.log("\x1b[36m   OmniBrain v1 -> v2 Migration Protocol       \x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// 1. Ensure Vault directory exists
if (!fs.existsSync(vaultDir)) {
  console.error(`\x1b[31m[!] Vault directory not found. Please run 'npm run setup' first.\x1b[0m`);
  process.exit(1);
}

// 2. Identify items to migrate and back up
// We scan the root of Vault/ and identify folders/files that are part of v1 and NOT _legacy
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
  // Create legacy destination directory
  if (!fs.existsSync(legacyDir)) {
    fs.mkdirSync(legacyDir, { recursive: true });
    console.log(`[+] Created legacy backup directory: Vault/_legacy/OmniBrain_v1/`);
  }

  console.log(`[Backup] Moving v1 files/folders to legacy backup folder...`);
  itemsToBackup.forEach(item => {
    const destPath = path.join(legacyDir, item.name);
    try {
      // If it already exists in backup (e.g. from previous aborted migrations), remove it first
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }
      
      // Move to legacy
      fs.renameSync(item.path, destPath);
      console.log(`  -> Moved: Vault/${item.name} -> Vault/_legacy/OmniBrain_v1/${item.name}`);
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
  execSync('node omnibrain-setup.js --force', { cwd: projectRootDir, stdio: 'inherit' });
  console.log(`[Setup] Successful.\n`);
} catch (e) {
  console.error(`\x1b[31m[!] Error executing omnibrain-setup.js: ${e.message}\x1b[0m`);
  process.exit(1);
}

// 4. Run Vault Health Check to verify v2 integrity
console.log('[Validation] Running Vault Health Check...');
try {
  execSync('node scripts/vault-health.js', { cwd: projectRootDir, stdio: 'inherit' });
  console.log(`\x1b[32m\u2714 Migration and validation complete! Vault is structurally sound.\x1b[0m`);
  console.log(`\x1b[32m  All your original files have been safely migrated to Vault/_legacy/OmniBrain_v1/.\x1b[0m\n`);
  process.exit(0);
} catch (e) {
  console.error(`\x1b[31m[!] Warning: Vault Health Check failed after setup.\x1b[0m`);
  console.error(`Please review the errors above and ensure all required links are restored.`);
  process.exit(1);
}
