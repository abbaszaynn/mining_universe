"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "./ContactForm";

type ContactInquiryModalProps = {
  open: boolean;
  onClose: () => void;
  companyName?: string;
};

export function ContactInquiryModal({
  open,
  onClose,
  companyName,
}: ContactInquiryModalProps) {
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#030712]/85 p-4 backdrop-blur-md sm:p-6"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-labelledby="inquiry-modal-title"
    >
      <div
        className="relative w-full max-w-[52rem] rounded-xl border border-white/[0.08] bg-[#0a0f1e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
              Investor desk
            </p>
            <h2
              id="inquiry-modal-title"
              className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#f0f4f7] sm:text-xl"
            >
              General inquiry
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#64748b] transition hover:bg-white/[0.06] hover:text-[#f0f4f7]"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <ContactForm companyName={companyName} variant="modal" />
        </div>
      </div>
    </div>,
    document.body
  );
}
