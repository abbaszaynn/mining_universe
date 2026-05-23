"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { ContactForm } from "@/components/contact/ContactForm";

const CONTACT = {
  phones: ["+92 310 9108714", "+92 317 9023125"],
  emails: ["abbaszayn08@gmail.com", "mineszircon@gmail.com"],
  office:
    "Office 23, Noor Market, Khomer Yarkot, Gilgit, Gilgit Baltistan",
  hours: "Mon to Fri, 9am to 6pm (PKT)",
  support: "Online support available 24/7",
  lead: { name: "Zain Abbas", title: "Investor relations lead" },
};

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function ContactCard({ icon, label, children }: ContactCardProps) {
  return (
    <div className="group rounded-2xl bg-white/[0.03] p-5 transition hover:bg-white/[0.05] md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37]">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
            {label}
          </p>
          <div className="mt-2 space-y-1 text-sm leading-relaxed text-[#e2e8f0]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-hero] > *",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-contact-card]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-contact-form]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.35,
          ease: "power3.out",
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.09),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem] lg:grid-cols-2 lg:items-start lg:gap-16 xl:max-w-7xl">
          <div>
            <header data-contact-hero>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
                Get in touch
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
                Contact us
              </h1>
              <p className="mt-6 text-lg font-light leading-relaxed text-[#94a3b8]">
                Questions on mineral assets, site visits, or partnerships across
                Gilgit Baltistan? Reach our team directly.
              </p>
            </header>

            <div
              data-contact-card
              className="mt-10 rounded-2xl border border-[#d4af37]/15 bg-gradient-to-br from-[#d4af37]/[0.07] to-transparent p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
                Relations lead
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#f0f4f7]">
                {CONTACT.lead.name}
              </p>
              <p className="mt-1 text-sm text-[#94a3b8]">{CONTACT.lead.title}</p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div data-contact-card>
                <ContactCard icon={<PhoneIcon />} label="Phone">
                  {CONTACT.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block transition hover:text-[#d4af37]"
                    >
                      {phone}
                    </a>
                  ))}
                  <p className="pt-1 text-xs text-[#64748b]">{CONTACT.hours}</p>
                </ContactCard>
              </div>

              <div data-contact-card>
                <ContactCard icon={<MailIcon />} label="Email">
                  {CONTACT.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block break-all transition hover:text-[#d4af37]"
                    >
                      {email}
                    </a>
                  ))}
                  <p className="pt-1 text-xs text-[#64748b]">{CONTACT.support}</p>
                </ContactCard>
              </div>

              <div data-contact-card className="sm:col-span-2">
                <ContactCard icon={<PinIcon />} label="Office">
                  <p>{CONTACT.office}</p>
                </ContactCard>
              </div>

              <div data-contact-card className="sm:col-span-2">
                <ContactCard icon={<ClockIcon />} label="Availability">
                  <p>{CONTACT.hours}</p>
                  <p className="text-[#94a3b8]">{CONTACT.support}</p>
                </ContactCard>
              </div>
            </div>
          </div>

          <div
            data-contact-form
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 lg:sticky lg:top-28"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#d4af37]">
              Send a message
            </h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-[#94a3b8]">
              Have a quick question? Use the form below and we will reply to your
              email shortly.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </BlogMotionProvider>
  );
}
