/**
 * Where form submissions are meant to land.
 *
 * With Web3Forms the destination inbox is fixed by the access key itself
 * (each key is generated for one email address at web3forms.com), so this
 * constant does not route normal submissions. It is used only for the
 * fallback below, and must match the inbox the production key was generated
 * for, otherwise the two paths would deliver leads to different places.
 *
 * Note this address is visible in the page's JavaScript, so it will draw some
 * spam. That was judged an acceptable price against silently losing
 * investor enquiries, which is what happened before this fallback existed.
 */
export const FORM_INBOX = "mineszircon@gmail.com";

/**
 * Fields that are plumbing, not something the visitor wrote. Callers build
 * the fallback from the raw form before appending these, so this is a guard
 * rather than the main filter. `subject` is deliberately not listed: the
 * contact form has a visitor-typed subject field that belongs in the email.
 */
const SKIP = new Set(["access_key", "botcheck", "from_name"]);

const LABELS: Record<string, string> = {
  name: "Name",
  entity: "Company / entity",
  country: "Country",
  email: "Email",
  phone: "Phone",
  interested_company: "Interested company",
  interested_mines: "Interested mine or site",
  field_visit: "Field visit",
  subject: "Subject",
  message: "Message",
};

/**
 * Builds a `mailto:` link carrying everything the visitor typed.
 *
 * Exists because the investor form broke silently in production (Sept 2026):
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY was not set at build time, every
 * submission showed "Form is not configured yet", and the enquiry was simply
 * gone. Any failure path now offers this link instead, so the visitor can
 * send the same details from their own mail client with one click rather
 * than retyping them, or giving up.
 */
export function buildMailtoFallback(subject: string, form: FormData): string {
  const lines: string[] = [];
  form.forEach((value, key) => {
    if (SKIP.has(key) || typeof value !== "string" || !value.trim()) return;
    lines.push(`${LABELS[key] ?? key}: ${value.trim()}`);
  });

  return `mailto:${FORM_INBOX}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}
