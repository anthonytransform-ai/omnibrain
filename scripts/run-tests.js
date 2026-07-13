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

const requiredEnglishGuideSections = [
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

const requiredChineseGuideSections = [
  '1. OmniBrain 是什麼',
  '2. OmniBrain 不會做什麼',
  '3. 開始前需要準備甚麼',
  '4. 使用 AI 助手安裝',
  '5. 手動安裝',
  '6. 在 Obsidian 開啟 OmniBrain',
  '7. 啟用 Bases',
  '8. 使用開始使用頁',
  '9. 建立第一個工作項目',
  '10. 理解六個階段',
  '11. 標示需要我決定',
  '12. 請 AI 助手處理工作項目',
  '13. 檢查並接受已完成的工作',
  '14. 保留重要專案知識',
  '15. 封存已完成的工作',
  '16. 安全地更新 OmniBrain',
  '17. 備份或移除 OmniBrain',
  '18. 疑難排解',
  '19. 私隱／隱私與本機檔案安全',
  '20. 簡明詞彙表'
];

console.log('[TEST 0] URL-only front door and agent installation contract...');
try {
  const problems = [];
  const readme = read('README.md', rootDir);
  const contractPath = path.join(rootDir, 'INSTALL_WITH_AI.md');
  if (!fs.existsSync(contractPath)) problems.push('INSTALL_WITH_AI.md missing');
  const contract = fs.existsSync(contractPath) ? fs.readFileSync(contractPath, 'utf8') : '';
  const primaryRoute = readme.split('## Advanced Technical Fallback')[0];
  const repoUrl = 'https://github.com/anthonytransform-ai/omnibrain';
  const shortInstruction = 'Install this in my current project. Preserve my existing files and guide me through anything that needs my decision.';
  if (!primaryRoute.includes(repoUrl)) problems.push('README primary route missing repository URL');
  if (!primaryRoute.includes(shortInstruction)) problems.push('README primary route missing short human instruction');
  if (!primaryRoute.includes('already working in your project')) problems.push('README does not tell user to paste into the active project AI assistant');
  if (/```bash|node omnibrain\/omnibrain-setup\.js|Code -> Download ZIP|Download ZIP|git clone/i.test(primaryRoute)) {
    problems.push('README primary route includes manual acquisition or terminal-command requirement');
  }
  const requiredContractSnippets = [
    'Confirm the active host project folder',
    'Use `https://github.com/anthonytransform-ai/omnibrain` as the official repository URL',
    'Run `node --version`',
    'Do not install Node.js, Git, Obsidian or other system software without explicit user approval',
    'Do not leave a nested `.git` repository',
    'Preserve existing `package.json`',
    'Preserve existing host `scripts/`',
    'Preserve existing root `AGENTS.md`',
    'Run `node omnibrain/omnibrain-setup.js`',
    'AGENTS.omnibrain-snippet.md',
    'Ask no more than five product questions',
    'Run `node omnibrain/scripts/vault-health.js`',
    'If installation cannot complete, do not pretend success',
    "Tell the user to open the host project's `Vault/` folder in Obsidian Desktop"
  ];
  for (const snippet of requiredContractSnippets) {
    if (!contract.includes(snippet)) problems.push(`INSTALL_WITH_AI.md missing: ${snippet}`);
  }
  const boundarySnippets = [
    'Future approved human PDF guides will be produced separately',
    'Markdown files in `docs/`, `Vault/` and `omnibrain-templates/` are contributor and AI-readable sources'
  ];
  for (const snippet of boundarySnippets) {
    if (!readme.includes(snippet)) problems.push(`README missing human-guide boundary: ${snippet}`);
  }
  if (/successfully followed the URL-only journey|proves the real user journey/i.test(readme + contract)) {
    problems.push('Static docs claim to prove the independent fresh-agent journey');
  }
  if (problems.length) {
    fail('URL-only front door contract failed.', problems.join('\n'));
  } else {
    pass('README front door and INSTALL_WITH_AI.md define the URL-only agent installation contract.');
  }
} catch (e) {
  fail('URL-only front door contract test failed.', combinedOutput(e));
}

console.log('\n[TEST 1] Missing template directory safe failure...');
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

console.log('\n[TEST 2] Fresh Guided Workspace setup...');
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

console.log('\n[TEST 3] Start Here links and Base embed...');
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

console.log('\n[TEST 4] Guide source/install contracts...');
try {
  const problems = [];
  const guidePaths = [
    ['docs/User_Guide.en.md', rootDir, requiredEnglishGuideSections],
    ['docs/User_Guide.zh-Hant.md', rootDir, requiredChineseGuideSections],
    ['Vault/Help/User_Guide.en.md', projectDir, requiredEnglishGuideSections],
    ['Vault/Help/User_Guide.zh-Hant.md', projectDir, requiredChineseGuideSections]
  ];
  for (const [rel, base, expected] of guidePaths) {
    if (!exists(rel, base)) problems.push(`${rel} missing`);
    else if (JSON.stringify(extractNumberedSections(read(rel, base))) !== JSON.stringify(expected)) {
      problems.push(`${rel} section contract mismatch`);
    }
  }
  const en = read('docs/User_Guide.en.md', rootDir);
  const zh = read('docs/User_Guide.zh-Hant.md', rootDir);
  const enCopies = [
    read('omnibrain-templates/user-guide.en.template.md', rootDir),
    read('Vault/Help/User_Guide.en.md', projectDir)
  ];
  const zhCopies = [
    read('omnibrain-templates/user-guide.zh-Hant.template.md', rootDir),
    read('Vault/Help/User_Guide.zh-Hant.md', projectDir)
  ];
  if (enCopies.some(copy => copy !== en)) problems.push('English guide source/template/install copies are not byte-identical');
  if (zhCopies.some(copy => copy !== zh)) problems.push('Traditional Chinese guide source/template/install copies are not byte-identical');
  const enNumbers = extractNumberedSections(en).map(section => section.split('.')[0]);
  const zhNumbers = extractNumberedSections(zh).map(section => section.split('.')[0]);
  if (JSON.stringify(enNumbers) !== JSON.stringify(zhNumbers)) problems.push('guide section numbers differ by language');
  const prohibited = ['配置', '默認', '運行', '文件夾', '信息', '創建', '智能體'];
  for (const term of prohibited) {
    if (zh.includes(term)) problems.push(`Traditional Chinese guide contains prohibited term: ${term}`);
  }
  const privatePhrases = [
    '合併前請由 K',
    'K 進行文字審閱',
    'J_OS',
    'Agent G',
    'internal release-review',
    'private review'
  ];
  for (const phrase of privatePhrases) {
    if (zh.includes(phrase)) problems.push(`Traditional Chinese guide contains private/review phrase: ${phrase}`);
  }
  if (!en.includes('Three-minute quick start') || !zh.includes('三分鐘快速開始')) {
    problems.push('quick start missing');
  }
  const requiredEnSnippets = [
    'Please install OmniBrain in this project folder.',
    'https://github.com/anthonytransform-ai/omnibrain',
    'Code -> Download ZIP',
    'node --version',
    'Node.js is missing',
    'omnibrain/omnibrain-setup.js',
    'omnibrain/omnibrain-templates/',
    'AGENTS.omnibrain-snippet.md',
    'propose the exact merged change',
    'Please read `Vault/Start_Here.md`',
    'Please close this task carefully',
    'lasting project knowledge',
    '> [!warning]',
    '| Symptom | What to do |',
    'privacy and data-handling policy'
  ];
  const requiredZhSnippets = [
    '請在這個專案資料夾安裝 OmniBrain',
    'https://github.com/anthonytransform-ai/omnibrain',
    'Code -> Download ZIP',
    'node --version',
    '找不到 Node.js',
    'omnibrain/omnibrain-setup.js',
    'omnibrain/omnibrain-templates/',
    'AGENTS.omnibrain-snippet.md',
    '提出準確的合併後變更',
    '請讀取 `Vault/Start_Here.md`',
    '請謹慎結束這個工作項目',
    '長期專案知識',
    '> [!warning]',
    '| 情況 | 處理方法 |',
    '私隱／隱私與資料處理政策'
  ];
  for (const snippet of requiredEnSnippets) {
    if (!en.includes(snippet)) problems.push(`English guide missing: ${snippet}`);
  }
  for (const snippet of requiredZhSnippets) {
    if (!zh.includes(snippet)) problems.push(`Traditional Chinese guide missing: ${snippet}`);
  }
  if (problems.length) {
    fail('Guide contracts failed.', problems.join('\n'));
  } else {
    pass('English and Traditional Chinese guides are complete, localised, byte-consistent and free of private review leakage.');
  }
} catch (e) {
  fail('Guide contract test failed.', combinedOutput(e));
}

console.log('\n[TEST 5] Task Board static behaviour...');
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

console.log('\n[TEST 6] Setup idempotency and preservation boundaries...');
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

console.log('\n[TEST 7] Health validation required structure...');
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

console.log('\n[TEST 8] Obsidian check v2.1 behaviour...');
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

console.log('\n[TEST 9] Public generated files stay portable...');
initSandbox();
try {
  runSetup();
  const publicFiles = [
    ['README.md', rootDir],
    ['INSTALL_WITH_AI.md', rootDir],
    ['AGENTS.md', projectDir],
    ['Vault/Start_Here.md', projectDir],
    ['Vault/Help/User_Guide.en.md', projectDir],
    ['Vault/Help/User_Guide.zh-Hant.md', projectDir],
    ['Vault/Core_OS/Runtime/Entry.md', projectDir],
    ['Vault/Core_OS/Workflows/Implementation.md', projectDir],
    ['Vault/Obsidian/INSTALL.md', projectDir]
  ];
  const forbidden = ['J_OS', 'j_os_root', 'npm run setup', 'npm run obsidian-check', 'required to render the read-only dashboard queries', '合併前請由 K', 'K 進行文字審閱'];
  const offenders = [];
  for (const [rel, base] of publicFiles) {
    const content = read(rel, base);
    for (const phrase of forbidden) {
      if (content.includes(phrase)) offenders.push(`${rel}: ${phrase}`);
    }
  }
  const guides = read('Vault/Help/User_Guide.en.md') + read('Vault/Help/User_Guide.zh-Hant.md');
  if (/Dataview[^.\n]*(required|需要)/i.test(guides)) offenders.push('Guides require Dataview');
  if (!guides.includes('do not install Node.js or other system software') || !guides.includes('不要在未經我明確批准前安裝 Node.js')) offenders.push('AI-assisted Node.js safety line missing');
  const lifecycle = read('Vault/Core_OS/Runtime/Entry.md') + read('Vault/Core_OS/Workflows/Implementation.md');
  if (!lifecycle.includes('Task stage movement remains a human decision')) offenders.push('Task lifecycle authority rule missing');
  if (!lifecycle.includes('change `stage` only after direct user instruction')) offenders.push('Direct stage instruction rule missing');
  if (!lifecycle.includes('What I need to decide')) offenders.push('Decision-boundary task body rule missing');
  if (offenders.length) {
    fail('Generated public files contain private or obsolete guidance.', offenders.join('\n'));
  } else {
    pass('Generated public files contain no private J_OS route, obsolete command guidance, or lifecycle-authority gap.');
  }
} catch (e) {
  fail('Public portability test failed.', combinedOutput(e));
}

console.log('\n[TEST 10] Source templates and installed files remain consistent...');
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

console.log('\n[TEST 11] Migration public recovery commands...');
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

console.log('\n[TEST 12] Non-destructive maintenance checks...');
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
