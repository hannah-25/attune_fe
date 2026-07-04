// attune 약물(name/ingredient) → PkProfile 해석.
//
// attune medicationId는 숫자, 프로토타입 프로필 id는 문자열이라 직접 키가 안 맞는다.
// BE가 pkProfile을 내려주기 전까지 약물 이름/성분 기반 매핑으로 fallback 프로필을 찾는다.
// BE pkProfile 도입 시 이 resolver 앞단에서 API 값을 우선 사용하도록 교체할 것.

import { profiles } from './fallback-profiles';
import type { PkProfile } from './types';

type DrugIdentity = { name?: string | null; ingredient?: string | null };

// 프로필 id → 약물명/성분에 등장할 수 있는 별칭들(소문자·공백 제거 후 부분일치).
const PROFILE_ALIASES: Record<string, string[]> = {
  'concerta-oros': ['콘서타', 'concerta'],
  'methylphenidate-ir': ['페니드', '페니드정', 'penid', '메디키넷정', '리탈린', 'ritalin'],
  'methylphenidate-medikinet': ['메디키넷리타드', '메디키넷서방', 'medikinet'],
  atomoxetine: ['스트라테라', 'strattera', '아토목세틴', 'atomoxetine', '아토목세틴염산염'],
};

function normalize(value?: string | null): string {
  return (value ?? '').toLowerCase().replace(/\s+/g, '');
}

/**
 * 약물 이름/성분으로 fallback PK 프로필을 찾는다. 없으면 null("준비 중").
 * 이름 우선, 성분(ingredient) 보조로 매칭한다.
 */
export function resolveProfile(drug: DrugIdentity): PkProfile | null {
  const name = normalize(drug.name);
  const ingredient = normalize(drug.ingredient);
  if (!name && !ingredient) return null;

  for (const [profileId, aliases] of Object.entries(PROFILE_ALIASES)) {
    const hit = aliases.some((alias) => {
      const a = normalize(alias);
      return (name !== '' && name.includes(a)) || (ingredient !== '' && ingredient.includes(a));
    });
    if (hit) return profiles[profileId] ?? null;
  }
  return null;
}
