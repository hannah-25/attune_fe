export function cleanPath(path: string): string {
  const i = path.indexOf('?');
  return i >= 0 ? path.slice(0, i) : path;
}

export function searchParams(path: string): URLSearchParams {
  const i = path.indexOf('?');
  return i >= 0 ? new URLSearchParams(path.slice(i + 1)) : new URLSearchParams();
}
