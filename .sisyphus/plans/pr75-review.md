# PR #75 리뷰 반영 계획

## 목표
GitHub PR #75 (오프라인 퍼스트) 리뷰 코멘트 수정 후 커밋·푸시.

## 현재 상태 파악

이전 커밋(d3f862b, a8a7ade)으로 이미 반영된 항목:
- `CACHE_PERIOD_DAYS = 90` 상수 추출 → SyncService.ts:11 ✅
- `body` 타입 가드 → resolver.ts:148-150 ✅
- `startTime`, `endTime` IndexedDB 인덱스 추가 → db.ts version 2 ✅
- `where('startTime')` 인덱스 쿼리 사용 → resolver.ts:179 ✅

아직 남은 항목 (이번 작업 대상):

---

## 작업 목록

### Step 1 — KST 날짜 버그 수정 [`SyncService.ts`]
**문제:** `toISOString().slice(0, 10)`는 UTC 기준이라 KST(UTC+9)에서 오전 9시 이전 실행 시 하루 어긋남.

**수정 위치:**
- `get3MonthRange()` 내 `startDate`, `endDate` (line 23–25)
- `cacheSchedules()` 내 `startDate`, `endDate` (line 80–81)
- `pruneOldCache()` 내 `cutoffStr` (line 121)

**수정 방법:** 파일 상단에 `toLocalDateString(date: Date)` 헬퍼 추가 후 위 3곳 전부 교체.

```typescript
function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
```

---

### Step 2 — `endTime` null TypeError 수정 [`resolver.ts:181`]
**문제:** `endTime`이 null/undefined인 일정에서 `.slice()` 호출 시 TypeError → 일정 화면 크래시.

**수정 전:**
```typescript
.filter(c => c.endTime.slice(0, 10) >= startDate)
```
**수정 후:**
```typescript
.filter(c => !c.endTime || c.endTime.slice(0, 10) >= startDate)
```

---

### Step 3 — `checked: false` 캐시 미스 수정 [`cache.ts:33`]
**문제:** `if (detail?.checked)` 조건이 `false`를 falsy로 처리 → 미체크 일지를 IndexedDB에 저장하지 않아 오프라인에서 캐시 미스 발생.

**수정 전:**
```typescript
if (detail?.checked) {
```
**수정 후:**
```typescript
if (detail && detail.checked !== undefined) {
```

---

### Step 4 — `scheduleDetails` 전체 삭제 제거 [`SyncService.ts:94`]
**문제:** `cacheSchedules()` 실행마다 `db.scheduleDetails.clear()` 호출 → 사용자가 이전에 조회해 캐싱된 상세 정보까지 삭제 → 오프라인 상세 화면 캐시 미스.

**수정:** `db.scheduleDetails.clear()` 라인 제거. `schedules` 목록만 교체.

```typescript
// 수정 전 (transaction 내부)
await db.schedules.clear();
await db.scheduleDetails.clear();   // ← 이 줄 제거
await db.schedules.bulkPut(...)

// transaction 스코프도 scheduleDetails 제거
await db.transaction('rw', db.schedules, async () => {
```

---

### Step 5 — 타이머 레이스 컨디션 수정 [`OfflineIndicator.tsx:31-34`]
**문제:** `handleComplete`가 연속 호출 시 이전 타이머를 정리하지 않아 stale 타이머가 `idle`로 조기 전환.

**수정 전:**
```typescript
const handleComplete = () => {
  setSyncState('complete');
  timer = setTimeout(() => setSyncState('idle'), 2000);
};
```
**수정 후:**
```typescript
const handleComplete = () => {
  setSyncState('complete');
  clearTimeout(timer);
  timer = setTimeout(() => setSyncState('idle'), 2000);
};
```

---

### Step 6 — `endTime` 인덱스 활용 개선 [`resolver.ts:173-183`]
**현황:** `startTime` 인덱스로 1차 필터링 후, `endTime`은 메모리에서 필터링 중.
`endTime` 인덱스가 이미 db.ts에 정의되어 있으나 쿼리에서 미사용.

**개선 방법:** 두 인덱스를 각각 쿼리하여 primaryKey 교집합으로 처리.

```typescript
// startTime ≤ endDate 이고 endTime ≥ startDate 인 레코드를 각 인덱스로 조회
const byStart = await db.schedules
  .where('startTime').belowOrEqual(endDate + 'T23:59:59')
  .primaryKeys();
const byEnd = await db.schedules
  .where('endTime').aboveOrEqual(startDate)
  .primaryKeys();

const startSet = new Set(byStart);
const matchIds = byEnd.filter(k => startSet.has(k));

const results = (await db.schedules.bulkGet(matchIds))
  .filter((c): c is NonNullable<typeof c> => c != null);

return { schedules: results.map(c => c.data) } as T;
```

> **주의:** `endTime`이 null인 일정은 Step 2에서 처리되지만, `where('endTime').aboveOrEqual(startDate)` 인덱스 쿼리는 null/undefined 값을 자동으로 제외하므로 null 일정은 `byEnd` 목록에 포함되지 않는다. null endTime을 가진 일정도 포함해야 한다면 별도 처리 필요.

---

## 수정 순서

1. `SyncService.ts` — Step 1 (KST 날짜) + Step 4 (scheduleDetails clear 제거) 동시
2. `resolver.ts` — Step 2 (endTime null) + Step 6 (인덱스 활용) 동시
3. `cache.ts` — Step 3 (checked false)
4. `OfflineIndicator.tsx` — Step 5 (타이머)

## 커밋 전략

단계별 커밋 1개:
```
refactor: PR #75 리뷰 반영 (6번~) — KST 날짜 버그·캐시 미스·레이스 컨디션 수정
```

## 완료 기준
- [ ] `toLocalDateString` 헬퍼 적용 (SyncService.ts 3곳)
- [ ] `endTime` null 안전 처리 (resolver.ts)
- [ ] `checked: false` 캐시 저장 (cache.ts)
- [ ] `scheduleDetails.clear()` 제거 (SyncService.ts)
- [ ] `clearTimeout(timer)` 추가 (OfflineIndicator.tsx)
- [ ] `endTime` 인덱스 활용 쿼리 (resolver.ts)
