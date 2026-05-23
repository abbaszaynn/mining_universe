"use client";

import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactPageClient() {
  return (
    <BlogMotionProvider>
      <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-28 md:pt-[7.5rem] lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Investor desk
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#94a3b8]">
              We welcome questions on mineral assets, site visits, and partnership
              opportunities across Gilgit Baltistan.
            </p>

            <dl className="mt-10 space-y-6 border-t border-white/[0.06] pt-10">
              <div>
                <dt className="text-sm font-medium text-[#f0f4f7]">Phone</dt>
                <dd className="mt-1 text-[#94a3b8]">+92 310 9108714</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#f0f4f7]">Email</dt>
                <dd className="mt-1">
                  <a
                    href="mailto:abbaszayn08@gmail.com"
                    className="text-[#94a3b8] transition hover:text-[#d4af37]"
                  >
                    abbaszayn08@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#f0f4f7]">Office</dt>
                <dd className="mt-1 text-[#94a3b8]">
                  Office 23, Noor Market, Khomer Yarkot, Gilgit, Gilgit Baltistan
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#d4af37]">
              Contact us
            </h2>
            <p className="mt-2 text-sm text-[#94a3b8]">
              Have questions or investment inquiries? Send us a message directly.
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
