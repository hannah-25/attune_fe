// scripts/agent/check-docs.mjs
// 마크다운 문서의 깨진 상대 링크를 검사. 외부 URL(http/https), 앵커(#)는 건너뜀.
// 실패 시 깨진 링크 목록과 다음 행동을 출력하고 종료 코드 1.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, walk, rel, fail, log } from './_lib.mjs';

const SCAN_DIRS = ['docs', 'guidelines'];
const ROOT_DOCS = ['AGENTS.md', 'ARCHITECTURE.md', 'CLAUDE.md', 'README.md'];

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

const mdFiles = [];
for (const d of SCAN_DIRS) {
  const dir = path.join(ROOT, d);
  if (fs.existsSync(dir)) walk(dir, ['.md'], mdFiles);
}
for (const f of ROOT_DOCS) {
  const full = path.join(ROOT, f);
  if (fs.existsSync(full)) mdFiles.push(full);
}

const broken = [];
let checked = 0;

for (const file of mdFiles) {
  const text = fs.readFileSync(file, 'utf8');
  LINK_RE.lastIndex = 0; // 파일마다 전역 정규식 상태 초기화(방어)
  let m;
  while ((m = LINK_RE.exec(text))) {
    let target = m[1].trim();
    if (!target || target.startsWith('http://') || target.startsWith('https://')) continue;
    if (target.startsWith('#') || target.startsWith('mailto:')) continue;
    target = target.split('#')[0].split('?')[0]; // 앵커/쿼리 제거
    if (!target) continue;
    checked++;
    // GitHub 마크다운은 리포 루트 기준 절대경로(/docs/...)를 허용 → ROOT 기준 해석.
    const resolved = target.startsWith('/')
      ? path.join(ROOT, target)
      : path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      broken.push(`${rel(file)} → ${m[1]}`);
    }
  }
}

log(`[check-docs] ${mdFiles.length}개 문서, ${checked}개 상대링크 검사.`);

if (broken.length) {
  fail(
    `깨진 상대 링크 ${broken.length}개:\n  - ${broken.join('\n  - ')}`,
    '링크 대상 파일을 만들거나 경로를 고치세요. 문서 삭제 시 deprecated 표기 + 대체 링크를 남기세요.',
  );
}

log('[OK] 깨진 상대 링크 없음.');
