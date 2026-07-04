// PK 모델 타입 정의. adhd-med-graph 프로토타입(pk-profiles.js / concentration-series.js)
// 구조와 attune-porting-spec.md §2를 1:1로 옮긴 것.
//
// 약물/제형 메타데이터(PkProfile)와 사용자 복용 이벤트(DoseEvent)는 분리한다.

export type PkReleaseProfile = 'immediate' | 'oros-dual' | 'er-capsule' | 'simple';

export type PkModelKind = 'same-day-curve' | 'accumulation';

export type PkEvidence = {
  source: string;
  url?: string;
  type: string;
  confidence: 'high' | 'medium' | 'low';
  note?: string;
};

/** 약물/제형 PK 메타데이터. 반감기·방출 파라미터·근거 등. */
export type PkProfile = {
  id: string;
  brandName: string;
  displayName: string;
  genericName: string;
  drugClass?: string;
  releaseProfile: PkReleaseProfile;
  modelKind: PkModelKind;
  halfLifeHours: number;

  // 표시/효과 주석 (교육용 칩).
  peakTimeHours: number;
  effectStartHours: number;
  effectEndHours: number;

  // pharmacokinetics.ts가 쓰는 방출 모델.
  release: {
    irFraction: number;
    ir: { rate: number };
    er: { tLagHours: number; scaleHours: number; shape: number };
  };

  // 모델 보정 기준값 (근거 기준 용량).
  reference: {
    calibrationDoseMg: number;
    cmaxNgPerMl: number | null;
    tmaxHours: number;
    aucNgHPerMl: number;
  };

  // 누적형(accumulation) 약물의 주 단위 효과 누적 앵커.
  effectAccrual?: { onsetWeeks: number; stabilizeWeeks: number };

  metabolismNote?: string;
  safetyCaveat?: string;
  evidence: PkEvidence[];
};

/** 사용자 복용 이벤트. PkProfile과 분리 보관. */
export type DoseEventSource = 'scheduled' | 'taken' | 'skipped' | 'adjusted';

export type DoseEvent = {
  medicationId: string;
  amountMg: number;
  takenAtHour: number;
  source: DoseEventSource;
};

/** 그래프 시간 범위와 샘플 간격. */
export type SamplingGrid = {
  startHour: number;
  endHour: number;
  stepMinutes: number;
};

export type ConcentrationPoint = {
  hour: number;
  /** 추정 ng/mL (절대) */
  raw: number;
  /** 이 구간 peak raw 대비 % */
  percent: number;
};

export type ConcentrationComponentPoint = { hour: number; raw: number };

export type ConcentrationSeries = {
  series: ConcentrationPoint[];
  components: { ir: ConcentrationComponentPoint[]; er: ConcentrationComponentPoint[] };
  stats: { cmaxRaw: number; tmaxHour: number; peakHour: number };
};

export type EffectAccrualPoint = { week: number; percent: number };
