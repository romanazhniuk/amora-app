/**
 * Django API base URL without trailing slash.
 * Empty: use relative URLs (Vite dev proxy to :8000, or production reverse proxy on same host).
 */
export function getApiUrl(path: string): string {
  const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
