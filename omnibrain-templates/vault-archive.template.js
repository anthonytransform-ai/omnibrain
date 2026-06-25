import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const VAULT_PLANS_DIR = path.join(projectRootDir, 'Vault/Project/Plans');

const args = process.argv.slice(2);
const apply = args.includes('--apply');

console.log("[Vault Archive] Scanning for plans eligible for archiving...");

if (!fs.existsSync(VAULT_PLANS_DIR)) {
  console.log(`[Vault Archive] Plans directory not found at ${VAULT_PLANS_DIR}`);
  process.exit(0);
}

const files = fs.readdirSync(VAULT_PLANS_DIR);
const now = Date.now();
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

let eligibleCount = 0;
let archivedCount = 0;

files.forEach(file => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(VAULT_PLANS_DIR, file);
  const stats = fs.statSync(filePath);

  if (stats.isFile()) {
    const fileAgeMs = now - Math.min(stats.mtimeMs, stats.birthtimeMs);
    
    if (fileAgeMs > SEVEN_DAYS_MS) {
      // Check for explicit terminal status in frontmatter
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse status from frontmatter
      let isTerminalState = false;
      const fmMatch = content.match(/^---([\s\S]*?)---/);
      if (fmMatch) {
        const fmContent = fmMatch[1];
        // Matches status: completed, status: archived, status: merged
        const statusMatch = fmContent.match(/status:\s*(completed|archived|merged)\b/);
        if (statusMatch) {
          isTerminalState = true;
        }
      }

      if (isTerminalState) {
        eligibleCount++;
        const fileDate = new Date(Math.min(stats.mtimeMs, stats.birthtimeMs));
        const yearMonth = `${fileDate.getFullYear()}-${String(fileDate.getMonth() + 1).padStart(2, '0')}`;
        const archiveDir = path.join(VAULT_PLANS_DIR, yearMonth);

        if (apply) {
          if (!fs.existsSync(archiveDir)) {
            fs.mkdirSync(archiveDir, { recursive: true });
          }
          const destPath = path.join(archiveDir, file);
          fs.renameSync(filePath, destPath);
          archivedCount++;
          console.log(`  [ARCHIVED] ${file} -> ${yearMonth}/`);
        } else {
          console.log(`  [ELIGIBLE] ${file} (terminal status, age: ${Math.round(fileAgeMs / (24 * 60 * 60 * 1000))} days)`);
        }
      }
    }
  }
});

if (apply) {
  console.log(`[Vault Archive] Complete. Moved ${archivedCount} files to the archive.`);
} else {
  console.log(`[Vault Archive] Scan complete. Found ${eligibleCount} plans eligible for archiving.`);
  if (eligibleCount > 0) {
    console.log(`  -> Run 'npm run vault-archive -- --apply' to move eligible plans to year-month archives.`);
  }
}
