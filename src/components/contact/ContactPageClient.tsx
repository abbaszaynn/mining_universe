"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CONTACT = {
  phones: ["+92 316 9244827", "+92 355 5653738"],
  emails: ["info@gbmines.com", "ir@gbmines.com"],
  website: "https://gbmines.com/",
  office: "Qasimi market in front of Cmh Gilgit",
  hours: "Mon to Fri, 9am to 6pm (PKT)",
  support: "Online support available 24/7",
  lead: { name: "Daniyal Ali", title: "Investor relations lead" },
  linkedin: "https://www.linkedin.com/in/zain-abbas1",
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

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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
    <div className="group rounded-2xl border border-graphite-950/[0.05] bg-bone-50/50 p-5 shadow-sm transition hover:border-copper-500/20 hover:bg-white/80 md:p-6 h-full">
      <div className="flex items-start gap-4 h-full">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-copper-500/20 bg-copper-500/10 text-copper-600">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper-600/80">
            {label}
          </p>
          <div className="mt-2 space-y-1 text-sm leading-relaxed text-graphite-600">
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
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        data-gos-page-root
        className="relative min-h-[100dvh] overflow-x-hidden bg-bone-50 text-graphite-950"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(233,122,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,122,60,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(233,122,60,0.06),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem]">
          <header data-contact-hero className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-copper-500">
              Get in touch
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-graphite-950 md:text-5xl">
              Contact us
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-graphite-600 max-w-2xl mx-auto">
              Questions on mineral assets, site visits, or partnerships across
              Gilgit Baltistan? Reach our team directly.
            </p>
          </header>

          <div
            data-contact-card
            className="mt-12 rounded-2xl border border-copper-500/15 bg-gradient-to-br from-copper-500/[0.07] to-transparent p-6 md:p-7 text-center max-w-lg mx-auto shadow-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-600/80">
              Relations lead
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-950">
              {CONTACT.lead.name}
            </p>
            <p className="mt-1 text-sm text-graphite-600">{CONTACT.lead.title}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div data-contact-card>
              <ContactCard icon={<PhoneIcon />} label="Phone & WhatsApp">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block transition text-graphite-950 hover:text-copper-600"
                  >
                    {phone}
                  </a>
                ))}
                <p className="pt-1 text-xs text-graphite-500">{CONTACT.hours}</p>
              </ContactCard>
            </div>

            <div data-contact-card>
              <ContactCard icon={<MailIcon />} label="Email">
                {CONTACT.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block break-all transition text-graphite-950 hover:text-copper-600"
                  >
                    {email}
                  </a>
                ))}
                <p className="pt-1 text-xs text-graphite-500">{CONTACT.support}</p>
              </ContactCard>
            </div>

            <div data-contact-card>
              <ContactCard icon={<PinIcon />} label="Office">
                <p className="text-graphite-950">{CONTACT.office}</p>
              </ContactCard>
            </div>
            
            <div data-contact-card>
              <ContactCard icon={<GlobeIcon />} label="Website">
                <a
                  href={CONTACT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block break-all transition text-graphite-950 hover:text-copper-600"
                >
                  {CONTACT.website.replace("https://", "")}
                </a>
              </ContactCard>
            </div>

            <div data-contact-card className="sm:col-span-2 max-w-lg mx-auto w-full">
              <ContactCard icon={<LinkedinIcon />} label="Follow Us">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block break-all transition text-graphite-950 hover:text-copper-600"
                >
                  LinkedIn: Zain Abbas
                </a>
              </ContactCard>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
