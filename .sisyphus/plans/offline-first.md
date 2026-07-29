# 오프라인 퍼스트 PWA 구현 계획

## 요구사항 요약

- 로그인한 사용자도 오프라인에서 읽기/쓰기 가능
- 온라인 전환 시 서버와 자동 동기화 (타임스탬프 기반, 최신 우선)
- 캐싱 범위: 최근 3개월 롤링 윈도우
- 오프라인 지원 기능: 일지, 복약 기록, 캘린더/일정, 리포트(읽기), 상담
- 기존 Guest Mode는 변경 없이 유지
- SyncService는 Flutter 재활용을 위해 UI/스토리지와 완전 분리

## 수락 기준

- [ ] 오프라인 상태에서 일지 읽기/쓰기 동작
- [ ] 오프라인 상태에서 복약 기록 확인/기록 동작
- [ ] 오프라인 상태에서 캘린더 일정 조회/추가 동작
- [ ] 오프라인 상태에서 리포트 조회 동작
- [ ] 오프라인 상태에서 상담 조회 동작
- [ ] 온라인 전환 시 대기 중인 쓰기가 서버로 자동 동기화
- [ ] 타임스탬프 충돌 시 최신 데이터 우선 적용
- [ ] 앱 재진입 시 3개월 캐시 자동 갱신 (온라인일 때)
- [ ] 3개월 초과 캐시 자동 삭제
- [ ] 오프라인 상태 UI 표시

---

## 아키텍처 개요

```
[React 페이지]
      ↓
[domain API 함수] (journal.ts, medication.ts, ...)
      ↓
[client.ts - apiRequest()]
      ├─ isGuestMode() → resolver.ts (기존, 변경 없음)
      ├─ !navigator.onLine → offline/resolver.ts (Dexie 읽기 / SyncQueue 쓰기)
      └─ navigator.onLine → fetch() → 응답을 Dexie에 캐싱

[SyncService]
  ├─ 앱 로드 시 3개월 데이터 fetch → Dexie 저장
  ├─ online 이벤트 감지 → SyncQueue flush
  ├─ 타임스탬프 충돌 해결
  └─ 3개월 초과 데이터 삭제

[Dexie.js - IndexedDB]
  ├─ journals
  ├─ activeTags
  ├─ medications / medicationLogs
  ├─ schedules
  ├─ reports
  ├─ consultations
  └─ syncQueue (대기 중인 쓰기)
```

---

## 구현 단계

### Phase 1: Dexie DB 스키마 설계 (Foundation)

**새 파일: `src/app/offline/db.ts`**

```typescript
// 테이블 정의
journals           // key: date (YYYY-MM-DD), value: JournalDetail + cachedAt
journalDates       // key: yearMonth, value: string[] (날짜 목록)
activeTags         // key: 'tags', value: JournalActiveTags + cachedAt
medications        // key: medicationId, value: Medication + cachedAt
medicationLogs     // key: date, value: MedicationLog[] + cachedAt
schedules          // key: id, value: Schedule + cachedAt
reports            // key: `${type}-${period}`, value: Report + cachedAt
consultations      // key: sessionId, value: ConsultationSession + cachedAt
syncQueue          // key: auto-increment, value: SyncItem
```

**SyncItem 구조:**
```typescript
{
  id: number;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  localTimestamp: string; // ISO 8601
  retryCount: number;
  status: 'pending' | 'failed';
}
```

설치: `npm install dexie`

---

### Phase 2: SyncService 구현

**새 파일: `src/app/offline/SyncService.ts`**

**책임:**
1. **초기 캐싱** — 앱 로드 + 로그인 후 3개월 데이터 일괄 fetch → Dexie 저장
2. **온라인 감지** — `window.addEventListener('online')` + `navigator.onLine`
3. **SyncQueue flush** — 온라인 전환 시 pending 항목 순서대로 서버 전송
4. **충돌 해결** — 서버 응답의 `updatedAt` vs SyncItem의 `localTimestamp` 비교 → 최신 우선
5. **롤링 윈도우 정리** — 3개월 초과 캐시 삭제

**초기 캐싱 범위:**
```
journals:      today-90d ~ today
activeTags:    최신 1회
medications:   전체 목록
medicationLogs: today-90d ~ today
schedules:     today-90d ~ today+90d (일정은 미래도 포함)
reports:       최근 3개 (월간)
consultations: 최근 3세션
```

**SyncQueue flush 로직:**
```
for each item in syncQueue (order by id asc):
  try:
    response = await fetch(item.path, item.method, item.body)
    if success: delete from syncQueue
    if 409 conflict:
      if response.updatedAt > item.localTimestamp: discard local (delete from queue)
      else: retry with local data
  catch network error: stop, retry on next online event
```

---

### Phase 3: 오프라인 리졸버 구현

**새 파일: `src/app/offline/resolver.ts`**

