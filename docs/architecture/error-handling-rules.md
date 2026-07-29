# 에러 처리 규칙

## 계층별 책임

| 계층 | 처리 |
|------|------|
| `client.ts` | 401 재발급, 네트워크/5xx 폴백, `ApiError` 생성 |
| `api/*` | 도메인 의미로 에러 변환(필요 시). 그대로 throw도 허용 |
| pages/components | 사용자에게 보여줄 메시지/상태로 변환, 재시도 UX |

## 규칙

1. 🟢 네트워크/HTTP 에러는 `ApiError`로 표준화되어 던져진다. `err instanceof ApiError`로 분기.
2. 🟡 사용자에게는 `ApiError.backendMessage`가 있으면 우선 노출, 없으면 일반 메시지(toast: `sonner`).
3. 🟡 오프라인 폴백으로 응답이 온 경우와 실제 성공을 구분이 필요하면 `OfflineIndicator` 등 UI로 알린다.
4. 🟡 `AbortError`(요청 취소)는 사용자 에러로 표시하지 않는다(`client.ts`가 그대로 rethrow).
5. 🟡 예측 가능한 빈 상태는 에러가 아니라 `pages/empty/*` 화면으로 처리.
6. 🟡 디버그 로그는 `import.meta.env.DEV` 가드, 운영에서 토큰/PII 출력 금지.

## 안티패턴

- ❌ 페이지에서 try/catch 후 에러를 삼키고 빈 화면만 보여주기 → 최소한 toast/재시도 제공.
- ❌ 도메인마다 401 재시도 직접 구현 → `client.ts`가 담당.
