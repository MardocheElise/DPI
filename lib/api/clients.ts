// Route: global (client HTTP partagé pour appeler l'API NestJS)
// Base URL configurable via NEXT_PUBLIC_API_URL (défaut: http://localhost:3001).

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Options = RequestInit & { params?: Record<string, string | undefined> };

export async function apiFetch<T>(
  path: string,
  options: Options = {},
): Promise<T> {
  const { params, ...init } = options;

  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null) as [string, string][],
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    cache: "no-store", // données toujours fraîches
    ...init,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status} : ${message}`);
  }
  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
