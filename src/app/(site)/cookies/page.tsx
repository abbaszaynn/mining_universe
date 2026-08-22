import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { CookieSettingsControl } from "@/components/cookies/CookieSettingsControl";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Cookie Policy & Settings",
  description:
    "What cookies gbmines.com uses and how to allow or block analytics cookies.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy & Settings"
      lastUpdated="19 August 2026"
      intro="This site uses a single category of non-essential cookie: analytics.
        It only runs if you allow it. Change your choice below at any time."
    >
      <h2>Your current setting</h2>
      <CookieSettingsControl />

      <h2>What are cookies</h2>
      <p>
        Cookies are small pieces of data stored on your device by your
        browser. Some are required for a site to function at all; others,
        like analytics cookies, are optional and only collect information
        about how the site is used.
      </p>

      <h2>Cookies this site uses</h2>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Set by</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>gos-cookie-consent</td>
            <td>gbmines.com</td>
            <td>Remembers your cookie choice on this page</td>
            <td>Stored in your browser until you change it or clear site data</td>
          </tr>
          <tr>
            <td>_ga, _ga_*</td>
            <td>Google Analytics (GA4)</td>
            <td>Distinguishes visitors for aggregate usage statistics</td>
            <td>Up to 2 years; only set if you allow analytics cookies</td>
          </tr>
        </tbody>
      </table>
      <p>
        This site does not use advertising, remarketing, or cross-site
        tracking cookies. If that changes, this page and the table above
        will be updated.
      </p>

      <h2>Browser-level controls</h2>
      <p>
        In addition to the setting above, you can block or delete cookies
        through your browser&apos;s own settings. Doing so may affect how
        some sites function, though this site works normally either way.
      </p>

      <h2>More detail</h2>
      <p>
        For what analytics data is collected and how long it&apos;s kept,
        see our <a href="/privacy-policy">Privacy Policy</a>. For Google
        Analytics specifically, see{" "}
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s cookie policy
        </a>
        .
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about cookies on this site can be sent to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
