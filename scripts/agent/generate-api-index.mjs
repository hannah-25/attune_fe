// scripts/agent/generate-api-index.mjs
// src/app/api/*.ts 의 export 함수와 호출 경로(apiRequest('/v1/...'))를 추출해
// docs/generated/api-index.md 생성. 정규식 기반의 best-effort 인덱스.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, rel, generatedBanner, writeGenerated, log } from './_lib.mjs';

const API_DIR = path.join(ROOT, 'src', 'app', 'api');

function listApiFiles() {
  try {
    return fs
      .readdirSync(API_DIR)
      .filter(n => n.endsWith('.ts'))
      .sort();
  } catch {
    return [];
  }
}

const EXPORT_FN = /export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g;
const EXPORT_CONST_FN = /export\s+const\s+([A-Za-z0-9_]+)\s*=\s*(?:async\s*)?\(/g;
const PATH_RE = /apiRequest<[^>]*>\(\s*[`'"]([^`'"]+)[`'"]|apiRequest\(\s*[`'"]([^`'"]+)[`'"]/g;
const METHOD_RE = /method:\s*['"]([A-Z]+)['"]/;

const files = listApiFiles();
const lines = [];
lines.push(generatedBanner('generate:api-index'));
lines.push('# API Index (생성됨)');
lines.push('');
lines.push('`src/app/api/*.ts` 에서 추출한 export 함수와 호출 경로 목록 (best-effort).');
lines.push('정확한 요청/응답 스키마는 [`openapi/`](../../openapi) 와 [`guidelines/api-guide/`](../../guidelines/api-guide) 참고.');
lines.push('');

for (const file of files) {
  if (file === 'client.ts') continue; // 공통 클라이언트는 별도
  const full = path.join(API_DIR, file);
  const text = fs.readFileSync(full, 'utf8');

  const fns = new Set();
  let m;
  while ((m = EXPORT_FN.exec(text))) fns.add(m[1]);
  while ((m = EXPORT_CONST_FN.exec(text))) fns.add(m[1]);

  const paths = new Set();
  while ((m = PATH_RE.exec(text))) paths.add(m[1] ?? m[2]);

  lines.push(`## \`${file}\``);
  lines.push('');
  lines.push(`소스: \`${rel(full)}\``);
  lines.push('');
  lines.push(`- export 함수 (${fns.size}): ${[...fns].map(f => `\`${f}\``).join(', ') || '_(없음)_'}`);
  const methodGuess = text.match(METHOD_RE)?.[1];
  lines.push(`- 호출 경로 (${paths.size}): ${[...paths].map(p => `\`${p}\``).join(', ') || '_(추출 실패 — 동적 경로일 수 있음)_'}`);
  if (methodGuess) lines.push(`- 감지된 메서드 예: \`${methodGuess}\``);
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push(`총 ${files.length - (files.includes('client.ts') ? 1 : 0)} 개 API 모듈.`);
lines.push('공통 요청 규약(인증 헤더, `/api/`→`/v1/` 정규화, 401 재발급, 오프라인 폴백)은 `src/app/api/client.ts` 참고.');
lines.push('');

writeGenerated('docs/generated/api-index.md', lines.join('\n'));
log('[DONE] api-index 생성 완료.');
