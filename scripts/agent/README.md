# scripts/agent

AI 에이전트와 사람이 **명령어를 추측하지 않도록** 표준화한 진입점 모음.
모든 스크립트는 cross-platform Node ESM(`.mjs`)이며 `pnpm <script>`로 호출한다.

| 명령 | 목적 | 부수효과 |
|------|------|----------|
| `pnpm install --frozen-lockfile` | 의존성 설치 (bootstrap) | `node_modules/` |
| `pnpm dev` | 로컬 실행 (Vite, `:3000`) | 없음 |
| `pnpm build` | 프로덕션 번들 | `dist/` |
| `pnpm typecheck` | 타입 검사 (`tsc --noEmit`) | 없음 |
| `pnpm verify` | 타입체크 + 빌드 + 문서검사 묶음 게이트 | `dist/` |
| `pnpm check-docs` | 마크다운 깨진 상대링크 검사 | 없음 |
| `pnpm generate:project-map` | `docs/generated/project-map.md` 재생성 | 문서 1개 덮어씀 |
| `pnpm generate:api-index` | `docs/generated/api-index.md` 재생성 | 문서 1개 덮어씀 |
| `pnpm generate:all` | 위 generate 전부 | 문서 덮어씀 |

## 원칙

- 실패 시 **원인 + 다음 행동**을 stderr에 출력하고 비정상 종료 코드(`1`)로 끝낸다.
- secret이 필요하면 **예시 파일만** 만든다. 실제 secret은 커밋·출력하지 않는다.
- destructive(운영 영향) 명령은 이 디렉터리에 두지 않는다. 배포는 `.github/workflows/`가 담당.
- `generate:*`는 `docs/generated/` 파일을 **덮어쓴다**. 이 파일들은 수동 수정 금지(상단 배너 참고).

## 아직 soft-rule (tech-debt)

lint / format / unit-test / 의존성 그래프 검사는 아직 설치/강제하지 않는다.
계획은 [`docs/exec-plans/tech-debt-tracker.md`](../../docs/exec-plans/tech-debt-tracker.md) 참고.
