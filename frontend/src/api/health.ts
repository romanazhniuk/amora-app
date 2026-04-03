import { getApiUrl } from './getApiUrl';

export type HealthResponse = {
  status: string;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(getApiUrl('/api/health/'), {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json() as Promise<HealthResponse>;
}
