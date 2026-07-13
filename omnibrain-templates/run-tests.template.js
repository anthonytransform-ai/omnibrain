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

console.log('\x1b[36m===============================================\x1b[0m');
console.log('\x1b[36m   OmniBrain v2.1.0 Test Suite                 \x1b[0m');
console.log('\x1b[36m===============================================\n\x1b[0m');

let testPassed = true;

function initSandbox() {
  if (fs.existsSync(sandboxDir)) {
    fs.rmSync(sandboxDir, { recursive: true, force: true });
  }
  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(frameworkDir, { recursive: true });

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify({ name: 'my-existing-app', version: '1.0.0', scripts: { test: 'exit 0' } }, null, 2) + '\n'
  );

  const mockScriptsDir = path.join(projectDir, 'scripts');
  fs.mkdirSync(mockScriptsDir, { recursive: true });
  fs.writeFileSync(path.join(mockScriptsDir, 'vault-health.js'), '// Original host script\nconsole.log("original health");\n');

  fs.copyFileSync(path.join(rootDir, 'omnibrain-setup.js'), path.join(frameworkDir, 'omnibrain-setup.js'));
  fs.copyFileSync(path.join(rootDir, 'omnibrain.config.json'), path.join(frameworkDir, 'omnibrain.config.json'));
  fs.cpSync(path.join(rootDir, 'omnibrain-templates'), path.join(frameworkDir, 'omnibrain-templates'), { recursive: true });
}

function combinedOutput(error) {
  return [
    error.stdout ? error.stdout.toString() : '',
    error.stderr ? error.stderr.toString() : '',
    error.message || ''
  ].join('\n');
}

function pass(message) {
  console.log(`\x1b[32m  [PASS] ${message}\x1b[0m`);
}

function fail(message, detail = '') {
  console.error(`\x1b[31m  [FAIL] ${message}\x1b[0m`);
  if (detail) console.error(detail);
  testPassed = false;
}

function runSetup(args = '') {
  return execSync(`node omnibrain/omnibrain-setup.js${args ? ` ${args}` : ''}`, { cwd: projectDir, stdio: 'pipe' }).toString();
}

function read(rel, base = projectDir) {
  return fs.readFileSync(path.join(base, rel), 'utf8');
}

function exists(rel, base = projectDir) {
  return fs.existsSync(path.join(base, rel));
}

function extractNumberedSections(content) {
  return [...content.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)].map(match => `${match[1]}. ${match[2].trim()}`);
}

function parseFrontmatter(content) {
  if (!content.startsWith('---')) return {};
  const end = content.indexOf('\n---', 3);
  if (end === -1) return {};
  const fm = {};
  for (const line of content.slice(3, end).split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    fm[key] = value;
  }
  return fm;
}

function taskVisibleInBase(rel) {
  const full = path.join(projectDir, rel);
  if (!full.startsWith(path.join(projectDir, 'Vault', 'Work', 'Tasks'))) return false;
  if (!rel.endsWith('.md')) return false;
  const fm = parseFrontmatter(fs.readFileSync(full, 'utf8'));
  return fm.type === 'omnibrain_task';
}

const requiredGuideSections = [
  '1. What OmniBrain is',
  '2. What OmniBrain does not do',
  '3. What you need before starting',
  '4. Install with an AI assistant',
  '5. Manual installation',
  '6. Open OmniBrain in Obsidian',
  '7. Enable Bases',
  '8. Use Start Here',
  '9. Create your first task',
  '10. Understand the six stages',
  '11. Mark that a decision is needed',
  '12. Ask an AI assistant to work on a task',
  '13. Check and accept completed work',
  '14. Keep important project knowledge',
  '15. Archive completed work',
  '16. Update OmniBrain safely',
  '17. Back up or remove OmniBrain',
  '18. Troubleshooting',
  '19. Privacy and local-file safety',
  '20. Plain-language glossary'
];

console.log('[TEST 0] Missing template directory safe failure...');
initSandbox();
try {
  fs.rmSync(path.join(frameworkDir, 'omnibrain-templates'), { recursive: true, force: true });
  try {
    runSetup();
    fail('Setup succeeded even though omnibrain-templates was missing.');
  } catch (e) {
    const output = combinedOutput(e);
    if (
      e.status === 1 &&
      output.includes('OmniBrain setup did not start') &&
      output.includes('Files changed: no') &&
      !exists('Vault') &&
      !exists('omnibrain.config.json') &&
      exists('package.json') &&
      exists('scripts/vault-health.js')
    ) {
      pass('Missing template directory stops setup before target-project modification.');
    } else {
      fail('Missing template directory did not fail safely.', output);
    }
  }
} catch (e) {
  fail('Missing template directory test encountered an error.', combinedOutput(e));
}

