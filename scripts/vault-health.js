import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vaultDir = path.join(__dirname, '../Vault');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(vaultDir);
const mdFiles = allFiles.filter(f => f.endsWith('.md'));

// Build a map of lowercase base filenames to their full paths to support [[Link]] resolution
const vaultFileMap = new Map();
for (const file of mdFiles) {
  vaultFileMap.set(path.basename(file).toLowerCase(), file);
}

let hasErrors = false;

console.log('Scanning Vault for broken links...');

for (const file of mdFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Ignore code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]*`/g, '');
  
  // Find wiki links [[Link]] or [[Link|Alias]]
  const wikiLinkRegex = /\[\[(.*?)(?:\|.*?)?\]\]/g;
  let match;
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    let linkTarget = match[1].trim();
    if (!linkTarget.endsWith('.md')) {
      linkTarget += '.md';
    }
    
    if (!vaultFileMap.has(linkTarget.toLowerCase())) {
      console.error(`\x1b[31m[BROKEN WIKI LINK]\x1b[0m in ${path.relative(vaultDir, file)}`);
      console.error(`  -> Could not resolve: [[${match[1]}]]\n`);
      hasErrors = true;
    }
  }

  // Find standard markdown links [text](path)
  const mdLinkRegex = /\[.*?\]\((.*?\.md)\)/g;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    let linkTarget = match[1];
    // Resolve relative path
    const absoluteTarget = path.resolve(path.dirname(file), linkTarget);
    if (!fs.existsSync(absoluteTarget)) {
      console.error(`\x1b[31m[BROKEN MD LINK]\x1b[0m in ${path.relative(vaultDir, file)}`);
      console.error(`  -> Could not find: ${linkTarget}\n`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error('\x1b[31mVault Health Check Failed. Please fix the broken links to maintain the single-source-of-truth.\x1b[0m');
  process.exit(1);
} else {
  console.log(`\x1b[32m\u2714 Vault Health Check Passed. Scanned ${mdFiles.length} files. All links resolve.\x1b[0m`);
  process.exit(0);
}
