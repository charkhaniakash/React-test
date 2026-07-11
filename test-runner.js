import { spawnSync } from 'child_process';

// Filter out Jest-specific flags that the external test runner is passing
const args = process.argv.slice(2).filter(arg => arg !== '--json' && arg !== '--forceExit');

// Run vitest with the filtered arguments
const result = spawnSync('npx', ['vitest', 'run', ...args], {
  stdio: 'inherit',
  shell: true
});

process.exit(result.status ?? 0);
