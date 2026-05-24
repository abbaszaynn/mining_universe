import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Game of Stones for general inquiries about licensed mining operations, field visits, and partnerships across Gilgit Baltistan.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
