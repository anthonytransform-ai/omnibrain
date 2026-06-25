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

console.log("[Vault AutoTag] Scanning for orphan plans lacking frontmatter...");

if (fs.existsSync(VAULT_PLANS_DIR)) {
  const files = fs.readdirSync(VAULT_PLANS_DIR);
  let orphanCount = 0;
  let repairedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(VAULT_PLANS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Check if it lacks frontmatter
      if (!content.startsWith('---')) {
        orphanCount++;
        if (apply) {
          const updatedContent = `---\ntype: plan\ntags: [autotagged, orphan]\nstatus: active\n---\n\nModifies: [[_System_MOC]]\n\n${content}`;
          fs.writeFileSync(filePath, updatedContent);
          console.log(`  [REPAIRED] ${file}`);
          repairedCount++;
        } else {
          console.log(`  [ORPHAN] ${file} (lacks frontmatter)`);
        }
      }
    }
  });

  if (apply) {
    console.log(`[Vault AutoTag] Complete. Repaired ${repairedCount} files.`);
  } else {
    console.log(`[Vault AutoTag] Scan complete. Found ${orphanCount} orphan files.`);
    if (orphanCount > 0) {
      console.log(`  -> Run 'npm run vault-autotag -- --apply' to automatically add frontmatter.`);
    }
  }
} else {
  console.log(`[Vault AutoTag] Plans directory not found at ${VAULT_PLANS_DIR}`);
}
