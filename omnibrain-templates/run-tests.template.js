import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sandboxDir = path.join(rootDir, 'scratch', 'test-run-sandbox');
const projectDir = path.join(sandboxDir, 'project');
const frameworkDir = path.join(projectDir, 'omnibrain');

console.log("\x1b[36m===============================================\x1b[0m");
console.log("\x1b[36m   OmniBrain v2.0.2 Test Suite                 \x1b[0m");
console.log("\x1b[36m===============================================\n\x1b[0m");

// Helper to initialize clean room sandbox simulating a host project
function initSandbox() {
  if (fs.existsSync(sandboxDir)) {
    fs.rmSync(sandboxDir, { recursive: true, force: true });
  }
  fs.mkdirSync(sandboxDir, { recursive: true });
  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(frameworkDir, { recursive: true });

  // 1. Create host project package.json (mock user owned)
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify({ name: "my-existing-app", version: "1.0.0", scripts: { test: "exit 0" } }, null, 2)
  );

  // 2. Create host project scripts/vault-health.js (mock user owned)
  const mockScriptsDir = path.join(projectDir, 'scripts');
  fs.mkdirSync(mockScriptsDir, { recursive: true });
  fs.writeFileSync(path.join(mockScriptsDir, 'vault-health.js'), '// Original host script\nconsole.log("original health");\n');

  // Copy framework files to project/omnibrain/
  fs.copyFileSync(path.join(rootDir, 'omnibrain-setup.js'), path.join(frameworkDir, 'omnibrain-setup.js'));
  fs.copyFileSync(path.join(rootDir, 'omnibrain.config.json'), path.join(frameworkDir, 'omnibrain.config.json'));
  fs.cpSync(path.join(rootDir, 'omnibrain-templates'), path.join(frameworkDir, 'omnibrain-templates'), { recursive: true });
}

let testPassed = true;

