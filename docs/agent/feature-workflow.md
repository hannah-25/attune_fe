# 기능 추가 워크플로우

1. **이해**: 관련 도메인 문서([domain-overview](../product/domain-overview.md)) + 기존 화면/ API 모듈 확인.
2. **계획**: 새 화면? 새 엔드포인트? 오프라인/게스트 대응 필요? 복잡하면 exec-plan 작성.
3. **API 계층**: 새 엔드포인트는 `src/app/api/<도메인>.ts`에 함수 추가. 경로 `/v1/`, `auth` 옵션 명시, 요청/응답 타입 정의([api-rules](../architecture/api-rules.md)).
4. **오프라인/게스트**: 필요하면 `offline/resolver`·`mocks/resolver`에 경로 매핑 추가([data-rules](../architecture/data-rules.md)). 쓰기 큐 영향은 신중히.
5. **UI**: `src/pages/<도메인>/`에 화면 추가, `src/app/App.tsx`에 라우트 등록(무거우면 `lazy`). 공통 셸(`TabBar`/`TopBar`/`AppViewport`) 사용.
6. **스타일**: [Guidelines](../../guidelines/Guidelines.md)/[Patterns](../../guidelines/Patterns.md) 준수, NanumSquare 폰트.
7. **검증**: `pnpm verify`.
8. **문서**: domain-overview·라우트 표 갱신, 필요 시 `pnpm generate:all`.

## 흔한 실수

- 페이지에서 `fetch` 직접 호출(→ `api/*` 함수 사용).
- 라우트 등록 누락 → 화면이 안 뜸.
- 오프라인/게스트에서 깨짐(새 경로 매핑 누락).
- 검정 버튼을 비확정 행동에 사용.
