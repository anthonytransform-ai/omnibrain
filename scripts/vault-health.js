import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRootDir = path.resolve(__dirname, '..');
const vaultDir = path.join(projectRootDir, 'Vault');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip hidden directories (like .obsidian)
      if (file.startsWith('.')) continue;
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

// 1. Verify Required Files
const requiredFiles = [
  path.join(projectRootDir, 'AGENTS.md'),
  path.join(vaultDir, 'Core_OS/Runtime/Entry.md'),
  path.join(vaultDir, 'Core_OS/Registries/Workflow_Registry.md'),
  path.join(vaultDir, 'Project/Project_Overview.md'),
  path.join(vaultDir, 'Project/Current_State.md'),
  path.join(vaultDir, 'Project/System/_System_MOC.md'),
  path.join(vaultDir, 'Project/Features/_Features_MOC.md'),
  path.join(vaultDir, 'Project/Definition_of_Done.md'),
  path.join(vaultDir, 'Core_OS/Standards/Knowledge_Format.md'),
  path.join(vaultDir, 'Core_OS/Standards/Anti_Patterns.md'),
  path.join(vaultDir, 'Core_OS/Validation/Vault_Health_Check.md'),
  path.join(vaultDir, 'Dashboard.md'),
  path.join(vaultDir, 'Obsidian/INSTALL.md')
];

console.log('Verifying required vault structure files...');
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`\x1b[31m[MISSING FILE]\x1b[0m ${path.relative(projectRootDir, file)} is required but missing.`);
    hasErrors = true;
  }
});

console.log('Scanning Vault files for broken links, frontmatter quality, and instruction leakage...');

for (const file of mdFiles) {
  const relativePath = path.relative(projectRootDir, file);
  
  // Skip checking _legacy files
  if (relativePath.includes('_legacy')) continue;

  const rawContent = fs.readFileSync(file, 'utf8');

  // A. Frontmatter validation (Except root AGENTS.md, which is outside Vault, and files inside Vault/Obsidian/)
  const isObsidianFolder = file.startsWith(path.join(vaultDir, 'Obsidian') + path.sep) || file === path.join(vaultDir, 'Obsidian');
  if (file.startsWith(vaultDir) && !isObsidianFolder) {
    if (!rawContent.startsWith('---')) {
      console.error(`\x1b[31m[MISSING FRONTMATTER]\x1b[0m in ${path.relative(vaultDir, file)}`);
      hasErrors = true;
    } else {
      const lines = rawContent.split('\n');
      let endIdx = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          endIdx = i;
          break;
        }
      }
      if (endIdx === -1) {
        console.error(`\x1b[31m[MALFORMED FRONTMATTER]\x1b[0m in ${path.relative(vaultDir, file)}: frontmatter block never closes.`);
        hasErrors = true;
      } else {
        const fmContent = lines.slice(1, endIdx).join('\n');
        if (!fmContent.includes('type:')) {
          console.error(`\x1b[31m[INVALID FRONTMATTER]\x1b[0m in ${path.relative(vaultDir, file)}: missing 'type:' field.`);
          hasErrors = true;
        }
      }
    }
  }

  // B. Instruction Leakage in Project memory (Vault/Project/)
  const projectFolder = path.join(vaultDir, 'Project') + path.sep;
  if (file.startsWith(projectFolder)) {
    const leakageRegexes = [
      /system prompt/i,
      /agent router/i,
      /attention ai/i,
      /ai assistant/i,
      /session start protocol/i,
      /core triggers/i
    ];

    leakageRegexes.forEach(regex => {
      if (regex.test(rawContent)) {
        console.error(`\x1b[31m[INSTRUCTION LEAKAGE]\x1b[0m in ${path.relative(vaultDir, file)} matches operational instruction pattern: ${regex}`);
        hasErrors = true;
      }
    });
  }

  // Clean content for link parsing (Ignore code blocks)
  let content = rawContent.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]*`/g, '');

  // C. Wiki Links [[Link]]
  const wikiLinkRegex = /\[\[(.*?)(?:\|.*?)?\]\]/g;
  let match;
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    let linkTarget = match[1].trim();
    if (!linkTarget) continue;

    // Check if targeting a folder or directory (e.g. Project/Daily_Logs)
    const targetFolder = path.join(vaultDir, linkTarget);
    if (fs.existsSync(targetFolder) && fs.statSync(targetFolder).isDirectory()) {
      continue;
    }

    if (!path.extname(linkTarget)) {
      linkTarget += '.md';
    }

    // Try resolving linkTarget relative to vault root
    const resolvedFromVault = path.join(vaultDir, linkTarget);
    // Try resolving relative to current file
    const resolvedFromCurrent = path.resolve(path.dirname(file), linkTarget);
    // Try resolving using base name map
    const baseName = path.basename(linkTarget).toLowerCase();

    if (!fs.existsSync(resolvedFromVault) && !fs.existsSync(resolvedFromCurrent) && !vaultFileMap.has(baseName)) {
      console.error(`\x1b[31m[BROKEN WIKI LINK]\x1b[0m in ${path.relative(vaultDir, file)}`);
      console.error(`  -> Could not resolve: [[${match[1]}]]\n`);
      hasErrors = true;
    }
  }

  // D. Markdown Links [text](path)
  const mdLinkRegex = /\[.*?\]\((.*?\.md)\)/g;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    const linkTarget = match[1];
    // Skip remote links
    if (linkTarget.startsWith('http://') || linkTarget.startsWith('https://')) continue;

    const absoluteTarget = path.resolve(path.dirname(file), linkTarget);
    if (!fs.existsSync(absoluteTarget)) {
      console.error(`\x1b[31m[BROKEN MD LINK]\x1b[0m in ${path.relative(vaultDir, file)}`);
      console.error(`  -> Could not find: ${linkTarget}\n`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error('\x1b[31mVault Health Check Failed. Please fix errors to maintain the vault structure.\x1b[0m');
  process.exit(1);
} else {
  console.log(`\x1b[32m\u2714 Vault Health Check Passed. Scanned ${mdFiles.length} files. All links resolve.\x1b[0m`);
  process.exit(0);
}
