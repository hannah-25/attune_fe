const PENDING_RESTORE_EMAIL_KEY = 'pending_restore_email';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function markPendingRestoreEmail(email: string): void {
  const normalized = normalizeEmail(email);
  if (!normalized) return;
  localStorage.setItem(PENDING_RESTORE_EMAIL_KEY, normalized);
}

export function getPendingRestoreEmail(): string | null {
  const value = localStorage.getItem(PENDING_RESTORE_EMAIL_KEY);
  return value ? normalizeEmail(value) : null;
}

export function isPendingRestoreEmail(email: string): boolean {
  const pendingEmail = getPendingRestoreEmail();
  if (!pendingEmail) return false;
  return pendingEmail === normalizeEmail(email);
}

export function clearPendingRestoreEmail(email?: string): void {
  if (!email) {
    localStorage.removeItem(PENDING_RESTORE_EMAIL_KEY);
    return;
  }

  const pendingEmail = getPendingRestoreEmail();
  if (pendingEmail === normalizeEmail(email)) {
    localStorage.removeItem(PENDING_RESTORE_EMAIL_KEY);
  }
}
