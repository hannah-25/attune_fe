// 사용자 복용 이벤트. 약물 PK 프로필과 분리 보관.
// adhd-med-graph prototype/dose-events.js의 1:1 TS 포팅.
//
// doseEvent = 구체적 복용: { medicationId, amountMg, takenAtHour, source }

import type { DoseEvent, DoseEventSource } from './types';

/** 단일 구체 복용 이벤트 생성. */
export function createDoseEvent({
  medicationId,
  amountMg,
  takenAtHour,
  source = 'scheduled',
}: {
  medicationId: string;
  amountMg: number;
  takenAtHour: number;
  source?: DoseEventSource;
}): DoseEvent {
  return { medicationId, amountMg, takenAtHour, source };
}

/**
 * 반복 스케줄을 농도 계산 전에 구체 이벤트 목록으로 전개한다(저수준 함수에
 * 다회 복용을 숨기지 않는다 — module-rules).
 */
export function expandSchedule({
  medicationId,
  amountMg,
  firstHour,
  intervalHours,
  count,
  source = 'scheduled',
}: {
  medicationId: string;
  amountMg: number;
  firstHour: number;
  intervalHours: number;
  count: number;
  source?: DoseEventSource;
}): DoseEvent[] {
  const events: DoseEvent[] = [];
  for (let i = 0; i < count; i += 1) {
    events.push(
      createDoseEvent({
        medicationId,
        amountMg,
        takenAtHour: firstHour + i * intervalHours,
        source,
      }),
    );
  }
  return events;
}

/** 실제 농도에 기여하는 복용 이벤트(skipped 제외). */
export function activeDoseEvents(doseEvents: DoseEvent[]): DoseEvent[] {
  return doseEvents.filter((e) => e.source !== 'skipped' && e.amountMg > 0);
}
