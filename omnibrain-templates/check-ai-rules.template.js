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

// Load config for source roots
let sourceRoots = ['src'];
const configPath = path.join(projectRootDir, 'omnibrain.config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.source_roots && Array.isArray(config.source_roots)) {
      sourceRoots = config.source_roots;
    }
  } catch (e) {
    console.error(`\x1b[31m[!] Error reading omnibrain.config.json: ${e.message}\x1b[0m`);
  }
}

// Banned patterns file location
let antiPatternsFile = path.join(projectRootDir, 'Vault/Core_OS/Standards/Anti_Patterns.md');
if (!fs.existsSync(antiPatternsFile)) {
  // Fallback to legacy path for compatibility
  antiPatternsFile = path.join(projectRootDir, 'Vault/Anti_Patterns.md');
}

let bannedPatterns = [];

function loadMarkdownRules() {
  if (fs.existsSync(antiPatternsFile)) {
    const content = fs.readFileSync(antiPatternsFile, 'utf8');
    const lines = content.split('\n');
    lines.forEach(line => {
      // Matches: - [LINT] `regex` : message
      const match = line.match(/^- \[LINT\] `([^`]+)`\s*:\s*(.*)/);
      if (match) {
        try {
          bannedPatterns.push({
            regex: new RegExp(match[1]),
            message: match[2].trim()
          });
        } catch (e) {
          console.error(`\x1b[31m[!] Invalid regex in Anti_Patterns.md: ${match[1]}\x1b[0m`);
        }
      }
    });
  } else {
    console.warn(`\x1b[33m[-] No anti-patterns rule file found at ${antiPatternsFile}\x1b[0m`);
  }
}

let hasErrors = false;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        for (const pattern of bannedPatterns) {
          if (pattern.regex && pattern.regex.test(line)) {
            console.error(`\x1b[31m[AI RULE VIOLATION]\x1b[0m ${path.relative(projectRootDir, fullPath)}:${index + 1}`);
            console.error(`  Line: ${line.trim()}`);
            console.error(`  Reason: ${pattern.message}\n`);
            hasErrors = true;
          }
        }
      });
    }
  }
}

function main() {
  console.log(`Loading Markdown rules from ${path.relative(projectRootDir, antiPatternsFile)}...`);
  loadMarkdownRules();
  
  if (bannedPatterns.length === 0) {
    console.log('\x1b[33m[-] No rules loaded. Skipping check.\x1b[0m');
    process.exit(0);
  }

  sourceRoots.forEach(root => {
    const fullRootPath = path.join(projectRootDir, root);
    if (fs.existsSync(fullRootPath)) {
      console.log(`Scanning directory: ${root} against ${bannedPatterns.length} rules...`);
      scanDirectory(fullRootPath);
    } else {
      console.log(`\x1b[33m[-] Source root directory not found: ${root}\x1b[0m`);
    }
  });

  if (hasErrors) {
    console.error('\x1b[31mArchitectural Rule Check Failed. Agents must fix these errors before proceeding.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\x1b[32mAll AI architectural rules pass.\x1b[0m');
    process.exit(0);
  }
}

main();
