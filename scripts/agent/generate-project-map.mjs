// scripts/agent/generate-project-map.mjs
// src/ 트리 + 라우트 + 페이지 도메인을 스캔해 docs/generated/project-map.md 생성.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walk, rel, generatedBanner, writeGenerated, log } from './_lib.mjs';

const SRC = path.join(ROOT, 'src');

function countByDir() {
  const files = walk(SRC, ['.ts', '.tsx']);
  const buckets = {};
  for (const f of files) {
    const r = rel(f);
    const parts = r.split('/'); // src/<a>/<b>/...
    const key = parts.slice(0, 3).join('/');
    buckets[key] = (buckets[key] ?? 0) + 1;
  }
  return { files, buckets };
}

function pageDomains() {
  const pagesDir = path.join(SRC, 'pages');
  try {
    return fs
      .readdirSync(pagesDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .sort();
  } catch {
    return [];
  }
}

function apiModules() {
  const apiDir = path.join(SRC, 'app', 'api');
  try {
    return fs
      .readdirSync(apiDir)
      .filter(n => n.endsWith('.ts'))
      .map(n => n.replace(/\.ts$/, ''))
      .sort();
  } catch {
    return [];
  }
}

const { files, buckets } = countByDir();
const domains = pageDomains();
const apis = apiModules();

const lines = [];
lines.push(generatedBanner('generate:project-map'));
lines.push('# Project Map (생성됨)');
lines.push('');
lines.push(`- 총 TS/TSX 파일: **${files.length}**`);
lines.push(`- 페이지 도메인: **${domains.length}**`);
lines.push(`- API 클라이언트 모듈: **${apis.length}**`);
lines.push('');
lines.push('## 디렉터리별 파일 수 (src 하위 2-depth)');
lines.push('');
lines.push('| 경로 | 파일 수 |');
lines.push('|------|--------:|');
for (const [k, v] of Object.entries(buckets).sort((a, b) => b[1] - a[1])) {
  lines.push(`| \`${k}\` | ${v} |`);
}
lines.push('');
lines.push('## 페이지 도메인 (`src/pages/*`)');
lines.push('');
lines.push(domains.map(d => `- \`${d}\``).join('\n') || '_(없음)_');
lines.push('');
lines.push('## API 클라이언트 모듈 (`src/app/api/*`)');
lines.push('');
lines.push(apis.map(a => `- \`${a}\``).join('\n') || '_(없음)_');
lines.push('');

writeGenerated('docs/generated/project-map.md', lines.join('\n'));
log('[DONE] project-map 생성 완료. 변경분이 있으면 커밋하세요.');
