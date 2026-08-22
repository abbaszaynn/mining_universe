import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Durr & Zircon Consortium collects, uses, and protects information submitted through gbmines.com, including analytics and contact-form data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="19 August 2026"
      intro="This page explains what information gbmines.com collects, why, and what
        you can do about it. It applies to this website only, not to any
        agreement you may separately sign with Durr & Zircon Consortium or
        its operating companies."
    >
      <h2>Who this policy covers</h2>
      <p>
        This policy is published by Durr &amp; Zircon Consortium (&quot;we&quot;,
        &quot;us&quot;), the consortium formed by Durr Mines and Minerals
        (PVT) LTD and Zircon Mines (PVT) LTD, and referring also to Earth Lux
        Mines &amp; Minerals (PVT) LTD, together the operating companies
        described on this site. We are based in {SITE.region}.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you give us directly</h3>
      <p>
        When you submit the Investor Desk form, the contact form, or email us
        directly, we collect whatever you enter: typically your name, email
        address, company name, phone number, and the content of your
        message. We only collect what you choose to submit through those
        forms; there is no account creation, login, or payment on this site.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        If you accept analytics cookies (see the{" "}
        <a href="/cookies">Cookie Policy</a>), we use Google Analytics (GA4)
        to understand how the site is used: pages visited, approximate
        location (city/country level, derived from IP address), device and
        browser type, and how you arrived at the site. Google Analytics does
        not run, and no analytics cookie is set, unless you have granted
        consent. If you decline or haven&apos;t decided, no analytics
        script runs on your visit.
      </p>

      <h2>How we use this information</h2>
      <ul>
        <li>To respond to enquiries submitted through our forms or by email.</li>
        <li>
          To understand which pages and content are useful to visitors, so
          we can improve them.
        </li>
        <li>
          To meet legal, regulatory, or contractual obligations where
          applicable.
        </li>
      </ul>
      <p>
        We do not sell personal information, and we do not use form
        submissions for marketing unrelated to the enquiry you made.
      </p>

      <h2>Who we share information with</h2>
      <p>
        We use a small number of third-party services to run this site.
        We don&apos;t control their practices beyond what we configure, so
        we link their own policies below:
      </p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Purpose</th>
            <th>Data involved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Web3Forms</td>
            <td>Processes and delivers form submissions to us by email</td>
            <td>Whatever you enter in the Investor Desk or contact form</td>
          </tr>
          <tr>
            <td>Google Analytics (GA4)</td>
            <td>Site usage analytics, only if you consent</td>
            <td>Pages visited, approximate location, device/browser type</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>Website hosting</td>
            <td>Standard server request logs (IP address, requested URL)</td>
          </tr>
        </tbody>
      </table>
      <p>
        We do not otherwise sell, rent, or share your personal information
        with third parties for their own marketing purposes.
      </p>

      <h2>International transfers</h2>
      <p>
        Google and Web3Forms may process data on servers located outside
        Pakistan. Where that happens, it is under those providers&apos; own
        standard safeguards; refer to their respective privacy policies for
        specifics.
      </p>

      <h2>How long we keep information</h2>
      <p>
        Form submissions are kept for as long as reasonably necessary to
        respond to your enquiry and maintain a record of the business
        relationship, and are deleted or anonymized when no longer needed.
        Analytics data is retained according to Google Analytics&apos;
        default retention settings.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          You can allow or block analytics cookies at any time on the{" "}
          <a href="/cookies">Cookie Policy</a> page.
        </li>
        <li>
          You can ask us what information we hold about you, ask us to
          correct it, or ask us to delete it, by emailing{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </li>
        <li>
          Depending on where you are located, you may have additional
          statutory rights over your personal data under local law.
        </li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is directed at businesses and investors, not children.
        We do not knowingly collect information from anyone under 18.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the site or our practices change.
        Material changes will update the date at the top of this page.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your data can be sent to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
        <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>.
      </p>
    </LegalPageLayout>
  );
}
