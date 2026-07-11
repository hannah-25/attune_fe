// 순수 로직 회귀 테스트 러너.
//
// 프로젝트에 TS 테스트 러너(vitest/jest)가 없어, Node 내장 러너(node --test)로
// DOM/Dexie에 의존하지 않는 순수 모듈을 검증한다. src는 확장자 없는 import를
// 쓰므로 tsc로 CJS(임시 디렉터리)로 변환한 뒤 실행한다.
//   - --noCheck: @types/node 없이도 emit (타입 검사는 `pnpm typecheck`가 담당)
//   - OS 임시 디렉터리로 emit: node --test가 node_modules 하위를 무시하므로.
//
// 엔트리 1개만 받는다. tsc가 엔트리의 디렉터리를 루트로 잡아 outDir 최상위에
// <basename>.js를 emit하므로, 실행 경로를 그렇게 계산한다.
//
// 사용: node scripts/test-node.mjs src/app/offline/queuePolicy.test.ts

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

const entry = process.argv[2];
if (!entry) {
  console.error('usage: node scripts/test-node.mjs <entry.test.ts>');
  process.exit(1);
}

const tscBin = join('node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
const outDir = mkdtempSync(join(tmpdir(), 'attune-test-'));
const emitted = join(outDir, `${basename(entry, '.ts')}.js`);

try {
  execFileSync(
    tscBin,
    [
      entry,
      '--ignoreConfig',
      '--module', 'commonjs',
      '--moduleResolution', 'node',
      '--ignoreDeprecations', '6.0',
      '--target', 'es2020',
      '--outDir', outDir,
      '--skipLibCheck',
      '--esModuleInterop',
      '--noCheck',
    ],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );
  execFileSync(process.execPath, ['--test', emitted], { stdio: 'inherit' });
} finally {
  rmSync(outDir, { recursive: true, force: true });
}
