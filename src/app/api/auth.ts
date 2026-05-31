import { apiRequest, clearAccessToken } from './client';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export type SignupRequest = {
  nickname: string;
  email: string;
  password: string;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingConsent?: boolean;
};

export type ResetPasswordConfirmRequest = {
  token: string;
  newPassword: string;
};

export async function login(payload: LoginRequest) {
  return apiRequest<LoginResponse>('/v1/auth/login', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}

export async function logout() {
  await apiRequest<void>('/v1/auth/logout', {
    method: 'POST',
  });
  clearAccessToken();
}

export function signup(payload: SignupRequest) {
  return apiRequest<{ message: string }>('/v1/account/signup', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}

export function verifyEmail(token: string) {
  return apiRequest<void>(`/v1/account/verify-email?token=${encodeURIComponent(token)}`, {
    auth: false,
    method: 'GET',
  });
}

export function resendVerificationEmail(email: string) {
  return apiRequest<void>('/v1/account/verify-email/resend', {
    auth: false,
    method: 'POST',
    body: { email },
  });
}

export function requestPasswordReset(email: string) {
  return apiRequest<void>('/v1/account/password/reset', {
    auth: false,
    method: 'POST',
    body: { email },
  });
}

export function validatePasswordResetToken(token: string) {
  return apiRequest<void>(`/v1/account/password/reset/${encodeURIComponent(token)}`, {
    auth: false,
    method: 'GET',
  });
}

export function confirmPasswordReset(payload: ResetPasswordConfirmRequest) {
  return apiRequest<void>('/v1/account/password/reset/confirm', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}

export function changePassword(currentPassword: string, newPassword: string) {
  return apiRequest<void>('/v1/account/password', {
    method: 'PATCH',
    body: { currentPassword, newPassword },
  });
}

export function restoreAccount(email: string, password: string) {
  return apiRequest<LoginResponse>('/v1/auth/restore', {
    auth: false,
    method: 'POST',
    body: { email, password },
  });
}
