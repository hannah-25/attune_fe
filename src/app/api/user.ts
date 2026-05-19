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
  takeMedicationOnHoliday: boolean;
  theme: 'DARK' | 'LIGHT' | 'SYSTEM';
};

export type UpdateUserSettingsRequest = Partial<UserSettings>;

export function getMyProfile() {
  return apiRequest<UserProfile>('/api/users/me/profile');
}

export function updateNickname(nickname: string) {
  return apiRequest<void>('/api/users/me/nickname', {
    method: 'PUT',
    body: { nickname },
  });
}

export function updateProfileImage(profileImageUrl: string) {
  return apiRequest<void>('/api/users/me/image', {
    method: 'POST',
    body: { profileImageUrl },
  });
}

export function getUserSettings() {
  return apiRequest<UserSettings>('/api/users/settings');
}

export function updateUserSettings(payload: UpdateUserSettingsRequest) {
  return apiRequest<UserSettings>('/api/users/settings', {
    method: 'PATCH',
    body: payload,
  });
}
