// scripts/agent/_lib.mjs
// 공통 유틸: 경로, 파일 탐색, 로깅. destructive 동작 없음(읽기 + docs/generated 쓰기만).
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function log(msg) {
  process.stdout.write(`${msg}\n`);
}

/** 실패 메시지 + 다음 행동을 stderr로 출력하고 종료 코드 1. */
export function fail(msg, nextAction) {
  process.stderr.write(`\n[FAIL] ${msg}\n`);
  if (nextAction) process.stderr.write(`[NEXT] ${nextAction}\n`);
  process.exit(1);
}

/** dir 아래 ext 확장자 파일을 재귀 수집. node_modules/dist 등은 제외. */
export function walk(dir, exts, acc = []) {
  const SKIP = new Set(['node_modules', 'dist', 'dev-dist', '.git', 'coverage', '.vite']);
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, exts, acc);
    else if (exts.some(x => e.name.endsWith(x))) acc.push(full);
  }
  return acc;
}

export function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

/** docs/generated 자동생성 파일 상단 배너. */
export function generatedBanner(scriptName) {
  return [
    '<!-- AUTO-GENERATED — 수동 수정 금지 (DO NOT EDIT BY HAND). -->',
    `<!-- 재생성: pnpm ${scriptName} -->`,
    `<!-- 생성 시각: ${new Date().toISOString()} -->`,
    '',
  ].join('\n');
}

export function writeGenerated(relPath, content) {
  const out = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content, 'utf8');
  log(`[OK] wrote ${relPath}`);
}
