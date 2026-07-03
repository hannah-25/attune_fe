import { apiRequest } from './client';

export type UserProfile = {
  nickname: string;
  profileImageUrl?: string | null;
  email: string;
  notifications: {
    medication: boolean;
    report: boolean;
    marketing: boolean;
  };
};

export type UserSettings = {
  medicationNotification: boolean;
  reportNotification: boolean;
  marketingNotification: boolean;
  communityNotification: boolean;
  todoNotification: boolean;
  takeMedicationOnHoliday: boolean;
  theme: 'DARK' | 'LIGHT' | 'SYSTEM';
  // IANA timezone (예: 'Asia/Seoul'). 서버가 값을 아직 안 내려줄 수 있어 optional.
  timezone?: string;
};

export type UpdateUserSettingsRequest = Partial<UserSettings>;

export function getMyProfile() {
  return apiRequest<UserProfile>('/v1/users/me/profile');
}

export function updateNickname(nickname: string) {
  return apiRequest<void>('/v1/users/me/nickname', {
    method: 'PUT',
    body: { newNickName: nickname },
  });
}

export function updateProfileImage(profileImageUrl: string) {
  return apiRequest<void>('/v1/users/me/image', {
    method: 'POST',
    body: { profileImageUrl },
  });
}

export function getUserSettings() {
  return apiRequest<UserSettings>('/v1/users/settings');
}

export function updateUserSettings(payload: UpdateUserSettingsRequest) {
  return apiRequest<UserSettings>('/v1/users/settings', {
    method: 'PATCH',
    body: payload,
  });
}
