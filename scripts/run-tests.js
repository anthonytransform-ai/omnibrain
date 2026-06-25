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
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
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
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  const overviewFile = path.join(sandboxDir, 'Vault/Project/Project_Overview.md');
  fs.writeFileSync(overviewFile, 'CUSTOM_USER_DATA');

  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  let content = fs.readFileSync(overviewFile, 'utf8');
  if (content === 'CUSTOM_USER_DATA') {
    console.log('\x1b[32m  [PASS] Setup did not overwrite custom file without --force.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Setup overwrote custom file without --force.\x1b[0m');
    testPassed = false;
  }

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

// Test 6: Fresh Setup + Clean Health Pass
console.log('\n[TEST 6] Clean Setup + Clean Health Pass...');
initSandbox();
try {
  // Run setup
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  // Run health check (should exit 0 cleanly!)
  execSync('node scripts/vault-health.js', { cwd: sandboxDir, stdio: 'pipe' });
  console.log('\x1b[32m  [PASS] Freshly generated vault passes vault-health with no errors.\x1b[0m');
} catch (e) {
  const errorOutput = e.stdout ? (e.stdout.toString() + '\n' + e.stderr.toString()) : e.message;
  console.error('\x1b[31m  [FAIL] Fresh vault health check failed.\x1b[0m', errorOutput);
  testPassed = false;
}

// Test 7: Public AGENTS.md Bootstrap Dual-Mode validation
console.log('\n[TEST 7] Public AGENTS.md Dual-Mode Behavior...');
initSandbox();
try {
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  const agentsFile = path.join(sandboxDir, 'AGENTS.md');
  const content = fs.readFileSync(agentsFile, 'utf8');

  // Verify it contains the dual-mode block
  if (content.includes('J_OS Workspace Bridge') && content.includes('OmniBrain Mode (Default User Mode)')) {
    console.log('\x1b[32m  [PASS] AGENTS.md contains both J_OS developer bridge and default OmniBrain user boot.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] AGENTS.md is missing dual-mode bootstrap instructions.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Dual-mode AGENTS.md validation failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 8: Migration Refusal on existing v2
console.log('\n[TEST 8] Migration Refusal on Existing v2...');
initSandbox();
try {
  // Run setup to create v2 vault
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });

  // Run migration on v2 vault
  try {
    execSync('node scripts/omnibrain-migrate.js --from-v1', { cwd: sandboxDir, stdio: 'pipe' });
    console.error('\x1b[31m  [FAIL] Migration script ran on a v2 vault without throwing error.\x1b[0m');
    testPassed = false;
  } catch (e) {
    const errorOutput = e.stdout.toString() + '\n' + e.stderr.toString();
    if (errorOutput.includes('Refusing to migrate: An existing v2 vault was detected')) {
      console.log('\x1b[32m  [PASS] Migration correctly refuses to execute on a v2 vault.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Migration failed with unexpected error.\x1b[0m', errorOutput);
      testPassed = false;
    }
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Migration refusal test failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 9: Non-destructive Maintenance (autotag/archive report-only)
console.log('\n[TEST 9] Non-destructive Maintenance checks...');
initSandbox();
try {
  execSync('node omnibrain-setup.js', { cwd: sandboxDir, stdio: 'pipe' });
  const plansDir = path.join(sandboxDir, 'Vault/Project/Plans');
  
  // Create an orphan plan file (missing frontmatter)
  const orphanPlan = path.join(plansDir, 'Orphan_Plan.md');
  fs.writeFileSync(orphanPlan, 'My orphan plan text');

  // Create an eligible plan to archive (older than 7 days, terminal status)
  const eligiblePlan = path.join(plansDir, 'Eligible_Plan.md');
  fs.writeFileSync(eligiblePlan, '---\ntype: plan\nstatus: completed\n---\nPlan text');
  // Backdate files modification time
  const oldTime = (Date.now() - 10 * 24 * 60 * 60 * 1000) / 1000;
  fs.utimesSync(eligiblePlan, oldTime, oldTime);

  // Run autotag in report-only mode
  execSync('node scripts/vault-autotag.js', { cwd: sandboxDir, stdio: 'pipe' });
  let content = fs.readFileSync(orphanPlan, 'utf8');
  if (!content.startsWith('---')) {
    console.log('\x1b[32m  [PASS] vault-autotag is report-only by default.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] vault-autotag modified file without --apply.\x1b[0m');
    testPassed = false;
  }

  // Run archive in report-only mode
  execSync('node scripts/vault-archive.js', { cwd: sandboxDir, stdio: 'pipe' });
  if (fs.existsSync(eligiblePlan)) {
    console.log('\x1b[32m  [PASS] vault-archive is report-only by default.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] vault-archive archived file without --apply.\x1b[0m');
    testPassed = false;
  }

} catch (e) {
  console.error('\x1b[31m  [FAIL] Non-destructive maintenance tests failed.\x1b[0m', e.message);
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