기존 `mocks/resolver.ts` 패턴과 동일하게 path + method로 분기.

**읽기 (GET):** Dexie에서 조회 → 없으면 `OfflineCacheMissError` throw  
**쓰기 (POST/PUT/PATCH/DELETE):**
1. Dexie에 즉시 반영 (optimistic update)
2. syncQueue에 추가
3. UI가 바로 응답받도록 로컬 결과 반환

**지원 경로:**
```
GET  /v1/journals/:date              → db.journals.get(date)
GET  /v1/journals?startDate&endDate  → db.journals.where(date range)
GET  /v1/journals/dates?...          → db.journalDates.get(yearMonth)
GET  /v1/journals/tags?category=...  → db.activeTags.get('tags')
POST /v1/journals/tags/:id/checks    → optimistic + syncQueue
DELETE /v1/journals/tags/:id/checks  → optimistic + syncQueue
... (복약, 일정, 리포트, 상담 동일 패턴)
```

---

### Phase 4: client.ts 수정

**수정 파일: `src/app/api/client.ts`**

`apiRequest()` 함수에 오프라인 분기 추가:

```typescript
export async function apiRequest<T>(path, options): Promise<T> {
  const normalizedPath = normalizePath(path);

  // 기존: Guest Mode
  if (isGuestMode() && !shouldBypassGuestMock(normalizedPath)) {
    const { resolveGuestRequest } = await import('../mocks/resolver');
    return resolveGuestRequest<T>(normalizedPath, options);
  }

  // 신규: 오프라인 모드
  if (!navigator.onLine) {
    const { resolveOfflineRequest } = await import('../offline/resolver');
    return resolveOfflineRequest<T>(normalizedPath, options);
  }

  // 기존: 온라인 fetch
  const result = await fetchOnline<T>(path, options);

  // 신규: 응답 캐싱 (읽기 요청만)
  if (!options.method || options.method === 'GET') {
    await cacheApiResponse(normalizedPath, result);
  }

  return result;
}
```

**`cacheApiResponse()` 구현:**
- path 패턴 매칭으로 해당 Dexie 테이블에 저장
- 실패해도 조용히 무시 (캐싱 실패가 API 요청을 막아선 안 됨)

---

### Phase 5: 앱 초기화 연결

**수정 파일: `src/app/App.tsx`**

```typescript
// 로그인 후 SyncService 초기화
useEffect(() => {
  if (isLoggedIn && navigator.onLine) {
    SyncService.initialize(); // 3개월 캐시 fetch
  }
}, [isLoggedIn]);
```

---

### Phase 6: 오프라인 UI 인디케이터

**새 파일: `src/components/OfflineIndicator.tsx`**

- `navigator.onLine` 상태 구독
- 오프라인 시: 상단 배너 "오프라인 상태 · 작업은 저장됩니다"
- 동기화 중: "동기화 중..." (syncQueue.count > 0 && online)
- 동기화 완료: "동기화 완료" (2초 후 사라짐)

**수정 파일: `src/app/components/AppViewport.tsx`**  
- `<OfflineIndicator />` 삽입

---

## 리스크 및 대응

| 리스크 | 대응 |
|--------|------|
| 서버 응답에 `updatedAt` 없는 엔드포인트 | 로컬 timestamp 단독 사용, 서버 우선으로 폴백 |
| SyncQueue 항목 영구 실패 (서버 400) | retryCount >= 3 이면 'failed' 상태로 표시, UX에서 알림 |
| 오프라인 중 태그 ID 충돌 (신규 생성) | 임시 음수 ID 사용, 서버 응답으로 교체 |
| Dexie 스키마 변경 시 마이그레이션 | Dexie version() API로 마이그레이션 처리 |
| 3개월치 초기 fetch가 느릴 수 있음 | 백그라운드로 실행, 우선순위: 오늘 데이터 먼저 |

---

## 구현 순서 (의존성 기준)

```
1. npm install dexie
2. src/app/offline/db.ts          (스키마)
3. src/app/offline/SyncService.ts  (캐시 관리 + sync)
4. src/app/offline/resolver.ts     (오프라인 리졸버)
5. src/app/api/client.ts           (오프라인 분기 + 캐싱)
6. src/app/App.tsx                 (SyncService 초기화)
7. src/components/OfflineIndicator.tsx (UI)
8. src/app/components/AppViewport.tsx  (OfflineIndicator 연결)
```

---

## 검증 시나리오

1. 온라인에서 앱 열기 → 3개월 캐시 확인 (DevTools > IndexedDB)
2. 네트워크 차단 → 일지 페이지 진입 → 데이터 표시 확인
3. 네트워크 차단 → 복약 기록 → SyncQueue 항목 확인
4. 네트워크 복원 → SyncQueue 자동 flush → 서버 반영 확인
5. 두 기기에서 같은 날짜 일지 수정 후 동기화 → 최신 타임스탬프 우선 확인
