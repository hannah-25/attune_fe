# AGENTS.md — a.tune 프론트엔드 작업 지도

> 이 파일은 **지도**다. 규칙 전문이 아니라, 어디를 봐야 하는지를 가리킨다.
> 상세 지식은 [`docs/`](docs/README.md) 아래에 있다. 항상 코드가 문서보다 우선이다.

## 프로젝트 한 줄 요약

ADHD 약물 복용 추적 + 일지 모바일 웹앱(PWA). React 18 + TypeScript + Vite + Tailwind v4.
**오프라인-퍼스트**(Dexie/IndexedDB)와 **게스트 모드**가 핵심 특성이다.

## 기술 스택 요약

- React 18 + TypeScript (strict), Vite 6, Tailwind CSS v4
- React Router 7 (SPA, `<AppViewport>` 셸)
- MUI + Radix UI 일부 컴포넌트
- 데이터: REST API + Dexie(IndexedDB) 오프라인 캐시/큐 + 게스트 목
- 패키지 매니저: **pnpm** (`pnpm-lock.yaml` 고정)
- 배포: GitHub Actions → AWS S3 + CloudFront
- 폰트: NanumSquare (모든 페이지 inline style 적용)

## 주요 디렉터리

| 경로 | 역할 |
|------|------|
| `src/app/App.tsx` | 라우트 정의(모든 페이지 등록) |
| `src/app/api/` | REST 클라이언트(도메인별 1파일) + `client.ts`(공통 규약) |
| `src/app/offline/` | 오프라인 resolver / Dexie db / 캐시 / 동기화 큐 |
| `src/app/mocks/` | 게스트 모드 목 데이터 + resolver |
| `src/app/components/` | 공통 UI 셸(TabBar, TopBar, AppViewport 등) |
| `src/pages/<도메인>/` | 도메인별 화면 (auth, home, journal, medication, calendar, report, counseling, community, settings, onboarding, admin, empty) |
| `src/app/lib/`, `src/app/hooks/` | 순수 유틸 / 공통 훅 |
| `src/types/` | 전역 타입 선언 |
| `guidelines/` | 디자인 원칙 + API 가이드 + DDD 노트 |
| `docs/` | 하네스 지식 저장소(본 지도가 가리키는 곳) |

전체 지도: [`docs/generated/project-map.md`](docs/generated/project-map.md) (자동 생성).

## 자주 쓰는 명령어

```bash
pnpm install --frozen-lockfile   # 부트스트랩
pnpm dev                         # 로컬 실행 (http://localhost:3000)
pnpm typecheck                   # 타입 검사 (tsc --noEmit)
pnpm build                       # 프로덕션 번들 (dist/)
pnpm verify                      # typecheck + build + check-docs 묶음 게이트
pnpm check-docs                  # 마크다운 깨진 링크 검사
pnpm generate:all                # docs/generated/* 재생성
```

스크립트 상세: [`scripts/agent/README.md`](scripts/agent/README.md).

## 작업 전 반드시 읽을 문서

1. 이 파일(AGENTS.md)
2. [`docs/agent/agent-workflow.md`](docs/agent/agent-workflow.md) — 표준 작업 루프
3. [`ARCHITECTURE.md`](ARCHITECTURE.md) — 계층 구조 한눈에
4. 작업 유형별:
   - 기능: [`docs/agent/feature-workflow.md`](docs/agent/feature-workflow.md)
   - 버그: [`docs/agent/bugfix-workflow.md`](docs/agent/bugfix-workflow.md)
   - 리팩터: [`docs/agent/refactor-workflow.md`](docs/agent/refactor-workflow.md)
   - 문서: [`docs/agent/doc-gardening-workflow.md`](docs/agent/doc-gardening-workflow.md)
5. 도메인 규칙: [`docs/architecture/`](docs/architecture/index.md)

## PR 전 체크리스트 (요약)

- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] 변경한 코드와 관련된 문서 갱신 (`docs/`, `guidelines/`)
- [ ] 아키텍처 계층 위반 없음 ([dependency-rules](docs/architecture/dependency-rules.md))
- [ ] 새 API 호출은 `client.ts` 규약(`/v1/`, `auth` 옵션, 오프라인 폴백) 준수
- [ ] secret/token을 코드·문서·커밋에 넣지 않음

전체 체크리스트: [`docs/agent/pr-review-checklist.md`](docs/agent/pr-review-checklist.md).

## 에이전트가 하면 안 되는 것

- `develop`에 직접 커밋 — 항상 새 브랜치 → PR ([GitWorkflow](guidelines/GitWorkflow.md))
- Firebase Storage 이미지 URL(외부 자산) 수정
- `.env*` 실제 값, AWS 자격증명, VAPID private key 등을 커밋·출력·문서화
- 배포 워크플로우(`.github/workflows/deploy-*.yml`)를 사용자 확인 없이 변경
- `src/app/api/client.ts`의 공통 인증/재발급/오프라인 폴백 로직을 가볍게 손대기
- `docs/generated/*` 수동 편집 (스크립트로 재생성)

## 확실하지 않을 때 사람에게 확인할 기준

- 데이터 스키마/마이그레이션, 인증·인가 정책 변경
- 오프라인 동기화 큐(쓰기 재전송) 동작 변경 — 중복/유실 위험
- 결제·개인정보·계정 삭제 등 되돌리기 어려운 흐름
- 외부에 노출되는 행위(배포, 외부 서비스 호출, 푸시 발송)
- 요구사항이 모호하거나 문서와 코드가 충돌할 때 → 코드 확인 후에도 불명확하면 질문

확실하지 않은 내용은 단정하지 말고 문서에 `ASSUMPTION:` 또는 `TODO(owner, date, reason)`로 남긴다.
