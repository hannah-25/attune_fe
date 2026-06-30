// 약물/제형 PK 메타데이터 fallback 상수. 사용자 복용 이벤트와 분리.
// adhd-med-graph prototype/pk-profiles.js의 1:1 포팅(수치·근거 동일).
//
// BE가 medication_pk_profiles(pkProfile)를 내려주기 전까지 FE가 보유하는 정본.
// BE 준비 시 resolve-profile에서 API 값을 우선 사용하도록 교체한다.
// 수치 근거·가정·한계는 adhd-med-graph docs/product/pk-model-principles.md 참고.

import type { PkProfile } from './types';

export const concertaOros: PkProfile = {
  id: 'concerta-oros',
  brandName: '콘서타',
  displayName: '콘서타 서방정',
  genericName: 'methylphenidate',
  releaseProfile: 'oros-dual',
  modelKind: 'same-day-curve',
  halfLifeHours: 3.5,

  peakTimeHours: 6.8,
  effectStartHours: 1,
  effectEndHours: 12.5,

  release: {
    irFraction: 0.22,
    ir: { rate: 3.0 },
    er: { tLagHours: 1.5, scaleHours: 4.25, shape: 1.75 },
  },

  reference: {
    calibrationDoseMg: 18,
    cmaxNgPerMl: 3.7,
    tmaxHours: 6.8,
    aucNgHPerMl: 41.8,
  },

  evidence: [
    {
      source: 'FDA Concerta label (2023, 021121s049)',
      url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/021121s049lbl.pdf',
      type: 'regulatory-label',
      confidence: 'high',
      note: '18 mg single dose: Cmax 3.7 ± 1.0 ng/mL, Tmax 6.8 ± 1.8 h, AUCinf 41.8 ± 13.9, t½ 3.5 ± 0.4 h. No accumulation on repeat dosing.',
    },
    {
      source: 'Kimko et al. 2016, PLOS One (PBPK / Weibull ER release model), doi:10.1371/journal.pone.0164641',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0164641',
      type: 'model-form-reference',
      confidence: 'medium',
      note: 'Methodology only (ER release modeled as a Weibull function); not a validation/calibration data source. Calibration numbers come from the FDA label above.',
    },
  ],
};

// 속방형 메틸페니데이트(예: 리탈린 / 페니드 속방정).
export const methylphenidateIr: PkProfile = {
  id: 'methylphenidate-ir',
  brandName: '페니드',
  displayName: '메틸페니데이트 속방정',
  genericName: 'methylphenidate',
  releaseProfile: 'immediate',
  modelKind: 'same-day-curve',
  halfLifeHours: 3.0,

  peakTimeHours: 1.5,
  effectStartHours: 0.5,
  effectEndHours: 4,

  release: {
    irFraction: 1.0,
    ir: { rate: 1.45 },
    er: { tLagHours: 0, scaleHours: 1, shape: 1 },
  },

  reference: {
    calibrationDoseMg: 10,
    cmaxNgPerMl: 4.1,
    tmaxHours: 1.5,
    aucNgHPerMl: 25.3,
  },

  evidence: [
    {
      source: 'FDA methylphenidate HCl IR tablet label (DailyMed)',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2bfb390f-ba99-4d21-8a9e-50fa8ec217c0',
      type: 'regulatory-label',
      confidence: 'high',
      note: '5 mg TID: Cmax 4.2 ± 1.0 ng/mL, AUCinf 38.0 ± 11.0 ng·h/mL, t½ 3.0 ± 0.5 h, initial Tmax1 ~1.5 h.',
    },
  ],
};

