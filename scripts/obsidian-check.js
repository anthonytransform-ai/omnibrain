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
} else if (path.basename(frameworkDir) === 'omnibrain') {
  projectRootDir = path.dirname(frameworkDir);
} else {
  projectRootDir = frameworkDir;
}

console.log(`Resolved target project root: ${projectRootDir}`);

const vaultDir = path.join(projectRootDir, 'Vault');
const obsidianDir = path.join(vaultDir, '.obsidian');
const requiredGuidedFiles = [
  'Start_Here.md',
  'Help/User_Guide.en.md',
  'Help/User_Guide.zh-Hant.md',
  'Work/Tasks/Task_Board.base'
];

let hasErrors = false;

function fail(message) {
  console.error(`\x1b[31m[!] ${message}\x1b[0m`);
  hasErrors = true;
}

console.log('Verifying Obsidian Guided Workspace setup...');

if (!fs.existsSync(obsidianDir)) {
  fail('Obsidian vault has not been opened yet.');
  console.error('Found: no Vault/.obsidian directory.');
  console.error('Not completed: OmniBrain cannot confirm Obsidian has initialised this Vault.');
  console.error('Files changed: no. This command only reports problems.');
  console.error('Next safe action: open the `Vault/` folder in Obsidian Desktop, then run this check again.');
  process.exit(1);
}

for (const rel of requiredGuidedFiles) {
  const fullPath = path.join(vaultDir, rel);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing required Guided Workspace file: Vault/${rel}`);
  }
}

if (hasErrors) {
  console.error('Found: required Guided Workspace files are missing.');
  console.error('Not completed: OmniBrain cannot confirm Start Here, guides and the task board are ready.');
  console.error('Files changed: no. This command only reports problems.');
  console.error('Next safe action: run `node omnibrain/omnibrain-setup.js --force` from the host project root, then reopen the Vault in Obsidian.');
  process.exit(1);
}

console.log('\x1b[32m\u2714 Obsidian has opened this Vault and required Guided Workspace files exist.\x1b[0m');
console.log('If the task board does not display in Obsidian: open Settings -> Core plugins, enable Bases, then reopen Vault/Start_Here.md.');
console.log('This check does not claim Bases is active through undocumented Obsidian internal state.');
process.exit(0);
