import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '../src'); // Assumes your code is in src/
const antiPatternsFile = path.join(__dirname, '../Vault/Anti_Patterns.md');

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
    console.warn('\x1b[33m[-] No Vault/Anti_Patterns.md file found.\x1b[0m');
  }
}

let hasErrors = false;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return; // Skip if src doesn't exist yet
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
            console.error(`\x1b[31m[AI RULE VIOLATION]\x1b[0m ${fullPath}:${index + 1}`);
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
  console.log('Loading Markdown rules from Vault/Anti_Patterns.md...');
  loadMarkdownRules();
  
  if (bannedPatterns.length === 0) {
    console.log('\x1b[33m[-] No rules loaded. Skipping check.\x1b[0m');
    process.exit(0);
  }

  console.log(`Scanning src directory against ${bannedPatterns.length} rules...`);
  scanDirectory(srcDir);

  if (hasErrors) {
    console.error('\x1b[31mArchitectural Rule Check Failed. Agents must fix these errors before proceeding.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\x1b[32mAll AI architectural rules pass.\x1b[0m');
    process.exit(0);
  }
}

main();
