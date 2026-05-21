import { apiRequest, clearAccessToken, setAccessToken } from './client';

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
  marketingConsent: boolean;
};

export type ResetPasswordConfirmRequest = {
  token: string;
  newPassword: string;
};

export async function login(payload: LoginRequest) {
  const response = await apiRequest<LoginResponse>('/api/auth/login', {
    auth: false,
    method: 'POST',
    body: payload,
  });
  setAccessToken(response.accessToken);
  return response;
}

export async function logout() {
  await apiRequest<void>('/api/auth/logout', {
    method: 'POST',
  });
  clearAccessToken();
}

export function signup(payload: SignupRequest) {
  return apiRequest<{ message: string }>('/api/account/signup', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}

export function verifyEmail(token: string) {
  return apiRequest<void>(`/api/account/verify-email?token=${encodeURIComponent(token)}`, {
    auth: false,
    method: 'GET',
  });
}

export function requestPasswordReset(email: string) {
  return apiRequest<void>('/api/account/password/reset', {
    auth: false,
    method: 'POST',
    body: { email },
  });
}

export function validatePasswordResetToken(token: string) {
  return apiRequest<void>(`/api/account/password/reset/${encodeURIComponent(token)}`, {
    auth: false,
    method: 'GET',
  });
}

export function confirmPasswordReset(payload: ResetPasswordConfirmRequest) {
  return apiRequest<void>('/api/account/password/reset/confirm', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}
