import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the operations platform the moment an editor publishes, so the
 * change shows on the site within seconds instead of at the next 5-minute
 * revalidation. Only accepts the platform's own "cms:<type>" tags.
 */
export async function POST(req: Request) {
  const secret = process.env.OPS_REVALIDATE_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) return NextResponse.json({ ok: false }, { status: 401 });

  let tags: unknown;
  try {
    tags = (await req.json()).tags;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const valid = Array.isArray(tags) ? tags.filter((t): t is string => typeof t === "string" && /^cms:[a-z]+$/.test(t)) : [];
  valid.forEach((t) => revalidateTag(t));
  return NextResponse.json({ ok: true, revalidated: valid });
}
