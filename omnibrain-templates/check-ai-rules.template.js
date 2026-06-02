import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '../src'); // Assumes your code is in src/
const rulesDir = path.join(__dirname, 'rules');

// Dynamically load banned patterns from the rules directory
let bannedPatterns = [];

async function loadRules() {
  if (fs.existsSync(rulesDir)) {
    const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const fullPath = path.join(rulesDir, file);
      try {
        const ruleModule = await import(pathToFileURL(fullPath).href);
        for (const key of Object.keys(ruleModule)) {
          if (Array.isArray(ruleModule[key])) {
            bannedPatterns.push(...ruleModule[key]);
          }
        }
      } catch (err) {
        console.error(`\x1b[31m[!] Error loading rule module ${file}:\x1b[0m`, err);
      }
    }
  } else {
    console.warn('\x1b[33m[-] No rules directory found at ' + rulesDir + '\x1b[0m');
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

async function main() {
  console.log('Loading AI architectural rules...');
  await loadRules();
  
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
