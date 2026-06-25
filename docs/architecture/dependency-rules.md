# 의존성 규칙

## 허용된 의존 방향

```
pages / components
      ↓ (도메인 함수만)
api/*  ──→  api/client.ts
                 ↓
        offline/*   mocks/*
                 ↓
            lib/  types/
```

## 규칙

1. 🟡 `pages/*`, `components/*` → `api/*` 함수만 호출. `offline/*`, `mocks/*`를 직접 import 하지 않는다.
2. 🟡 `api/*` → `api/client.ts`만 거쳐 네트워크에 접근. 페이지를 import 하지 않는다(역방향 금지).
3. 🟡 `offline/*`, `mocks/*` → `pages/*`, `components/*`를 import 하지 않는다(상향 금지).
4. 🟡 `lib/*`, `types/*`는 어디서나 import 가능하되, 다른 계층을 import 하지 않는다(말단).
5. 🟢 순환 import는 빌드/번들에서 문제를 일으키므로 금지. (현재 정적 검사 미도입 → SOFT, 빌드 경고로 일부 감지)

## 검증 (현재 / 목표)

- **현재**: 컨벤션 + 코드 리뷰(SOFT). `pnpm typecheck`/`pnpm build`가 명백한 깨짐만 잡는다.
- **목표**: `dependency-cruiser`로 위 방향을 CI에서 강제(🟢 승격). 계획: [tech-debt-tracker](../exec-plans/tech-debt-tracker.md).

> 빠른 수동 점검: 페이지에서 `from '../offline'`/`from '../mocks'`/`fetch(`/`localStorage.getItem('access_token'` 검색 시 위반 후보.
