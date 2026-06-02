const STORE_KEY = 'guest_store';

type GuestStore = Record<string, unknown>;

function load(): GuestStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as GuestStore) : {};
  } catch {
    return {};
  }
}

function save(store: GuestStore): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function guestRead<T>(key: string): T | null {
  const store = load();
  return key in store ? (store[key] as T) : null;
}

export function guestWrite<T>(key: string, updater: (prev: T | null) => T): void {
  const store = load();
  store[key] = updater((key in store ? store[key] : null) as T | null);
  save(store);
}

export function guestDelete(key: string): void {
  const store = load();
  delete store[key];
  save(store);
}

export function clearGuestStore(): void {
  localStorage.removeItem(STORE_KEY);
}
