/**
 * Content published from the operations platform's Website admin.
 *
 * Returns null whenever the platform is not configured or does not answer, so
 * every caller falls back to the hardcoded content in this repo and the site
 * can never go blank because of the platform. Responses are cached for five
 * minutes and refreshed instantly via /api/revalidate on publish.
 */
export type OpsItem = Record<string, unknown> & { id: string; title: string };

export async function opsContent(type: "news" | "gallery" | "document" | "faq" | "director" | "announcement" | "setting"): Promise<OpsItem[] | null> {
  const base = process.env.OPS_API_URL;
  const key = process.env.OPS_API_KEY;
  if (!base || !key) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/public/v1/content?type=${type}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 300, tags: [`cms:${type}`] },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { ok: boolean; items?: OpsItem[] };
    // An empty list is treated as "not migrated yet", not "delete everything".
    return json.ok && json.items && json.items.length > 0 ? json.items : null;
  } catch {
    return null;
  }
}

export const str = (v: unknown) => (typeof v === "string" ? v : undefined);
