/**
 * Every website enquiry is written to two places at once:
 *   1. the Durr & Zircon operations platform (via /api/leads, server-side, so
 *      the platform API key never reaches the browser), where it becomes a
 *      tracked lead with an owner, a score and follow-up reminders;
 *   2. the Web3Forms inbox, as before.
 *
 * The visitor sees success if EITHER path accepted it, so an outage on one
 * side can never lose an enquiry again (see form-fallback.ts for the Sept
 * 2026 incident). Only when both fail does the mailto fallback appear.
 */
export type LeadForm = "investor_desk" | "contact" | "document_request";

function utm(): Record<string, string> {
  try {
    const p = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"]) {
      const v = p.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    if (document.referrer) out.referrer = document.referrer.slice(0, 200);
    return out;
  } catch {
    return {};
  }
}

export async function deliverLead(
  form: LeadForm,
  fields: Record<string, string>,
  web3: { accessKey?: string; fromName: string; subject: string; extra?: Record<string, string> }
): Promise<{ ok: boolean; error?: string }> {
  const toPlatform = fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, ...fields, page: window.location.pathname, utm: utm() }),
  }).then((r) => r.ok);

  const toInbox = web3.accessKey
    ? fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          ...web3.extra,
          access_key: web3.accessKey,
          from_name: web3.fromName,
          subject: fields.subject || web3.subject,
        }),
      })
        .then((r) => r.json())
        .then((j) => Boolean(j.success))
    : Promise.resolve(false);

  const [platform, inbox] = await Promise.allSettled([toPlatform, toInbox]);
  const ok = (platform.status === "fulfilled" && platform.value) || (inbox.status === "fulfilled" && inbox.value);
  return ok ? { ok: true } : { ok: false, error: "We couldn't submit the form just now." };
}
