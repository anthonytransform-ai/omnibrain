import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VAULT_PLANS_DIR = path.resolve(__dirname, '../Vault/Plans');

console.log("[Vault AutoTag] Running automated orphan plan resolution...");

if (fs.existsSync(VAULT_PLANS_DIR)) {
  const files = fs.readdirSync(VAULT_PLANS_DIR);
  let taggedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(VAULT_PLANS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Basic heuristic: if it lacks frontmatter, tag it.
      if (!content.startsWith('---')) {
        const updatedContent = `---\ntype: plan\ntags: [autotagged, orphan]\n---\n\nModifies: [[_System_MOC]]\n\n${content}`;
        fs.writeFileSync(filePath, updatedContent);
        console.log(`  Fixed: ${file}`);
        taggedCount++;
      }
    }
  });
  console.log(`[Vault AutoTag] Complete. Repaired ${taggedCount} files.`);
} else {
  console.log(`[Vault AutoTag] Plans directory not found.`);
}