// 메디키넷 리타드 — 50% IR + 50% ER 메틸페니데이트 캡슐.
export const medikinetRetard: PkProfile = {
  id: 'methylphenidate-medikinet',
  brandName: '메디키넷 리타드',
  displayName: '메디키넷 리타드',
  genericName: 'methylphenidate',
  releaseProfile: 'er-capsule',
  modelKind: 'same-day-curve',
  halfLifeHours: 3.2,

  peakTimeHours: 2.75,
  effectStartHours: 1,
  effectEndHours: 8,

  release: {
    irFraction: 0.5,
    ir: { rate: 1.2 },
    er: { tLagHours: 0, scaleHours: 2.25, shape: 1.75 },
  },

  reference: {
    calibrationDoseMg: 20,
    cmaxNgPerMl: 6.4,
    tmaxHours: 2.75,
    aucNgHPerMl: 48.9,
  },

  evidence: [
    {
      source: 'Medikinet XL modified-release capsules SmPC (EMA/emc)',
      url: 'https://www.medicines.org.uk/emc/product/313/smpc',
      type: 'regulatory-label',
      confidence: 'high',
      note: 'Single 20 mg after breakfast: Cmax 6.4 ng/mL, Tmax 2.75 h, AUC 48.9 ng·h/mL, t½ 3.2 h; 50% IR + 50% ER, initial peak then 3–4 h plateau.',
    },
  ],
};

// 아토목세틴(스트라테라 외 국내 동일 성분) — 비자극제 NRI. 누적형:
// 혈중은 며칠 내 정상상태, 임상 효과는 주 단위로 쌓인다. 당일 단일곡선 대신
// 효과 누적(주 단위) 곡선을 정규화(%)로 표시한다.
export const atomoxetine: PkProfile = {
  id: 'atomoxetine',
  brandName: '스트라테라',
  displayName: '아토목세틴 캡슐',
  genericName: 'atomoxetine',
  drugClass: 'non-stimulant',
  releaseProfile: 'immediate',
  modelKind: 'accumulation',
  halfLifeHours: 5.2,

  peakTimeHours: 1.5,
  effectStartHours: 0.5,
  effectEndHours: 24,
  effectAccrual: { onsetWeeks: 4, stabilizeWeeks: 20 },

  release: {
    irFraction: 1.0,
    ir: { rate: 1.9 },
    er: { tLagHours: 0, scaleHours: 1, shape: 1 },
  },

  reference: {
    calibrationDoseMg: 40,
    cmaxNgPerMl: null,
    tmaxHours: 1.5,
    aucNgHPerMl: 100,
  },

  metabolismNote: 'CYP2D6 저대사자(PM)는 반감기 ~21.6h로 노출이 크게 증가한다(EM ~5.2h).',

  evidence: [
    {
      source: 'Strattera (atomoxetine) FDA label — Pharmacokinetics',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=309de576-c318-404a-bc15-660c2b1876fb',
      type: 'regulatory-label',
      confidence: 'high',
      note: 'Tmax 1–2 h; half-life 5.2 h (EM) / 21.6 h (PM); F 63%/94%; CYP2D6. 라벨에 단일용량 Cmax/AUC 절대값 없음 → 일일 곡선은 정규화 표시.',
    },
    {
      source: 'Time course of improvement on atomoxetine (Canadian open-label), PMC3120776',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3120776/',
      type: 'peer-reviewed',
      confidence: 'medium',
      note: '개선 중앙값 3.7주; 강한 개선 확률 4주 47% → 12주 76% → 26주 85% → 52주 96%; 점진 상승 후 ~5개월 평탄화. → onset/stabilize 앵커 근거.',
    },
    {
      source: 'Clemow & Bushe 2015, atomoxetine onset/trajectory review (J Psychopharmacol)',
      url: 'https://journals.sagepub.com/doi/10.1177/0269881115602489',
      type: 'model-form-reference',
      confidence: 'medium',
      note: '지연 발현·점진 궤적(수용체 적응 PD) → S곡선(Weibull/sigmoid) 채택 근거. 곡선의 정확한 점별 값은 교육용 근사.',
    },
  ],
};

export const profiles: Record<string, PkProfile> = {
  [concertaOros.id]: concertaOros,
  [methylphenidateIr.id]: methylphenidateIr,
  [medikinetRetard.id]: medikinetRetard,
  [atomoxetine.id]: atomoxetine,
};

export function getProfile(profileId: string): PkProfile {
  const profile = profiles[profileId];
  if (!profile) throw new Error(`Unknown medication profile: ${profileId}`);
  return profile;
}
