// PK 순수 모델 회귀 테스트 러너.
//
// 프로젝트에 TS 테스트 러너(vitest/jest)가 없어, adhd-med-graph 프로토타입처럼
// Node 내장 러너(node --test)로 순수 모델을 검증한다. lib는 확장자 없는 import를
// 쓰므로 tsc로 CJS(임시 디렉터리)로 변환한 뒤 실행한다.
//   - --noCheck: @types/node 없이도 emit (타입 검사는 `pnpm typecheck`가 담당)
//   - OS 임시 디렉터리로 emit: node --test가 node_modules 하위를 무시하므로.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tscBin = join('node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
const outDir = mkdtempSync(join(tmpdir(), 'attune-pk-'));

try {
  execFileSync(
    tscBin,
    [
      'src/app/lib/pk/model.test.ts',
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
  execFileSync(process.execPath, ['--test', join(outDir, 'model.test.js')], { stdio: 'inherit' });
} finally {
  rmSync(outDir, { recursive: true, force: true });
}
