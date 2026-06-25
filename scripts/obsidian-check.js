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

const vaultDir = path.join(projectRootDir, 'Vault');
const obsidianDir = path.join(vaultDir, '.obsidian');
const pluginsPath = path.join(obsidianDir, 'community-plugins.json');

console.log('Verifying Obsidian vault configuration...');

if (!fs.existsSync(obsidianDir)) {
  console.error('\x1b[31m[!] Error: Obsidian vault has not been opened yet.\x1b[0m');
  console.error('Please open the `Vault/` directory in Obsidian Desktop to initialize settings.');
  process.exit(1);
}

if (!fs.existsSync(pluginsPath)) {
  console.error('\x1b[31m[!] Error: Community plugins are not configured or none are enabled.\x1b[0m');
  console.error('Please turn off "Restricted Mode" and install/enable the "Dataview" plugin in Obsidian settings.');
  process.exit(1);
}

try {
  const plugins = JSON.parse(fs.readFileSync(pluginsPath, 'utf8'));
  if (plugins.includes('dataview')) {
    console.log('\x1b[32m\u2714 Obsidian Vault detected and Dataview plugin is enabled!\x1b[0m');
    process.exit(0);
  } else {
    console.error('\x1b[31m[!] Error: Dataview plugin is installed but NOT enabled.\x1b[0m');
    console.error('Please enable the "Dataview" plugin in Obsidian community plugins settings.');
    process.exit(1);
  }
} catch (e) {
  console.error(`\x1b[31m[!] Error reading Obsidian community-plugins.json: ${e.message}\x1b[0m`);
  process.exit(1);
}
