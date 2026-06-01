import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '../src'); // Assumes your code is in src/

// Define generic banned patterns
const bannedPatterns = [
  {
    regex: /console\.log\(/,
    message: 'Rule Violation: No console.logs allowed in production code. Use a proper logging library.'
  }
];

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
          if (pattern.regex.test(line)) {
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

console.log('Scanning src directory for AI architectural rule violations...');
scanDirectory(srcDir);

if (hasErrors) {
  console.error('\x1b[31mArchitectural Rule Check Failed. Agents must fix these errors before proceeding.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32mAll AI architectural rules pass.\x1b[0m');
  process.exit(0);
}
