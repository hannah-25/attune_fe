export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = window.atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * access token의 sub 클레임에서 사용자 식별자를 읽는다.
 * 오프라인 쓰기 큐가 "이 항목을 누가 넣었는지"를 판별하는 유일한 근거다.
 */
export function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  const sub = decodeJwtPayload(token)?.sub;
  return typeof sub === 'string' && sub.length > 0 ? sub : null;
}
