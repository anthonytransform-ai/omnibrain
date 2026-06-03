import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_PLANS_DIR = path.resolve(__dirname, '../Vault/Plans');

function performVaultArchive() {
  console.log(`[Vault Archive] Scanning for plans older than 7 days in ${VAULT_PLANS_DIR}...`);

  if (!fs.existsSync(VAULT_PLANS_DIR)) {
    console.error(`[Error] Plans directory not found at ${VAULT_PLANS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(VAULT_PLANS_DIR);
  const now = Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  
  let archivedCount = 0;

  files.forEach(file => {
    // Only process markdown files at the root of Plans/
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(VAULT_PLANS_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      const fileAgeMs = now - Math.min(stats.mtimeMs, stats.birthtimeMs);
      
      if (fileAgeMs > SEVEN_DAYS_MS) {
        const fileDate = new Date(Math.min(stats.mtimeMs, stats.birthtimeMs));
        const yearMonth = `${fileDate.getFullYear()}-${String(fileDate.getMonth() + 1).padStart(2, '0')}`;
        
        const archiveDir = path.join(VAULT_PLANS_DIR, yearMonth);
        if (!fs.existsSync(archiveDir)) {
          fs.mkdirSync(archiveDir, { recursive: true });
        }
        
        const destPath = path.join(archiveDir, file);
        fs.renameSync(filePath, destPath);
        archivedCount++;
        console.log(`  Archived: ${file} -> ${yearMonth}/`);
      }
    }
  });

  console.log(`[Vault Archive] Complete. Moved ${archivedCount} files to the archive.`);
}

performVaultArchive();
