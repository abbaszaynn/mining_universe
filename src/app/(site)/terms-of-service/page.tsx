import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern use of gbmines.com, including disclaimers on the mineral and investment information published on this site.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="19 August 2026"
      intro="These terms govern your use of gbmines.com. By using this site, you
        agree to them. They don't cover any separate written agreement you
        enter into with Durr & Zircon Consortium or its operating
        companies, such as an investment, joint venture, or supply
        contract, which is governed by its own terms."
    >
      <h2>Who we are</h2>
      <p>
        gbmines.com is published by Durr &amp; Zircon Consortium, the
        consortium formed by Durr Mines and Minerals (PVT) LTD and Zircon
        Mines (PVT) LTD, and referring also to Earth Lux Mines &amp;
        Minerals (PVT) LTD. All three are companies incorporated in
        Pakistan. We&apos;re based in {SITE.region}.
      </p>

      <h2>Use of this site</h2>
      <p>
        This site is provided for general information about our licensed
        mining concessions, commodities, and how to enquire about
        partnering with or purchasing from us. You may browse it and use
        the enquiry forms for legitimate business purposes. You may not use
        this site to submit false information, attempt to access
        non-public areas, scrape or republish content at scale, or use it
        in any way that could damage, disable, or impair it.
      </p>

      <h2>Not an offer, not investment advice</h2>
      <p>
        Nothing on this site constitutes an offer or solicitation to buy or
        sell any security or interest, nor investment, legal, tax, or
        financial advice. Content describing concessions, commodities,
        reserves, licence status, or investment routes is provided for
        general information only and does not amount to a binding
        commitment. Any actual transaction, joint venture, farm-in,
        acquisition, or supply arrangement is subject to separate due
        diligence and a signed written agreement between the parties.
      </p>
      <p>
        Figures referencing third-party deals, government policy targets,
        or market data (for example, figures cited on our{" "}
        <a href="/markets">market pages</a> or in the{" "}
        <a href="/reports/gb-mineral-corridor-report-2026.pdf">
          GB Mineral Corridor Report
        </a>
        ) are sourced from public reporting and are not guarantees, forecasts,
        or promises of return made by us.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We try to keep the information on this site accurate and current,
        including geological, licensing, and concession detail. However,
        mining concessions, licence status, and regulatory requirements can
        change, and some detail (boundary coordinates, full geological
        reports, assay data) is intentionally not published here and is
        shared directly with verified counterparties. This site is provided
        &quot;as is&quot; without warranty of any kind, and you should
        independently verify anything material before relying on it.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, images, graphics, and other content on this site belong
        to Durr &amp; Zircon Consortium or its licensors, unless stated
        otherwise. You may view and share pages for legitimate reference,
        but may not reproduce, redistribute, or create derivative works
        from this content for commercial purposes without our written
        permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site links to third-party services (for example, our form
        processor and analytics provider) and may occasionally link to
        external sources cited as evidence for a claim. We aren&apos;t
        responsible for the content or practices of sites we don&apos;t
        control.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Durr &amp; Zircon Consortium
        and its operating companies aren&apos;t liable for any indirect,
        incidental, or consequential loss arising from your use of this
        site or reliance on information published on it. Nothing in these
        terms limits liability that cannot lawfully be limited.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan. Any dispute
        arising from your use of this site is subject to the exclusive
        jurisdiction of the courts of Pakistan.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        site after a change means you accept the updated terms. Material
        changes will update the date at the top of this page.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
        <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>.
      </p>
    </LegalPageLayout>
  );
}
