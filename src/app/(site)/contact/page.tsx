import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Mining Universe",
  description:
    "Reach the Mining Universe investor desk for partnership and mineral asset inquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
