import { NextResponse } from "next/server";

/**
 * Relays a website form to the operations platform. Runs on the server so
 * the platform API key stays secret, and forwards the visitor's IP so the
 * platform can rate-limit per visitor rather than per website.
 */
export async function POST(req: Request) {
  const base = process.env.OPS_API_URL;
  const key = process.env.OPS_API_KEY;
  if (!base || !key) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Cheap size guard; the platform validates every field properly.
  if (JSON.stringify(body).length > 20_000) return NextResponse.json({ ok: false }, { status: 413 });

  const visitor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/public/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-visitor-ip": visitor },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
