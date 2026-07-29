// scripts/agent/verify.mjs
// PR 전 묶음 게이트: typecheck → build → check-docs 순차 실행.
// 어느 단계든 실패하면 그 지점에서 멈추고 다음 행동을 안내.
import { spawnSync } from 'node:child_process';
import { ROOT, log, fail } from './_lib.mjs';

const STEPS = [
  { name: 'typecheck', cmd: 'pnpm', args: ['typecheck'], hint: '타입 오류를 고치세요. `pnpm typecheck`로 재현 가능.' },
  { name: 'build', cmd: 'pnpm', args: ['build'], hint: '빌드 오류를 고치세요. 보통 import 경로/누락 자산 문제.' },
  { name: 'check-docs', cmd: 'pnpm', args: ['check-docs'], hint: '문서 링크를 고치세요.' },
];

const isWin = process.platform === 'win32';

for (const step of STEPS) {
  log(`\n=== verify: ${step.name} ===`);
  const res = spawnSync(step.cmd, step.args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: isWin, // Windows에서 pnpm.cmd 해석 위해 shell 필요
  });
  if (res.status !== 0) {
    fail(`'${step.name}' 단계 실패 (exit ${res.status}).`, step.hint);
  }
}

log('\n[OK] verify 통과: typecheck + build + check-docs.');
