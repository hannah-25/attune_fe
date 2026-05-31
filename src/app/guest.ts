const GUEST_KEY = 'guest_mode';

export const isGuestMode = (): boolean => localStorage.getItem(GUEST_KEY) === 'true';
export const enterGuestMode = (): void => localStorage.setItem(GUEST_KEY, 'true');
export const exitGuestMode = (): void => localStorage.removeItem(GUEST_KEY);
