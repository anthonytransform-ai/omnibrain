import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sandboxDir = path.join(rootDir, 'scratch', 'test-run-sandbox');

console.log("\x1b[36m===============================================\x1b[0m");
console.log("\x1b[36m   OmniBrain v2 Test Suite                     \x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// Helper to initialize clean room sandbox
function initSandbox() {
  if (fs.existsSync(sandboxDir)) {
    fs.rmSync(sandboxDir, { recursive: true, force: true });
  }
  fs.mkdirSync(sandboxDir, { recursive: true });

  // Copy setup files and templates
  fs.copyFileSync(path.join(rootDir, 'omnibrain-setup.js'), path.join(sandboxDir, 'omnibrain-setup.js'));
  fs.copyFileSync(path.join(rootDir, 'omnibrain.config.json'), path.join(sandboxDir, 'omnibrain.config.json'));
  fs.cpSync(path.join(rootDir, 'omnibrain-templates'), path.join(sandboxDir, 'omnibrain-templates'), { recursive: true });
}

let testPassed = true;

// Test 1: Setup Idempotency
console.log('[TEST 1] Setup Idempotency...');
initSandbox();
try {
  // First run
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  // Second run (should run cleanly and skip existing files)
  const output = execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' }).toString();
  
  if (output.includes('Skipped (already exists)')) {
    console.log('\x1b[32m  [PASS] Setup runs idempotently and skips existing files.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Setup did not report skipping existing files.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Setup idempotency run failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 2: Non-destructive Safety
console.log('\n[TEST 2] Non-destructive Safety...');
initSandbox();
try {
  // Run setup to create structure
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  
  // Modify a project file
  const overviewFile = path.join(sandboxDir, 'Vault/Project/Project_Overview.md');
  fs.writeFileSync(overviewFile, 'CUSTOM_USER_DATA');

  // Run setup without --force
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  let content = fs.readFileSync(overviewFile, 'utf8');
  if (content === 'CUSTOM_USER_DATA') {
    console.log('\x1b[32m  [PASS] Setup did not overwrite custom file without --force.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Setup overwrote custom file without --force.\x1b[0m');
    testPassed = false;
  }

  // Run setup WITH --force
  execSync('node omnibrain-setup.js --force', { cwd: sandboxDir, stdio: 'pipe' });
  content = fs.readFileSync(overviewFile, 'utf8');
  if (content !== 'CUSTOM_USER_DATA') {
    console.log('\x1b[32m  [PASS] Setup overwrote custom file when --force was specified.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Setup failed to overwrite custom file with --force.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Non-destructive safety test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 3: Broken Link Detection
console.log('\n[TEST 3] Health Check Broken Link Detection...');
initSandbox();
try {
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  
  // Inject a broken wiki link
  const overviewFile = path.join(sandboxDir, 'Vault/Project/Project_Overview.md');
  fs.appendFileSync(overviewFile, '\nLet us check this broken link [[NonExistentFile]].\n');

  try {
    execSync('node scripts/vault-health.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] Health check passed despite having a broken link.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (e.status === 1 && errorOutput.includes('BROKEN WIKI LINK')) {
      console.log('\x1b[32m  [PASS] Health check correctly catches and reports broken links.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Health check failed with unexpected error code or message.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Broken link test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 4: Instruction Leakage Scanner
console.log('\n[TEST 4] Health Check Instruction Leakage Detection...');
initSandbox();
try {
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  
  // Inject instruction leakage into project memory
  const stateFile = path.join(sandboxDir, 'Vault/Project/Current_State.md');
  fs.appendFileSync(stateFile, '\nLet us add some system prompt leakage.\n');

  try {
    execSync('node scripts/vault-health.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] Health check passed despite having instruction leakage.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (e.status === 1 && errorOutput.includes('INSTRUCTION LEAKAGE')) {
      console.log('\x1b[32m  [PASS] Health check correctly catches instruction leakage in project memory.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Health check failed with unexpected error or message.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Instruction leakage test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 5: Obsidian Check Plugin Validation
console.log('\n[TEST 5] Obsidian Check Plugin Validation...');
initSandbox();
try {
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });

  // Case 5a: No .obsidian folder
  try {
    execSync('node scripts/obsidian-check.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] obsidian-check passed when .obsidian folder was missing.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (errorOutput.includes('Obsidian vault has not been opened yet')) {
      console.log('\x1b[32m  [PASS] Correctly catches missing .obsidian folder.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Unexpected error message for missing .obsidian folder.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }

  // Case 5b: .obsidian exists but no community-plugins.json
  const obsDir = path.join(sandboxDir, 'Vault/.obsidian');
  fs.mkdirSync(obsDir, { recursive: true });
  try {
    execSync('node scripts/obsidian-check.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] obsidian-check passed when community-plugins.json was missing.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (errorOutput.includes('Community plugins are not configured')) {
      console.log('\x1b[32m  [PASS] Correctly catches missing community-plugins.json.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Unexpected error message for missing plugins file.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }

  // Case 5c: community-plugins.json exists but lacks dataview
  const pluginsFile = path.join(obsDir, 'community-plugins.json');
  fs.writeFileSync(pluginsFile, JSON.stringify(['other-plugin']));
  try {
    execSync('node scripts/obsidian-check.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] obsidian-check passed when dataview was disabled.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (errorOutput.includes('Dataview plugin is installed but NOT enabled')) {
      console.log('\x1b[32m  [PASS] Correctly catches disabled Dataview plugin.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Unexpected error message for disabled Dataview.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }

  // Case 5d: Dataview enabled
  fs.writeFileSync(pluginsFile, JSON.stringify(['other-plugin', 'dataview']));
  try {
    execSync('node scripts/obsidian-check.js', { cwd: sandboxDir, stdio: 'pipe' });
    console.log('\x1b[32m  [PASS] Correctly passes when Dataview is enabled.\x1b[0m');
  } catch (e) {
    console.error('\x1b[31m  [FAIL] obsidian-check failed when Dataview was enabled.\x1b[0m', e.stdout.toString());
    testPassed = false;
  }

} catch (e) {
  console.error('\x1b[31m  [FAIL] Obsidian check test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Clean up sandbox
if (fs.existsSync(sandboxDir)) {
  fs.rmSync(sandboxDir, { recursive: true, force: true });
}

console.log('\n-----------------------------------------------');
if (testPassed) {
  console.log('\x1b[32m✔ All OmniBrain v2 tests completed successfully!\x1b[0m');
  process.exit(0);
} else {
  console.error('\x1b[31m✘ Some OmniBrain v2 tests failed. Please review logs.\x1b[0m');
  process.exit(1);
}
