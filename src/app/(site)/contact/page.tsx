import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | GOS",
  description:
    "Reach the Game of Stones team by phone, email, or message for general inquiries across Gilgit Baltistan.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
