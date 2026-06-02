import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vaultPath = path.join(__dirname, '../Vault');
const plansDir = path.join(vaultPath, 'Plans');

// A generic mapping dictionary that users can customize
const mappings = [
  { keywords: ['Dashboard', 'Home', 'Index'], doc: '_System_MOC', tag: 'system' },
  { keywords: ['UI', 'UX', 'Visual', 'Design', 'Style'], doc: '_System_MOC', tag: 'system' },
  { keywords: ['Database', 'Schema', 'Sync', 'Data'], doc: '_System_MOC', tag: 'system' },
  { keywords: ['Architecture', 'Server', 'API', 'Config'], doc: '_System_MOC', tag: 'system' }
];

let modifiedCount = 0;

if (fs.existsSync(plansDir)) {
  const files = fs.readdirSync(plansDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    let content = fs.readFileSync(path.join(plansDir, file), 'utf8');
    if (content.includes('Modifies: [[')) continue; // Already mapped

    // It's an orphan! Let's map it.
    let targetDoc = '_System_MOC'; // fallback
    let targetTag = 'system';

    for (const map of mappings) {
      if (map.keywords.some(kw => file.includes(kw))) {
        targetDoc = map.doc;
        targetTag = map.tag;
        break;
      }
    }

    const hasFrontmatter = content.startsWith('---');
    let newHeader = '';
    
    if (!hasFrontmatter) {
      newHeader = `---
tags:
  - ${targetTag}
---
**Modifies:** [[${targetDoc}]]

`;
      content = newHeader + content;
    } else {
      const lines = content.split('\n');
      let endIdx = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          endIdx = i;
          break;
        }
      }
      
      if (endIdx !== -1) {
        lines.splice(endIdx + 1, 0, `\n**Modifies:** [[${targetDoc}]]\n`);
        content = lines.join('\n');
      } else {
        content = `**Modifies:** [[${targetDoc}]]\n\n` + content;
      }
    }

    fs.writeFileSync(path.join(plansDir, file), content);
    modifiedCount++;
    console.log(`Resolved: ${file} -> [[${targetDoc}]]`);
  }
}

console.log(`\nSuccessfully mapped ${modifiedCount} orphaned plans.`);