console.log('\n[TEST 1] Fresh Guided Workspace setup...');
initSandbox();
try {
  runSetup();
  const required = [
    'Vault/Start_Here.md',
    'Vault/Help/User_Guide.en.md',
    'Vault/Help/User_Guide.zh-Hant.md',
    'Vault/Work/Tasks/Task_Board.base',
    'Vault/Work/Archive',
    'Vault/Core_OS/Runtime/Entry.md',
    'Vault/Obsidian/Queries/Dashboard.md',
    'Vault/Dashboard.md',
    'Vault/Project/Features/Guided_Workspace.md'
  ];
  const missing = required.filter(rel => !exists(rel));
  const config = JSON.parse(read('omnibrain.config.json'));
  if (missing.length) {
    fail('Fresh setup missed required Guided Workspace files.', missing.join('\n'));
  } else if (config.vault_version !== '2.1.0') {
    fail('Fresh omnibrain.config.json does not use vault_version 2.1.0.');
  } else {
    pass('Fresh setup creates v2.1 Guided Workspace files.');
  }
} catch (e) {
  fail('Fresh Guided Workspace setup failed.', combinedOutput(e));
}

console.log('\n[TEST 2] Start Here links and Base embed...');
try {
  const start = read('Vault/Start_Here.md');
  const requiredSnippets = [
    '[[Project/Project_Overview|Project Overview]]',
    '[[Project/Current_State|Current State]]',
    '[[Project/System/Product_Vision|Product Vision]]',
    '[[Help/User_Guide.en|English User Guide]]',
    '[[Help/User_Guide.zh-Hant|Traditional Chinese User Guide]]',
    '![[Work/Tasks/Task_Board.base#Active work]]',
    'Needs my decision'
  ];
  const missing = requiredSnippets.filter(snippet => !start.includes(snippet));
  if (missing.length) {
    fail('Start Here is missing required links or embed.', missing.join('\n'));
  } else if (/node omnibrain|npm run|```bash/.test(start)) {
    fail('Start Here contains terminal commands in the main user-facing body.');
  } else {
    pass('Start Here links to required notes and embeds the Active work Base view.');
  }
} catch (e) {
  fail('Start Here validation failed.', combinedOutput(e));
}

console.log('\n[TEST 3] Guide source/install contracts...');
try {
  const guidePaths = [
    ['docs/User_Guide.en.md', rootDir],
    ['docs/User_Guide.zh-Hant.md', rootDir],
    ['Vault/Help/User_Guide.en.md', projectDir],
    ['Vault/Help/User_Guide.zh-Hant.md', projectDir]
  ];
  const problems = [];
  for (const [rel, base] of guidePaths) {
    if (!exists(rel, base)) {
      problems.push(`${rel} missing`);
      continue;
    }
    const sections = extractNumberedSections(read(rel, base));
    if (JSON.stringify(sections) !== JSON.stringify(requiredGuideSections)) {
      problems.push(`${rel} section contract mismatch`);
    }
  }
  const en = read('docs/User_Guide.en.md', rootDir);
  const zh = read('docs/User_Guide.zh-Hant.md', rootDir);
  const prohibited = ['配置', '默認', '運行', '文件夾', '信息', '創建', '智能體'];
  for (const term of prohibited) {
    if (zh.includes(term)) problems.push(`Traditional Chinese guide contains prohibited term: ${term}`);
  }
  if (!en.includes('Three-minute quick start') || !zh.includes('三分鐘快速開始')) {
    problems.push('quick start missing');
  }
  if (!en.includes('Please install OmniBrain in this project folder') || !zh.includes('Please install OmniBrain in this project folder')) {
    problems.push('copyable AI installation instruction missing');
  }
  if (!en.includes('Please read Vault/Start_Here.md') || !zh.includes('Please read Vault/Start_Here.md')) {
    problems.push('copyable task instruction missing');
  }
  if (!en.includes('Is there anything from this task that should be kept as lasting project knowledge?') || !zh.includes('Is there anything from this task that should be kept as lasting project knowledge?')) {
    problems.push('copyable close-task instruction missing');
  }
  if (problems.length) {
    fail('Guide contracts failed.', problems.join('\n'));
  } else {
    pass('English and Traditional Chinese guides exist, install, and match the required section contract.');
  }
} catch (e) {
  fail('Guide contract test failed.', combinedOutput(e));
}

console.log('\n[TEST 4] Task Board static behaviour...');
try {
  const base = read('Vault/Work/Tasks/Task_Board.base');
  const requiredSnippets = [
    'file.inFolder("Work/Tasks")',
    'file.ext == "md"',
    'type == "omnibrain_task"',
    'stage != "Done"',
    'property: stage',
    'needs_user_decision == true',
    'stage == "Done"',
    'property: file.mtime',
    'direction: DESC'
  ];
  const missing = requiredSnippets.filter(snippet => !base.includes(snippet));
  if (missing.length) {
    fail('Task Board Base is missing required filter/view syntax.', missing.join('\n'));
  } else {
    fs.writeFileSync(path.join(projectDir, 'Vault/Work/Tasks/Visible_Task.md'), '---\ntype: omnibrain_task\nstage: Ideas\nneeds_user_decision: false\nsummary: Visible\n---\n');
    fs.writeFileSync(path.join(projectDir, 'Vault/Work/Tasks/Ordinary_Note.md'), '# Ordinary\n');
    const visible = taskVisibleInBase('Vault/Work/Tasks/Visible_Task.md');
    const ordinary = taskVisibleInBase('Vault/Work/Tasks/Ordinary_Note.md');
    const board = taskVisibleInBase('Vault/Work/Tasks/Task_Board.base');
    if (!visible || ordinary || board) {
      fail('Task Board static filtering does not isolate intended task Markdown files.');
    } else {
      pass('Task Board filters intended tasks, excludes ordinary Markdown, and cannot include itself.');
    }
  }
} catch (e) {
  fail('Task Board static behaviour test failed.', combinedOutput(e));
}

console.log('\n[TEST 5] Setup idempotency and preservation boundaries...');
initSandbox();
try {
  fs.writeFileSync(path.join(projectDir, 'AGENTS.md'), 'CUSTOM_AGENTS_CONTENT');
  fs.writeFileSync(path.join(projectDir, 'omnibrain.config.json'), JSON.stringify({ project_id: 'host-owned', vault_version: 'custom' }, null, 2) + '\n');
  const originalPkg = read('package.json');
  const originalHostScript = read('scripts/vault-health.js');
  const originalConfig = read('omnibrain.config.json');
  runSetup();

  const taskPath = path.join(projectDir, 'Vault/Work/Tasks/My_Task.md');
  const archivePath = path.join(projectDir, 'Vault/Work/Archive/Archived_Task.md');
  const projectPath = path.join(projectDir, 'Vault/Project/Project_Overview.md');
  const dashboardPath = path.join(projectDir, 'Vault/Dashboard.md');
  fs.writeFileSync(taskPath, 'USER_TASK_CONTENT');
  fs.writeFileSync(archivePath, 'USER_ARCHIVE_CONTENT');
  fs.writeFileSync(projectPath, 'USER_PROJECT_CONTENT');
  fs.writeFileSync(dashboardPath, 'USER_DASHBOARD_CONTENT');
  fs.writeFileSync(path.join(projectDir, 'Vault/Start_Here.md'), 'STALE_START');

  const output = runSetup('--force');

  const checks = [
    [read('package.json') === originalPkg, 'host package.json changed'],
    [read('scripts/vault-health.js') === originalHostScript, 'host scripts changed'],
    [read('omnibrain.config.json') === originalConfig, 'host omnibrain.config.json changed'],
    [read('AGENTS.md') === 'CUSTOM_AGENTS_CONTENT', 'host AGENTS.md changed'],
    [fs.readFileSync(taskPath, 'utf8') === 'USER_TASK_CONTENT', 'task file overwritten'],
    [fs.readFileSync(archivePath, 'utf8') === 'USER_ARCHIVE_CONTENT', 'archive file overwritten'],
    [fs.readFileSync(projectPath, 'utf8') === 'USER_PROJECT_CONTENT', 'Project memory overwritten'],
    [fs.readFileSync(dashboardPath, 'utf8') === 'USER_DASHBOARD_CONTENT', 'Dashboard overwritten'],
    [read('Vault/Start_Here.md') !== 'STALE_START', 'Start Here was not refreshed by --force'],
    [output.includes('AGENTS.omnibrain-snippet.md'), 'AGENTS snippet was not reported']
  ];
  const failed = checks.filter(([ok]) => !ok).map(([, message]) => message);
  if (failed.length) {
    fail('Preservation boundary failed.', failed.join('\n'));
  } else {
    pass('Normal setup and --force preserve host files, tasks, archive, Project memory and Dashboard.');
  }
} catch (e) {
  fail('Preservation boundary test failed.', combinedOutput(e));
}

console.log('\n[TEST 6] Health validation required structure...');
initSandbox();
try {
  runSetup();
  execSync('node omnibrain/scripts/vault-health.js', { cwd: projectDir, stdio: 'pipe' });
  fs.rmSync(path.join(projectDir, 'Vault/Work/Tasks/Task_Board.base'));
  try {
    execSync('node omnibrain/scripts/vault-health.js', { cwd: projectDir, stdio: 'pipe' });
    fail('Health check passed despite missing Task_Board.base.');
  } catch (e) {
    const output = combinedOutput(e);
    if (output.includes('MISSING FILE') && output.includes('Task_Board.base')) {
      pass('Health validation fails when a required Guided Workspace file is removed.');
    } else {
      fail('Health validation did not clearly report missing Task_Board.base.', output);
    }
  }
} catch (e) {
  fail('Health validation test failed.', combinedOutput(e));
}

console.log('\n[TEST 7] Obsidian check v2.1 behaviour...');
initSandbox();
try {
  runSetup();
  try {
    execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' });
    fail('obsidian-check passed before the Vault was opened.');
  } catch (e) {
    const output = combinedOutput(e);
    if (!output.includes('Obsidian vault has not been opened yet')) {
      fail('obsidian-check missing-vault-open message changed unexpectedly.', output);
    }
  }
  fs.mkdirSync(path.join(projectDir, 'Vault/.obsidian'), { recursive: true });
  const output = execSync('node omnibrain/scripts/obsidian-check.js', { cwd: projectDir, stdio: 'pipe' }).toString();
  if (output.includes('Dataview') || !output.includes('enable Bases')) {
    fail('obsidian-check still requires Dataview or does not explain Bases.', output);
  } else {
    pass('obsidian-check confirms opened Vault and guides users to enable Bases without Dataview.');
  }
} catch (e) {
  fail('Obsidian check test failed.', combinedOutput(e));
}

console.log('\n[TEST 8] Public generated files stay portable...');
initSandbox();
try {
  runSetup();
  const publicFiles = [
    'AGENTS.md',
    'Vault/Start_Here.md',
    'Vault/Help/User_Guide.en.md',
    'Vault/Help/User_Guide.zh-Hant.md',
    'Vault/Core_OS/Runtime/Entry.md',
    'Vault/Core_OS/Workflows/Implementation.md',
    'Vault/Obsidian/INSTALL.md'
  ];
  const forbidden = ['J_OS', 'j_os_root', 'npm run setup', 'npm run obsidian-check', 'required to render the read-only dashboard queries'];
  const offenders = [];
  for (const rel of publicFiles) {
    const content = read(rel);
    for (const phrase of forbidden) {
      if (content.includes(phrase)) offenders.push(`${rel}: ${phrase}`);
    }
  }
  const guides = read('Vault/Help/User_Guide.en.md') + read('Vault/Help/User_Guide.zh-Hant.md');
  if (/Dataview[^.\n]*(required|需要)/i.test(guides)) offenders.push('Guides require Dataview');
  if (!guides.includes('Do not install Node.js, Git, Obsidian or system software automatically.')) offenders.push('AI-assisted install safety line missing');
  if (offenders.length) {
    fail('Generated public files contain private or obsolete guidance.', offenders.join('\n'));
  } else {
    pass('Generated public files contain no private J_OS route or obsolete Dataview/npm setup requirement.');
  }
} catch (e) {
  fail('Public portability test failed.', combinedOutput(e));
}

console.log('\n[TEST 9] Source templates and installed files remain consistent...');
try {
  const pairs = [
    ['omnibrain-templates/start-here.template.md', 'Vault/Start_Here.md'],
    ['omnibrain-templates/user-guide.en.template.md', 'Vault/Help/User_Guide.en.md'],
    ['omnibrain-templates/user-guide.zh-Hant.template.md', 'Vault/Help/User_Guide.zh-Hant.md'],
    ['omnibrain-templates/task-board.template.base', 'Vault/Work/Tasks/Task_Board.base'],
    ['omnibrain-templates/obsidian-install.template.md', 'Vault/Obsidian/INSTALL.md'],
    ['omnibrain-templates/entry.template.md', 'Vault/Core_OS/Runtime/Entry.md'],
    ['omnibrain-templates/workflow-implementation.template.md', 'Vault/Core_OS/Workflows/Implementation.md'],
    ['omnibrain-templates/workflow-staged-change.template.md', 'Vault/Core_OS/Workflows/Staged_Change.md'],
    ['omnibrain-templates/vault-health.template.js', 'scripts/vault-health.js'],
    ['omnibrain-templates/obsidian-check.template.js', 'scripts/obsidian-check.js'],
    ['omnibrain-templates/run-tests.template.js', 'scripts/run-tests.js']
  ];
  const mismatches = pairs.filter(([a, b]) => read(a, rootDir) !== read(b, rootDir)).map(pair => pair.join(' != '));
  if (mismatches.length) {
    fail('Template/source pairs drifted.', mismatches.join('\n'));
  } else {
    pass('Framework templates and installed repository copies match.');
  }
} catch (e) {
  fail('Template consistency test failed.', combinedOutput(e));
}

console.log('\n[TEST 10] Migration public recovery commands...');
initSandbox();
try {
  runSetup();
  try {
    execSync('node omnibrain/scripts/omnibrain-migrate.js', { cwd: projectDir, stdio: 'pipe' });
    fail('Migration ran without the required --from-v1 flag.');
  } catch (e) {
    const output = combinedOutput(e);
    if (
      output.includes('node omnibrain/scripts/omnibrain-migrate.js --from-v1 --dry-run') &&
      output.includes('node omnibrain/scripts/omnibrain-migrate.js --from-v1') &&
      !output.includes('npm run omnibrain-migrate')
    ) {
      pass('Migration missing-flag guidance uses public direct node commands.');
    } else {
      fail('Migration missing-flag guidance used incorrect commands.', output);
    }
  }
} catch (e) {
  fail('Migration public command test failed.', combinedOutput(e));
}

console.log('\n[TEST 11] Non-destructive maintenance checks...');
initSandbox();
try {
  runSetup();
  const plansDir = path.join(projectDir, 'Vault/Project/Plans');
  const orphanPlan = path.join(plansDir, 'Orphan_Plan.md');
  const eligiblePlan = path.join(plansDir, 'Eligible_Plan.md');
  fs.writeFileSync(orphanPlan, 'My orphan plan text');
  fs.writeFileSync(eligiblePlan, '---\ntype: plan\nstatus: completed\n---\nPlan text');
  const oldTime = (Date.now() - 10 * 24 * 60 * 60 * 1000) / 1000;
  fs.utimesSync(eligiblePlan, oldTime, oldTime);
  execSync('node omnibrain/scripts/vault-autotag.js', { cwd: projectDir, stdio: 'pipe' });
  execSync('node omnibrain/scripts/vault-archive.js', { cwd: projectDir, stdio: 'pipe' });
  if (fs.readFileSync(orphanPlan, 'utf8').startsWith('---') || !fs.existsSync(eligiblePlan)) {
    fail('Maintenance scripts modified files without --apply.');
  } else {
    pass('vault-autotag and vault-archive remain report-only by default.');
  }
} catch (e) {
  fail('Non-destructive maintenance test failed.', combinedOutput(e));
}

if (fs.existsSync(sandboxDir)) {
  fs.rmSync(sandboxDir, { recursive: true, force: true });
}

console.log('\n-----------------------------------------------');
if (testPassed) {
  console.log('\x1b[32m✔ All OmniBrain v2.1 tests completed successfully!\x1b[0m');
  process.exit(0);
}

console.error('\x1b[31m✘ Some OmniBrain v2.1 tests failed. Please review logs.\x1b[0m');
process.exit(1);
