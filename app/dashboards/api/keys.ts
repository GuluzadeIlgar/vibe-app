import type { ApiKey } from "../types";

type CreateBody = { name: string; usage?: number };
type UpdateBody = { name?: string; usage?: number };

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string })?.error ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function fetchKeys(): Promise<Array<Omit<ApiKey, "revealed">>> {
  const res = await fetch("/api/keys");
  if (!res.ok) return [];
  return res.json();
}

export async function createKey(
  body: CreateBody,
): Promise<Omit<ApiKey, "revealed">> {
  const res = await fetch("/api/keys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name.trim(),
      usage: typeof body.usage === "number" ? Math.max(0, body.usage) : 0,
    }),
  });
  return handleResponse<Omit<ApiKey, "revealed">>(res);
}

export async function updateKey(
  id: string,
  body: UpdateBody,
): Promise<Omit<ApiKey, "revealed">> {
  const res = await fetch(`/api/keys/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name?.trim(),
      usage:
        typeof body.usage === "number" ? Math.max(0, body.usage) : undefined,
    }),
  });
  return handleResponse<Omit<ApiKey, "revealed">>(res);
}

export async function deleteKey(id: string): Promise<void> {
  const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
  await handleResponse<void>(res);
}
