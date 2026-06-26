import { spawnSync } from 'node:child_process';

const moduleDefaultFlag = '--experimental-default-type=module';
const existingNodeOptions = (process.env.NODE_OPTIONS || '').trim();
const nodeOptions = existingNodeOptions.includes(moduleDefaultFlag)
  ? existingNodeOptions
  : [existingNodeOptions, moduleDefaultFlag].filter(Boolean).join(' ');

const result = spawnSync(process.execPath, ['scripts/run-tests.js'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions
  },
  stdio: 'inherit'
});

if (result.error) {
  console.error(`Unable to run OmniBrain tests: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