// Test 1: Existing package protection (and setup idempotency)
console.log('[TEST 1] Existing package protection...');
initSandbox();
try {
  const originalPkg = fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8');
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const output = execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' }).toString();
  const postPkg = fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8');
  
  if (originalPkg !== postPkg) {
    console.error('\x1b[31m  [FAIL] Target package.json was modified.\x1b[0m');
    testPassed = false;
  } else if (output.includes('Skipped (already exists)')) {
    console.log('\x1b[32m  [PASS] Setup runs idempotently and protects target package.json.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Setup did not report skipping existing files.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Setup idempotency run failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 2: Existing scripts protection
console.log('\n[TEST 2] Existing scripts protection...');
initSandbox();
try {
  const originalScript = fs.readFileSync(path.join(projectDir, 'scripts/vault-health.js'), 'utf8');
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  execSync('node omnibrain/omnibrain-setup.js --force', { cwd: projectDir, stdio: 'pipe' });
  const postScript = fs.readFileSync(path.join(projectDir, 'scripts/vault-health.js'), 'utf8');

  if (originalScript === postScript) {
    console.log('\x1b[32m  [PASS] Setup and setup --force left host scripts/vault-health.js unchanged.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] Host scripts/vault-health.js was modified.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Existing scripts protection test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 3: Existing AGENTS protection
console.log('\n[TEST 3] Existing AGENTS protection...');
initSandbox();
fs.writeFileSync(path.join(projectDir, 'AGENTS.md'), 'CUSTOM_AGENTS_CONTENT');
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const contentAfterSetup = fs.readFileSync(path.join(projectDir, 'AGENTS.md'), 'utf8');
  const snippetExistsSetup = fs.existsSync(path.join(frameworkDir, 'AGENTS.omnibrain-snippet.md'));

  execSync('node omnibrain/omnibrain-setup.js --force', { cwd: projectDir, stdio: 'pipe' });
  const contentAfterForce = fs.readFileSync(path.join(projectDir, 'AGENTS.md'), 'utf8');
  const snippetExistsForce = fs.existsSync(path.join(frameworkDir, 'AGENTS.omnibrain-snippet.md'));

  if (contentAfterSetup !== 'CUSTOM_AGENTS_CONTENT' || contentAfterForce !== 'CUSTOM_AGENTS_CONTENT') {
    console.error('\x1b[31m  [FAIL] Existing AGENTS.md was modified.\x1b[0m');
    testPassed = false;
  } else if (!snippetExistsSetup || !snippetExistsForce) {
    console.error('\x1b[31m  [FAIL] omnibrain/AGENTS.omnibrain-snippet.md was not created.\x1b[0m');
    testPassed = false;
  } else {
    console.log('\x1b[32m  [PASS] Existing AGENTS.md is unchanged and snippet exists.\x1b[0m');
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Existing AGENTS protection test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 4: Fresh project bootstrap
console.log('\n[TEST 4] Fresh project bootstrap...');
initSandbox();
// Ensure AGENTS.md is absent in sandbox
if (fs.existsSync(path.join(projectDir, 'AGENTS.md'))) {
  fs.unlinkSync(path.join(projectDir, 'AGENTS.md'));
}
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const agentsFile = path.join(projectDir, 'AGENTS.md');
  if (fs.existsSync(agentsFile)) {
    const content = fs.readFileSync(agentsFile, 'utf8');
    if (content.includes('J_OS')) {
      console.error('\x1b[31m  [FAIL] Created AGENTS.md mentions J_OS.\x1b[0m');
      testPassed = false;
    } else if (content.includes('OmniBrain Workspace Bootstrap') && content.includes('Vault/Core_OS/Runtime/Entry.md')) {
      console.log('\x1b[32m  [PASS] Setup creates public OmniBrain-only bootstrap with no J_OS wording.\x1b[0m');
    } else {
      console.error('\x1b[31m  [FAIL] Created AGENTS.md has wrong format.\x1b[0m', content);
      testPassed = false;
    }
  } else {
    console.error('\x1b[31m  [FAIL] AGENTS.md was not created.\x1b[0m');
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Fresh project bootstrap test failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 5: Force boundary
console.log('\n[TEST 5] Force boundary check...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });

  const entryFile = path.join(projectDir, 'Vault/Core_OS/Runtime/Entry.md');
  const overviewFile = path.join(projectDir, 'Vault/Project/Project_Overview.md');

  fs.writeFileSync(entryFile, 'DELIBERATELY_ALTERED_ENTRY');
  fs.writeFileSync(overviewFile, 'DELIBERATELY_ALTERED_OVERVIEW');

  execSync('node omnibrain/omnibrain-setup.js --force', { cwd: projectDir, stdio: 'pipe' });

  const entryPost = fs.readFileSync(entryFile, 'utf8');
  const overviewPost = fs.readFileSync(overviewFile, 'utf8');

  if (entryPost === 'DELIBERATELY_ALTERED_ENTRY') {
    console.error('\x1b[31m  [FAIL] Core_OS/Runtime/Entry.md was not refreshed with --force.\x1b[0m');
    testPassed = false;
  } else if (overviewPost !== 'DELIBERATELY_ALTERED_OVERVIEW') {
    console.error('\x1b[31m  [FAIL] Project/Project_Overview.md was overwritten despite force boundary.\x1b[0m');
    testPassed = false;
  } else {
    console.log('\x1b[32m  [PASS] Force boundary protects Project_Overview.md while refreshing Entry.md.\x1b[0m');
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Force boundary test failed.\x1b[0m', e.message);
  testPassed = false;
}

// Test 6: Clean health pass
console.log('\n[TEST 6] Clean health pass...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  execSync('node omnibrain/scripts/vault-health.js', { cwd: projectDir, stdio: 'pipe' });
  console.log('\x1b[32m  [PASS] Newly generated vault passes vault-health check cleanly.\x1b[0m');
} catch (e) {
  console.error('\x1b[31m  [FAIL] Newly generated vault failed health check.\x1b[0m', e.stdout ? e.stdout.toString() : e.message);
  testPassed = false;
}

// Test 7: Health Check Broken Link Detection
console.log('\n[TEST 7] Health Check Broken Link Detection...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const overviewFile = path.join(projectDir, 'Vault/Project/Project_Overview.md');
  fs.appendFileSync(overviewFile, '\nLet us check this broken link [[NonExistentFile]].\n');

  try {
    execSync('node omnibrain/scripts/vault-health.js', { cwd: projectDir, stdio: 'pipe' });
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

// Test 8: Health Check Instruction Leakage Detection
console.log('\n[TEST 8] Health Check Instruction Leakage Detection...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const stateFile = path.join(projectDir, 'Vault/Project/Current_State.md');
  fs.appendFileSync(stateFile, '\nLet us add some system prompt leakage.\n');

  try {
    execSync('node omnibrain/scripts/vault-health.js', { cwd: projectDir, stdio: 'pipe' });
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

// Test 9: Obsidian Check Plugin Validation
console.log('\n[TEST 9] Obsidian Check Plugin Validation...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });

  // Case 9a: No .obsidian folder
  try {
    execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' });
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

  // Case 9b: .obsidian exists but no community-plugins.json
  const obsDir = path.join(projectDir, 'Vault/.obsidian');
  fs.mkdirSync(obsDir, { recursive: true });
  try {
    execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' });
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

  // Case 9c: community-plugins.json exists but lacks dataview
  const pluginsFile = path.join(obsDir, 'community-plugins.json');
  fs.writeFileSync(pluginsFile, JSON.stringify(['other-plugin']));
  try {
    execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' });
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

  // Case 9d: Dataview enabled
  fs.writeFileSync(pluginsFile, JSON.stringify(['other-plugin', 'dataview']));
  try {
    execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' });
    console.log('\x1b[32m  [PASS] Correctly passes when Dataview is enabled.\x1b[0m');
  } catch (e) {
    console.error('\x1b[31m  [FAIL] obsidian-check failed when Dataview was enabled.\x1b[0m', e.stdout.toString());
    testPassed = false;
  }
} catch (e) {
  console.error('\x1b[31m  [FAIL] Obsidian check test encountered an error.\x1b[0m', e.message);
  testPassed = false;
}

// Test 10: Migration Refusal on existing v2
console.log('\n[TEST 10] Migration Refusal on Existing v2...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });

  try {
    execSync('node omnibrain/scripts/omnibrain-migrate.js --from-v1', { cwd: projectDir, stdio: 'pipe' });
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

// Test 11: Non-destructive Maintenance (autotag/archive report-only)
console.log('\n[TEST 11] Non-destructive Maintenance checks...');
initSandbox();
try {
  execSync('node omnibrain/omnibrain-setup.js', { cwd: projectDir, stdio: 'pipe' });
  const plansDir = path.join(projectDir, 'Vault/Project/Plans');
  
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
  execSync('node omnibrain/scripts/vault-autotag.js', { cwd: projectDir, stdio: 'pipe' });
  let content = fs.readFileSync(orphanPlan, 'utf8');
  if (!content.startsWith('---')) {
    console.log('\x1b[32m  [PASS] vault-autotag is report-only by default.\x1b[0m');
  } else {
    console.error('\x1b[31m  [FAIL] vault-autotag modified file without --apply.\x1b[0m');
    testPassed = false;
  }

  // Run archive in report-only mode
  execSync('node omnibrain/scripts/vault-archive.js', { cwd: projectDir, stdio: 'pipe' });
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
